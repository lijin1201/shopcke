import { FirebaseError } from "firebase/app";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  collection,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../fb";
import { UserData } from "../types";

const useGetUsers = ({
  filter,
  uid,
  isAdmin = false,
}: {
  filter: any; //UserFilterType

  uid?: string;
  isAdmin?: boolean;
}) => {
  const data = useInfiniteQuery<any, FirebaseError>({
    queryKey: ["users", uid, filter, isAdmin],
    queryFn: ({ pageParam }) => getUsers(pageParam, filter, uid, isAdmin),
    getNextPageParam: (lastPage, pages) => lastPage?.lastVisible,
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 300000,
  });

  const count = useQuery<any, FirebaseError>({
    queryKey: ["usersCount", filter, uid, isAdmin],
    queryFn: () => getUsersCount(filter, uid, isAdmin),
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 300000,
    staleTime: 300000,
  });

  return { data, count };
};

export default useGetUsers;

const getUsers = async (
  pageParam: DocumentData,
  filter: any,
  uid?: string,
  isAdmin?: boolean
) => {
  if (!isAdmin) return;
  //  if (uid === "") return;

  const result: { users: Array<UserData>; lastVisible: DocumentData | null } = {
    users: [],
    lastVisible: null,
  };

  const queries: Array<QueryConstraint> = [limit(12)];

  // orderby
  if (!filter.orderby || filter.orderby === "updated") {
    queries.push(orderBy("updatedAt", "desc"));
  } else if (filter.orderby === "createdAt") {
    queries.push(orderBy("createdAt", "desc"));
  } else if (filter.orderby === "createdAtAcs") {
    queries.push(orderBy("createdAt", "asc"));
  }

  // uid
  if (filter.uid) {
    queries.push(where("uid", "==", filter.uid));
  }

  //displayName
  //first we need to get uids for the displayName
  if (filter.displayName) {
    queries.push(where("displayName", "==", filter.displayName));
  }

  if (pageParam) {
    queries.push(startAfter(pageParam));
  }

  const q = query(collection(db, "users"), ...queries);

  const snapshot = await getDocs(q);

  snapshot.forEach(async (doc) => {
    result.users.push(doc.data() as UserData);
  });

  result.lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return result;
};

const getUsersCount = async (filter: any, uid?: string, isAdmin?: boolean) => {
  if (!isAdmin) return;
  //if (uid === "") return;

  let totalCount: number = 0;

  const queries: Array<QueryConstraint> = [];

  // uid
  if (filter.uid) {
    queries.push(where("uid", "==", filter.uid));
  }

  if (filter.displayName) {
    queries.push(where("displayName", "==", filter.displayName));
  }

  const q = query(collection(db, "users"), ...queries);

  const snapshot = await getCountFromServer(q);

  totalCount = snapshot.data().count;

  return totalCount;
};
