import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { OrderData, UserData } from "../types";
import Button from "./Button";
//import OrderListItemDetail from "./OrderListItemDetail";

interface Props {
  //  orderData: OrderData;
  userData: UserData;
  isAdmin?: boolean;
}

const UserListItem: React.FC<Props> = ({
  //orderData,
  isAdmin = false,
  userData,
}) => {
  const { query } = useRouter();

  // const onCopyOrderId = (e: MouseEvent<HTMLButtonElement>, orderId: string) => {
  //   e.preventDefault();

  //   if (typeof window === 'undefined' || !orderId) return;

  //   window.navigator.clipboard.writeText(orderId);
  // };

  const onCopyUid = (e: MouseEvent<HTMLButtonElement>, uid: string) => {
    e.preventDefault();

    if (typeof window === "undefined" || !uid) return;

    window.navigator.clipboard.writeText(uid);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-50 shadow-lg shadow-zinc-300">
      <li
        className={`relative flex flex-wrap items-center justify-between gap-x-12 gap-y-5 whitespace-nowrap p-5 text-2xl font-semibold text-zinc-800 xs:px-2`}
      >
        <div className="flex flex-col gap-1 md:gap-0">
          {/* <h4 className="text-sm text-zinc-500 xs:text-xs">
              <span className="sm:hidden">ID:</span>
              {orderData.orderId}{" "}
              <Button
                tailwindStyles="text-xs px-1 py-[2px]"
                onClick={(e) => onCopyOrderId(e, orderData.orderId)}
              >
                복사<span className="sm:hidden">하기</span>
              </Button>
            </h4> */}
          {isAdmin && (
            <h4 className="text-sm text-zinc-500 xs:text-xs">
              <span>UID : </span>
              {userData?.user?.uid}{" "}
              <Button
                tailwindStyles="text-xs px-1 py-[2px]"
                onClick={(e) => onCopyUid(e, userData?.user?.uid as string)}
              >
                복사<span className="sm:hidden">하기</span>
              </Button>
              <span>이름 : </span>
              {userData.user?.displayName}{" "}
            </h4>
          )}
        </div>

        <div className="w-full text-end text-sm text-zinc-500">
          <div>{`추가된 날짜 : ${new Date(
            userData.user?.createdAt as string
          ).toLocaleString("ko-KR")}`}</div>
          <div>{`최근 로그인 : ${new Date(
            userData.user?.lastLoginAt as string
          ).toLocaleString("ko-KR")}`}</div>
        </div>
      </li>
      {/* {query.detail === orderData.orderId && (
        <OrderListItemDetail
          orderData={orderData}
          isAdmin={isAdmin}
          userData={userData}
        />
      )} */}
    </div>
  );
};

export default UserListItem;
