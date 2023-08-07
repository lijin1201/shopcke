import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderBasic from "../../components/HeaderBasic";
// import useConfirmPayment from "../../hooks/useConfirmPayment";
// import { ConfirmPaymentData } from "../../types";
import useUpdateStockAndOrderCount from "../../hooks/useUpdateStockAndOrderCount";
import useCart from "../../hooks/useCart";
import Loading from "../../components/AnimtaionLoading";
import Done from "../../components/AnimationDone";
import useOrderData from "../../hooks/useOrderData";
import Seo from "../../components/Seo";

const PurchaseSuccess = () => {
  const { replace, query } = useRouter();
  const {
    get: { data: orderData, isError: orderDataFail },
    update: { mutateAsync: updateOrderData },
  } = useOrderData((query?.orderId as string) || "");
  const { mutate: updateStock } = useUpdateStockAndOrderCount();
  const { clear: clearCart } = useCart();
  const [processComplete, setProcessComplete] = useState<boolean>(false);

  // 유효성 체크 후 결제 승인 요청
  useEffect(() => {
    // 주문 데이터와 결제 금액이 없으면 리턴
    if (!orderData || processComplete || !query.amount) return;
    if (orderData.status === "Payment completed") {
      setProcessComplete(true);
      return;
    }

    // 주문과 실결제 금액이 일치하는지 확인 후
    if (orderData.amount == parseFloat(query.amount as string)) {
      // 결제 정보 확인 데이터를 상태에 업데이트
      // 결제 확인 데이터가 업데이트되면 결제 정보에 대한 fetch가 시작된다.
      updateOrderData({
        orderId: orderData?.orderId,
        orderData: { status: "Payment completed" },
      });

      // 재고 수량 업데이트
      updateStock({
        cart: orderData?.products,
        amount: parseInt(query.amount as string),
      });

      // 장바구니 or 임시카트 비우기
      if (query.target === "cart") {
        clearCart.mutate(orderData.uid);
      } else {
        sessionStorage.removeItem("tempCart");
      }
    } else {
      // 금액이 일치하지 않을 경우
      updateOrderData({
        orderId: orderData?.orderId,
        orderData: { status: "Payment failed" },
      });

      replace("/purchase/fail?status=amountdonotmatch", undefined, {
        shallow: true,
      });
    }
    setProcessComplete(true);
  }, [
    clearCart,
    orderData,
    processComplete,
    query.amount,
    query.orderId,
    query.target,
    replace,
    updateOrderData,
    updateStock,
  ]);

  // 결제 실패
  useEffect(() => {
    if (orderDataFail) {
      replace("/purchase/fail?status=badrequest", undefined, { shallow: true });
    }
  }, [orderDataFail, replace]);

  return (
    <main className="page-container flex flex-col">
      <Seo title="PURCHASE" />
      <HeaderBasic
        title={{
          text: processComplete ? "주문 완료" : "결제 확인 중...",
        }}
        toHome={true}
      />
      <section className="relative flex grow items-center justify-center px-12 xs:px-5">
        {processComplete ? (
          <div className="flex min-h-[300px] flex-col items-center justify-center pb-12 pr-5">
            <div className="sm:w-[60%]">
              <Done show={true} />
            </div>
            <p className="pl-5 text-3xl font-bold text-zinc-800">
              주문이 완료되었습니다.
            </p>
          </div>
        ) : (
          <div className="flex min-h-[300px] w-full flex-col items-center justify-center text-center">
            <Loading show={true} />
          </div>
        )}
      </section>
    </main>
  );
};

export default PurchaseSuccess;
