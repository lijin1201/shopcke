import useGetUsers from "../hooks/useAdminAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
//import useInput from "../hooks/useInput";
import useIsAdmin from "../hooks/useIsAdmin";
import UserListItem from "./UserListItem";
import { UserData } from "../types";

interface Props {
  userData: UserData | null;
}

const UserList: React.FC<Props> = ({ userData }) => {
  //const [skeletonCount, setSkeletonCount] = useState<number>(12);
  const { pathname } = useRouter();
  const isAdmin = useIsAdmin(userData);
  //   const [filter, setFilter] = useState<OrderFilterType>({
  //     orderby: "updated",
  //     status: "all",
  //     orderId: "",
  //     uid: "",
  //   });
  const {
    data: { data: usersData, isFetching, fetchNextPage },
    // count: { data: totalCountData },
  } = useGetUsers({ isAdmin });
  const [users, setUsers] = useState<Array<UserData>>([]);

  useEffect(() => {
    let userList: Array<UserData> = [];

    usersData?.pages.forEach(
      (page: { users: Array<UserData>; lastVisible: string | null }) =>
        page?.users.forEach((user: UserData) => {
          userList.push(user);
        })
    );

    setUsers(userList);
  }, [usersData]);

  return (
    <section>
      <div className="mb-5 text-left text-base font-semibold text-zinc-500">
        총 {/*totalCountData || 0*/}명 사용자
      </div>

      <ul className="flex flex-col gap-12 border-y py-12">
        {users?.map((user, i) => {
          return (
            <UserListItem
              key={i}
              userData={user}
              isAdmin={isAdmin && pathname.includes("admin")}
            />
          );
        })}
        {/* {!isFetching && totalCountData === 0 && (
          <p className="break-keep py-16 text-center text-lg font-semibold text-zinc-600">
            주문 내역이 없습니다.
          </p>
        )}
        {!isFetching &&
        totalCountData &&
        Object.keys(orders).length < totalCountData ? (
          <div className="mx-auto mt-5 text-center">
            <Button tailwindStyles="w-[200px]" onClick={onLoadMore}>
              더 보기
            </Button>
          </div>
        ) : null}
        {(!userData || isFetching) && skeletonGenerator(skeletonCount)} */}
      </ul>
    </section>
  );
};

export default UserList;
