import { useRouter } from "next/router";
import React, { MouseEvent } from "react";
import Button from "../components/Button";
import Loading from "../components/AnimtaionLoading";
import LoginForm from "../components/FormLogin";
import HeaderBasic from "../components/HeaderBasic";
import useAccount from "../hooks/useAccount";
import Seo from "../components/Seo";
import Image from "next/image";
import googleLogo from "public/logos/SignInGoogleE.svg";

import useGetUserData from "../hooks/useGetUserData";

const Login = () => {
  const { query, push } = useRouter();
  const {
    login: { mutateAsync: login, isLoading },
  } = useAccount();

  const { refetch } = useGetUserData();

  const onGoogleLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    login({ provider: "google" })
      .then(() => {
        const fromPath = query.from as string;

        if (fromPath) {
          push(fromPath);
        } else {
          push("/");
        }
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            console.log("팝업이 닫혀 구글 계정 로그인이 중단 되었습니다.");
            console.error(error);
            break;
          default:
            console.error(error);
        }
      });
  };

  const onKakaoLoginClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const fromPath = query.from as string;
    const REDIRECT_URI =
      process.env.NEXT_PUBLIC_ABSOLUTE_URL + `/oauth/kakao/callback`;
    const link =
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}` +
      `&response_type=code&state=${
        fromPath ? encodeURIComponent(fromPath) : ""
      }`;

    push(link);
  };

  return (
    <React.Fragment>
      <main className="page-container">
        <Seo title="LOGIN" />
        <HeaderBasic title={{ text: /* "로그인" */ "Login" }} />
        <section className="flex justify-evenly gap-x-24 gap-y-10 px-12 pb-24 md:flex-col xs:px-5">
          <LoginForm />
          <section className="flex min-w-[150px] max-w-[450px] grow flex-col gap-10 text-zinc-800 md:max-w-full">
            <div>
              <h3 className="pb-5 text-xl font-semibold">
                {/* 계정이 없으신가요 */}No account yet?
              </h3>
              <Button href="/register" theme="black">
                {/* 계정 등록하기 */}Account registration
              </Button>
            </div>
            <div>
              <h3 className="pb-5 text-xl font-semibold">
                {/* 소셜 계정으로 이용하기 */}Use social network account
              </h3>
              <Button theme="gray" onClick={onGoogleLoginClick}>
                <Image
                  src={googleLogo}
                  alt="Sign in with Google"
                  className="w-80"
                />
                {/* 구글 계정으로 계속하기 */}
              </Button>

              {/* <Button theme="gray" onClick={onKakaoLoginClick}> */}
              <button className="relative" onClick={onKakaoLoginClick}>
                <Image
                  className="w-80"
                  src="/logos/kakao_login_large_narrow.png"
                  alt="Login with Kakao"
                  width={0}
                  height={0}
                  sizes="100vw"
                  // fill
                />
                {/* 카카오 계정으로 계속하기 */}
              </button>
              {/* </Button> */}
            </div>
            <div>
              <h3 className="pb-5 text-xl font-semibold">
                {/* 로그인에 문제가 있으신가요 */}Problems in login?
              </h3>
              <Button theme="black" href="/pwreset">
                {/* 비밀번호 재설정하기 */}Reset password
              </Button>
            </div>
          </section>
        </section>
      </main>
      <Loading show={isLoading} fullScreen={true} />
    </React.Fragment>
  );
};

export default Login;
