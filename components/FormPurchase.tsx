import Button from "./Button";
import {
  loadTossPayments,
  TossPaymentsInstance,
} from "@tosspayments/payment-sdk";
import { FormEvent, useEffect, useState } from "react";
import FormAddress from "./FormAddress";
import FormAddressFill from "./FormAddressFill";
import { AddressType, CartType, OrderData, UserData } from "../types";
import { v4 as uuidv4 } from "uuid";
import CartItemList from "./CartItemList";
import useGetProductsFromCart from "../hooks/useGetProductsFromCart";
import useCartSummary from "../hooks/useCartSummary";
import useInput from "../hooks/useInput";
import useCheckCartStock from "../hooks/useCheckCartStock";
import SkeletonCart from "./SkeletonCart";
import useOrderData from "../hooks/useOrderData";
// import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import useAccount from "../hooks/useAccount";
import { match } from "assert";

interface Props {
  userData: UserData;
  cart: CartType;
  target: string;
}

const FormPurchase: React.FC<Props> = ({ userData, cart, target }) => {
  const checkCartStock = useCheckCartStock();
  const [sameAsOrderer, setSameAsOrderer] = useState<boolean>(true);
  const [addressData, setAddressData] = useState<AddressType | null>(
    userData.addressData
    //userData.addressArr.length?: userData.addressArr[0]: null
  );
  const [matchedAddr, setMatchedAddr] = useState("");
  const [tossPayments, setTossPayments] = useState<TossPaymentsInstance | null>(
    null
  );
  const router = useRouter();
  // const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { value: ordererName, onChange: onOrdererNameChange } = useInput(
    userData.user?.displayName || ""
  );
  const { value: shippingRequest, onChange: onShippingRequestChange } =
    useInput("");
  const { value: recipientName, onChange: onRecipientNameChange } =
    useInput("");
  const { data: productsData } = useGetProductsFromCart(Object.keys(cart));
  const {
    add: { mutateAsync: addOrderData },
    update: { mutateAsync: updateOrderData },
  } = useOrderData("");
  const cartSummary = useCartSummary(userData, cart, productsData || null);
  // cartSummary && (cartSummary.totalPrice = 2.2);

  const {
    editProfile: { mutateAsync: editProfile, isLoading },
    editAddrArr: { mutateAsync: editAddrArr, isLoading: isLoadingAddr },
  } = useAccount();

  const onSameAsOrdererChange = () => {
    setSameAsOrderer((prev) => !prev);
  };

  const onPurchase = async (e: FormEvent) => {
    e.preventDefault();

    if (!addressData) {
      window.alert("주소를 입력해주세요.");
      return;
    } else if (!ordererName) {
      window.alert("주문자 성명을 입력해주세요.");
      return;
    } else if (!productsData || !cartSummary || !userData?.user?.uid) {
      window.alert("잘못된 주문 요청입니다.");
      return;
    }

    let orderName = `${productsData[Object.keys(productsData)[0]]?.name}${
      Object.keys(productsData).length >= 2
        ? " 외 " + (Object.keys(productsData).length - 1) + "건"
        : ""
    }`;

    const orderData: OrderData = {
      amount: cartSummary.totalPrice,
      orderId: uuidv4(),
      uid: userData.user.uid,
      orderName,
      recipientName: sameAsOrderer
        ? (userData.user.displayName as string)
        : recipientName,
      addressData,
      customerName: userData.user.displayName as string,
      status: "Payment in progress",
      products: cart,
      shippingRequest,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    console.log(orderData);

    if (!checkCartStock(productsData, cart)) {
      window.alert("이미 품절된 상품이 포함되어 있습니다.");
      return;
    } else {
      if (!tossPayments) return;
      addOrderData({ orderId: orderData.orderId, orderData }).then(() => {
        tossPayments
          .requestPayment("카드", {
            amount: orderData.amount,
            orderId: orderData.orderId,
            orderName: orderData.orderName,
            customerName: orderData.customerName,
            successUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/success?target=${target}`,
            failUrl: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/fail`,
          })
          .catch((error) => {
            console.error(error);
          })
          .catch((error) => {
            console.log(error);
            updateOrderData({
              orderId: orderData.orderId,
              orderData: {
                status:
                  error.code === "USER_CANCEL"
                    ? "Payment cancelled"
                    : "Payment failed",
                error: JSON.stringify(error),
              },
            });
          });
      });
    }
  };

  const onPlaceOrder = async (e: FormEvent) => {
    e.preventDefault();

    if (!addressData) {
      window.alert("주소를 입력해주세요.");
      return;
    } else if (!ordererName) {
      window.alert("주문자 성명을 입력해주세요.");
      return;
    } else if (!productsData || !cartSummary || !userData?.user?.uid) {
      window.alert("잘못된 주문 요청입니다.");
      return;
    }

    let orderName = `${productsData[Object.keys(productsData)[0]]?.name}${
      Object.keys(productsData).length >= 2
        ? " 외 " + (Object.keys(productsData).length - 1) + "건"
        : ""
    }`;

    const orderData: OrderData = {
      amount: cartSummary.totalPrice,
      orderId: uuidv4(),
      uid: userData.user.uid,
      orderName,
      recipientName: sameAsOrderer
        ? (userData.user.displayName as string)
        : recipientName,
      addressData,
      customerName: userData.user.displayName as string,
      status: "Payment in progress",
      products: cart,
      shippingRequest,
      updatedAt: Date.now(),
      createdAt: Date.now(),
    };

    console.log(orderData);
    addOrderData({ orderId: orderData.orderId, orderData }).catch((error) => {
      console.error(error);
      return;
    });
    // setOrderPlaced(true);
  };

  // const onPaypalPurchase = async (e: FormEvent) => {};
  const createPayPalOrder = (orderData: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: (cartSummary?.totalPrice as number) / 1000 },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID;
      });
  };

  const paypalCreateOrder2 = async () => {
    if (!addressData) {
      window.alert("주소를 입력해주세요.");
      return;
    } else if (!ordererName) {
      window.alert("주문자 성명을 입력해주세요.");
      return;
    } else if (!productsData || !cartSummary || !userData?.user?.uid) {
      window.alert("잘못된 주문 요청입니다.");
      return;
    }

    let orderName = `${productsData[Object.keys(productsData)[0]]?.name}${
      Object.keys(productsData).length >= 2
        ? " 외 " + (Object.keys(productsData).length - 1) + "건"
        : ""
    }`;

    try {
      let response = await axios.post("/api/paypal/createorder3", {
        order_price: cartSummary?.totalPrice as number, // / 1000,
      });
      console.log(response);
      // console.log("order_id: " + response.data.data.order_id);
      console.log("order_id: " + response.data.id);
      if (response.data.id) {
        const orderData: OrderData = {
          amount: cartSummary.totalPrice,
          orderId: response.data.id,
          uid: userData.user.uid,
          orderName,
          recipientName: sameAsOrderer
            ? (userData.user.displayName as string)
            : recipientName,
          addressData,
          customerName: userData.user.displayName as string,
          status: "Payment in progress",
          products: cart,
          shippingRequest,
          updatedAt: Date.now(),
          createdAt: Date.now(),
        };
        console.log(orderData);
        addOrderData({ orderId: orderData.orderId, orderData });
      }

      return response.data.id;
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      console.log(err);
      return null;
    }
  };

  function onPayPalApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        // dispatch({ type: "PAY_REQUEST" });
        addOrderData({
          orderId: uuidv4(),
          orderData: {
            status: "Payment completed",
            amount: (cartSummary?.totalPrice as number) / 1000,
          },
        });
        //        dispatch({ type: "PAY_SUCCESS", payload: data });
        console.log("Order is paid successfully");
      } catch (err) {
        //  dispatch({ type: "PAY_FAIL", payload: getError(err) });
        console.log(err);
      }
    });
  }

  const paypalCaptureOrder2 = async (orderID: any) => {
    try {
      let response = await axios.post("/api/paypal/captureorder3", {
        orderID,
      });
      console.log(response.data);
      if (response.data.success) {
        // Order is successful
        // Your custom code
        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')
        // And/Or Adding Balance to Redux Wallet

        // updateOrderData({
        //   orderId: orderID,
        //   orderData: {
        //     status: "Payment completed",
        //   },
        // });
        router.push(
          `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/success2?target=${target}` +
            `&orderId=${orderID}&amount=${cartSummary?.totalPrice}`
        );
        // return true;
      }
    } catch (err) {
      // Order is not successful
      // Your custom code
      // Like showing an error toast
      // toast.error('Some Error Occured')
      console.log(err);
      router.push(`${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/purchase/fail`);
    }
  };

  function onError(err: unknown) {
    console.log(err);
  }

  useEffect(() => {
    if (!userData?.user?.uid) return;

    loadTossPayments(process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string)
      .then((tossPayments) => {
        setTossPayments(tossPayments);
      })
      .catch((error) => console.log(error));

    // const loadPaypalScript = async () => {
    //   paypalDispatch({
    //     type: "resetOptions",
    //     value: {
    //       "client-id":
    //         "AXJlzM0_4M0XiEZPFGemF1xBtGkmZUbAiDZ9fJYtobWONWmnJ9FvBfQsB5Xus8AkD7KjXpvCxDdaURn7",
    //       currency: "USD",
    //     },
    //   });
    //   paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    // };
    // loadPaypalScript();
  }, [userData]);

  return (
    <div
      className="flex flex-col  gap-5 text-base text-zinc-800"
      // onSubmit={onPlaceOrder}
    >
      {productsData && cartSummary ? (
        <CartItemList
          cartSummary={{
            ...cartSummary,
            totalPrice: cartSummary.totalPrice,
          }}
          productsData={productsData}
          cart={cart}
          userData={userData}
          withoutDeleteBtn={true}
        />
      ) : (
        <SkeletonCart withoutDeleteBtn={true} />
      )}
      <section className="flex flex-col gap-10">
        <label className="w-fit">
          <h3 className="text-xl font-semibold">* {/* 주문자 */}Orderer</h3>
          <input
            type="text"
            placeholder={userData.user?.displayName || "주문자 성명"}
            value={ordererName}
            onChange={onOrdererNameChange}
            required
            style={{
              borderBottom: "1px solid #1f2937",
            }}
            className="mt-2 h-8 px-2 pt-1 pb-1"
          />
        </label>
        <label className="w-fit">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-xl font-semibold">{/* 수령인 */}Recipient</h3>
            <label>
              <input
                type="checkbox"
                checked={sameAsOrderer}
                onChange={onSameAsOrdererChange}
                value="sameAsOrderer"
              />{" "}
              Same as orderer{/* 주문자와 동일 */}
            </label>
          </div>

          <input
            type="text"
            placeholder={/* "수령인 성명" */ "Receipient name"}
            value={sameAsOrderer ? ordererName : recipientName}
            onChange={(e) => {
              setSameAsOrderer(false);
              onRecipientNameChange(e);
            }}
            required
            style={{
              borderBottom: "1px solid #1f2937",
            }}
            className="mt-2 h-8 px-2 pt-1 pb-1"
          />
        </label>
        <div className="flex flex-col gap-2">
          <h3 className="mb-3 text-xl font-semibold">
            * {/* 배송 주소 */}Shipping address
          </h3>
          <div
            className="w-fit border-b-2 border-indigo-700"
            // style={{
            //   borderBottom: "1px solid #1f2937",
            // }}
          >
            <span>
              {addressData?.address
                ? `(${addressData?.postCode})`
                : addressData
                ? `(${addressData.postCode})`
                : ""}{" "}
              {
                addressData?.address
                  ? addressData?.address
                  : addressData
                  ? addressData.address
                  : "No address data set" /* "검색된 주소 없음" */
              }
            </span>
          </div>
          {/* check if addressData is already in the array (later to use a var "matchedAddr" to mark it)
          userData.addressArr.find(addressData) */}
          {addressData === userData.addressData ? (
            <span
              className="bg-zinc-200 text-sm inline-block h-fit w-fit break-keep rounded-md px-2 py-1 text-center t
             font-semibold transition-all"
            >
              (default)
            </span>
          ) : matchedAddr ? (
            <span> ({matchedAddr})</span>
          ) : (
            <button
              className="default-button w-fit"
              onClick={() => {
                editAddrArr({ addressData });
                setMatchedAddr("Saved"); //should evaluate when isLoading finished
              }}
            >
              Save to profile
            </button>
          )}
          <FormAddressFill
            addressData={addressData}
            setAddressData={setAddressData}
          />
          {/* <div className="mb-4 flex justify-between">
            
          </div> */}
          <div className="grid grid-cols-5 gap-1">
            {userData &&
              userData.addressArr &&
              [userData.addressData || null, ...userData?.addressArr].map(
                (addressD, i) =>
                  addressD && (
                    <span
                      key={i}
                      className="overflow-hidden rounded-lg border border-zinc-50 shadow-lg shadow-zinc-300 h-12 cursor-pointer"
                      onClick={() => {
                        setAddressData(addressD);
                        setMatchedAddr("Saved: " + i);
                      }}
                    >
                      {addressD?.postCode + " " + addressD?.address}{" "}
                    </span>
                  )
              )}
          </div>
        </div>
        <label className="w-fit">
          <h3 className="text-xl font-semibold">
            {/* 배송 요청 사항 */}Shipping Requests
          </h3>
          <input
            // disabled={orderPlaced}
            type="text"
            placeholder={""}
            value={shippingRequest}
            onChange={onShippingRequestChange}
            style={{
              borderBottom: "1px solid #1f2937",
            }}
            className="mt-2 h-8 px-2 pt-1 pb-1"
          />
        </label>
      </section>
      <div className="flex flex-col mt-12  text-center ">
        <span className="text-2xl block ">
          {/* 금액 */}Price:{" "}
          {cartSummary?.totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }) || "-"}
          {/* 원 */}USD{" "}
        </span>
        {/* <span>주소: {addressData?.address} </span> */}
        {/* <Link
          scroll={false}
          href={{
            query: {
              ...query,
              order: query.order === orderData.orderId ? "" : orderData.orderId,
            },
          }}
        >
          Edit Order
        </Link> */}
        {/* <Button
          disabled={!userData || !cartSummary || cartSummary.invalidProduct}
          theme="black"
          tailwindStyles="px-8"
        >
          {cartSummary?.totalPrice.toLocaleString("ko-KR") || "-"}원 결제하기
        </Button>
        <p className="my-2 break-keep text-sm font-semibold text-zinc-500">
          토스 페이먼츠 api를 이용한 테스트 결제입니다.
          <br />
          실제 결제되지 않으며 빈 계좌를 이용하여도 결제 테스트가 가능합니다.
          <br />
        </p> */}
        {/* </div> */}

        <PayPalScriptProvider
          options={{
            clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
            currency: "USD",
            intent: "capture",
          }}
        >
          <PayPalButtons
            //className="h-fit  break-keep rounded-md px-4 py-2 text-center text-base font-semibold transition-all"
            className="flex flex-col w-full self-center mt-4 max-w-md"
            // https://stackoverflow.com/questions/69069357/paypal-button-cannot-read-new-react-state-how-to-work-with-dynamic-values-and-p
            forceReRender={[
              addressData,
              ordererName,
              recipientName,
              shippingRequest,
            ]}
            createOrder={async (data, actions) => {
              let order_id = await paypalCreateOrder2();
              return order_id + "";
            }}
            onApprove={async (data, actions) => {
              console.log("data: " + JSON.stringify(data));
              // let response: any =
              await paypalCaptureOrder2(data.orderID);
              // if (response) return true;
            }}
            //   createOrder={createPayPalOrder}
            //   onApprove={onPayPalApprove}
            onError={onError}
          ></PayPalButtons>
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default FormPurchase;
