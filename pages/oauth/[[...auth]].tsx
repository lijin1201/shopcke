import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import HeaderBasic from "../../components/HeaderBasic";
import Seo from "../../components/Seo";
import { signInWithCustomToken } from "firebase/auth";
import { auth as firebaseAuth } from "../../fb";
import useGetUserData from "../../hooks/useGetUserData";
import { useMutation, useQueryClient } from "react-query";
import useAccount from "../../hooks/useAccount";

const Auth = () => {
  const {
    editProfile: { mutate: editProfile },
  } = useAccount();
  const REDIRECT_URI =
    process.env.NEXT_PUBLIC_ABSOLUTE_URL + "/oauth/kakao/callback";

  // Initializing useRouter()
  const router = useRouter();

  console.log(router.query);
  const { code, state } = router.query;
  console.log("state1: " + state);

  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const { refetch } = useGetUserData();
  const queryClient = useQueryClient();

  // useCallback(
  const signKakaoToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      //client_secret: CLIENT_SECRET,
    });
    console.log(payload);
    try {
      // access token 가져오기
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      console.log(res);

      // const res2 = await axios.post(
      //   process.env.NEXT_PUBLIC_KAKAO_CLOUD_FIREBASE as string,
      //   {
      //     accessToken: res.data.access_token,
      //     provider: "kakao",
      //   }
      // );

      const res2 = await axios.get(
        (process.env.NEXT_PUBLIC_KAKAO_AUTH as string) + "/firebaseCustomToken",
        {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        }
      );

      console.log(res2);
      const { firebaseToken } = res2.data;
      setUserId(res2.data.fireUid);
      setNickName(res2.data.displayName);

      await signInWithCustomToken(firebaseAuth, firebaseToken).then(
        (userCredential) => {
          console.log(userCredential);

          try {
            editProfile({ name: res2.data.displayName });
            window.alert("계정 등록이 완료되었습니다.");

            // replace("/");
          } catch (error) {
            console.error(error);
          }
          return userCredential.user;
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  // [REDIRECT_URI, code, matched, queryClient]);
  const { mutateAsync: loginKakaoAccount, isLoading } = useMutation(
    "user",
    signKakaoToken,
    {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
      retry: false,
    }
  );

  useEffect(() => {
    // const getToken = async () => {
    //   const data = await getTokenA();
    //   setMatched(data);
    // };
    if (!router.isReady) return;
    const pathWithoutParameters = router.asPath.split("?")[0];
    if (pathWithoutParameters == "/oauth/kakao/callback") {
      //setMatched("kakao callback:  " + getToken());
      loginKakaoAccount().then(() => {
        refetch();
        if (state) {
          router.replace(state as string);
        } else {
          router.replace("/");
        }
        // router.replace(state as string);
      });
    }
  }, [router.asPath, router, refetch, loginKakaoAccount, state]);

  return (
    <main className="page-container">
      <Seo title="LOGIN" />
      <HeaderBasic title={{ text: "카카오 로그인 중 ..." }} />{" "}
      {/* <h1>url: {process.env.NEXT_PUBLIC_ABSOLUTE_URL + router.asPath}</h1> */}
      <h2>{nickName}</h2>
    </main>
  );

  // return (
  //   <main className="page-container">
  //     <h1>
  //       asPath :- {router.asPath} ; pathname: {router.pathname}{" "}
  //     </h1>
  //     <h1>
  //       matched code: {matched} + {code}
  //     </h1>
  //     <h1>url: {process.env.NEXT_PUBLIC_ABSOLUTE_URL + router.asPath}</h1>
  //     <h2>{user_id}</h2>
  //     <h2>{nickName}</h2>
  //   </main>
  // );
};

export default Auth;
