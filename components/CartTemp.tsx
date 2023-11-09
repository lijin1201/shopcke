import {
  ChangeEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import useToggleBookmark from "../hooks/useToggleBookmark";
import useToggleCart from "../hooks/useToggleCart";
import { CartType, ProductType, SizeType, TempCartType } from "../types";
import Button from "./Button";
import Alert from "./Alert";
import useAlert from "../hooks/useAlert";
import bookmarkFillIcon from "../public/icons/bookmark-fill-square.svg";
import bookmarkIcon from "../public/icons/bookmark-square.svg";
import Image from "next/image";
import useGetUserData from "../hooks/useGetUserData";
import { useRouter } from "next/router";
import useCheckTempCartStock from "../hooks/useCheckTempCartStock";
import CartTempItemList from "./CartTempItemList";

interface Props {
  product: ProductType;
  hoveredThumbnail: number;
  setHoveredThumbnail: Dispatch<SetStateAction<number>>;
  setHoveredMap: Dispatch<SetStateAction<string>>;
}

const CartTemp: React.FC<Props> = ({
  product,
  hoveredThumbnail,
  setHoveredThumbnail,
  setHoveredMap,
}) => {
  const { push } = useRouter();
  const checkTempCartStock = useCheckTempCartStock();
  const { data: userData } = useGetUserData();
  const { triggerAlert, showAlert } = useAlert();
  const [tempCart, setTempCart] = useState<TempCartType>({});
  const { addCart, isInCart } = useToggleCart(product.id);
  const { toggleBookmark, isInBookmark } = useToggleBookmark(product.id);

  const selectRef = useRef<HTMLSelectElement>(null);

  const triggerSelectEvent = (val: string) => {
    if (selectRef.current) {
      selectRef.current.value = val; // Programmatically set the value to 'option2'
      const event = new Event("change", { bubbles: true });
      selectRef.current.dispatchEvent(event);
    }
  };
  //todo: sizeOrder to actual size in product
  // 사이즈 정렬 기준
  const sizeOrder = {
    blue: 0,
    pink: 1,
    black: 2,
    white: 3,
    // xl: 4,
    // xxl: 5,
    // xxxl: 6,
    other: 7,
    all: 8,
  };
  // 사이즈 드롭다운 옵션 생성하기
  const sizeOptionGenerator = (product: ProductType) => {
    const optionList = Array<ReactNode>([]);

    Object.keys(product.stock)
      .sort((a, b) => {
        return sizeOrder[a as SizeType] - sizeOrder[b as SizeType];
      })
      .forEach((key, i) => {
        const size = key as SizeType;
        const stock = product.stock[size as SizeType];
        optionList.push(
          <option
            value={size}
            key={i}
            disabled={!stock}
            // onMouseEnter={() => setHoveredThumbnail(-1)}
          >
            {size.toUpperCase()} {!stock && "품절"}
            {/* { {size === "other" ? "기본" : size.toUpperCase()} {!stock && "품절"} } */}
          </option>
        );
      });

    return optionList;
  };

  // 사이즈 선택 시 임시 카트에 아이템 추가
  const onSelectSize = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const size = e.target.value as SizeType;
    setHoveredThumbnail(sizeOrder[size]);
    setHoveredMap(size);

    if (!tempCart.hasOwnProperty(size))
      setTempCart((prev) => ({ ...prev, [size]: 1 }));
  };

  const onToggleBookmark = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleBookmark();
  };

  const onAddCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!checkTempCartStock(product, tempCart)) {
      window.alert("이미 품절된 상품이 포함되어 있습니다.");
      return;
    }

    addCart(tempCart);

    if (Object.keys(tempCart).length !== 0) {
      triggerAlert(1500);
    }
  };

  const onPurchase = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (Object.keys(tempCart).length === 0) {
      window.alert("옵션을 선택해주세요.");
      return;
    } else if (!checkTempCartStock(product, tempCart)) {
      window.alert("이미 품절된 상품이 포함되어 있습니다.");
      return;
    } else {
      const directPurchaseTarget: CartType = { [product.id]: tempCart };

      sessionStorage.setItem("tempCart", JSON.stringify(directPurchaseTarget));

      push(`/purchase?target=tempCart`);
    }
  };

  // 기존 카트내역 불러오기
  useEffect(() => {
    if (!userData || !userData.cart) return;

    const { cart } = userData;

    if (cart.hasOwnProperty(product.id)) {
      setTempCart(cart[product.id]);
    }
    var ev2 = new Event("select");
  }, [product.id, userData]);

  useEffect(() => {
    if (Object.keys(product.stock).length <= 1)
      triggerSelectEvent(
        Object.keys(product.stock).find((x) => x !== undefined) as string
      );
  });

  return (
    <form className="mt-auto flex flex-col gap-3 pt-5">
      {/* //check if only one option */}
      {/* triggerSelectEvent(Object.keys(product.stock).find(x=>x!==undefined);) */}

      <select
        ref={selectRef}
        hidden={Object.keys(product.stock).length <= 1}
        className="mx-auto h-12 w-[100%] cursor-pointer break-keep rounded-md bg-zinc-200 px-4 py-2 text-center text-lg font-semibold text-zinc-600 transition-all hover:bg-zinc-100"
        onChange={onSelectSize}
        value="size"
      >
        <option value="size" disabled>
          Select option
        </option>
        {sizeOptionGenerator(product)}
      </select>
      <CartTempItemList
        product={product}
        tempCart={tempCart}
        setTempCart={setTempCart}
      />
      <div className="flex gap-2">
        <Button
          onClick={onAddCart}
          tailwindStyles={`h-12 grow mx-auto text-lg`}
          disabled={product.totalStock <= 0}
        >
          {isInCart && Object.keys(tempCart).length !== 0
            ? "Update cart"
            : "Add to cart"}
        </Button>
        <Button
          onClick={onToggleBookmark}
          tailwindStyles="group h-12 aspect-square px-1 py-1 m-auto overflow-hidden"
        >
          <Image
            src={isInBookmark ? bookmarkFillIcon : bookmarkIcon}
            alt="Add to favorite"
            className="m-auto transition-transform duration-500 group-active:scale-150 group-active:duration-100"
            width="24"
            height="24"
          />
        </Button>
      </div>
      <Button
        theme="black"
        tailwindStyles={`h-12 w-[100%] mx-auto text-lg `}
        disabled={product.totalStock <= 0}
        onClick={onPurchase}
      >
        Buy
      </Button>
      <Alert show={showAlert} text={"Added to cart."} />
    </form>
  );
};

export default CartTemp;
