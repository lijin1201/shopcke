import HeaderBasic from "../../../components/HeaderBasic";
import FormProduct from "../../../components/FormProduct";
import useIsAdmin from "../../../hooks/useIsAdmin";
import { useRouter } from "next/router";
import useGetUserData from "../../../hooks/useGetUserData";
import { useEffect } from "react";
import Loading from "../../../components/AnimtaionLoading";
import Seo from "../../../components/Seo";

const New = () => {
  const { replace } = useRouter();
  const { data: userData, isFetched } = useGetUserData();
  const isAdmin = useIsAdmin(userData);

  useEffect(() => {
    if (userData && !isAdmin) {
      window.alert("권한이 없습니다.");
      replace("/", undefined, { shallow: true });
    }
  }, [isAdmin, replace, userData]);

  useEffect(() => {
    if (isFetched && !userData) {
      replace(
        {
          pathname: "/login",
          query: {
            from: "/admin",
          },
        },
        undefined,
        { shallow: true }
      );
    }
  }, [isFetched, replace, userData]);

  return (
    <main className="page-container flex flex-col">
      <Seo title="ADD PRODUCT" />
      <HeaderBasic title={{ text: "제품 추가" }} />
      {isAdmin ? (
        <section className="px-12 pb-24 xs:px-5">
          <FormProduct />
        </section>
      ) : (
        <div className="flex grow items-center justify-center">
          <Loading />
        </div>
      )}
    </main>
  );
};

export default New;
