//get user list using firebase function
import { FirebaseError } from "firebase/app";
import { useInfiniteQuery, useQuery } from "react-query";
import { UserData } from "../types";
import axios from "axios";
import { auth } from "../fb";

const useGetUsers = ({
  //  filter,

  isAdmin = false,
}: {
  // filter: any; //UserFilterType

  // uid?: string;
  isAdmin?: boolean;
}) => {
  const data = useInfiniteQuery<any, FirebaseError>({
    queryKey: ["users", isAdmin],
    queryFn: ({ pageParam }) => getUsers(pageParam, isAdmin),
    getNextPageParam: (lastPage, pages) => lastPage?.lastVisible,
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 300000,
  });

  return { data };
};

export default useGetUsers;

const getUsers = async (
  pageParam: string,
  //filter: any,
  //uid?: string,
  isAdmin?: boolean
) => {
  if (!isAdmin) return;

  const result: { users: Array<UserData>; lastVisible: string | null } = {
    users: [],
    lastVisible: null,
  };

  const idToken = await auth.currentUser?.getIdToken(true);

  const resUser = await axios.post(
    // process.env.NEXT_PUBLIC_KAKAO_CLOUD_FIREBASE as string,
    // "http://127.0.0.1:5001/hana262/us-central1/userList",
    "https://userList-" + process.env.NEXT_PUBLIC_FIREBASE_FUNCTION_URI,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    }
    // {
    //   pageParam: pageParam
    // }
  );

  resUser.data.users.forEach(async (doc: any) => {
    result.users.push({
      user: doc,
      addressData: null,
      bookmark: null,
      cart: null,
      order: null,
      phoneNumber: null,
    }); // {...[],  user: doc });
  });
  result.lastVisible = null; //or: res2.pageToken
  return result;
};
