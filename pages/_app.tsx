import React, { useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
//import "@nextcss/reset";
import Layout from "../components/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../fb";
import { getUserData } from "../hooks/useGetUserData";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init("623e3a10104babe908c89a1d41533806");
    console.log(window.Kakao.isInitialized());
  }

  const [queryClient] = useState(() => new QueryClient());

  // 인승 상태 감시
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }
    });

    queryClient.fetchQuery("user", getUserData, {
      retry: false,
      cacheTime: 300000,
    });
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
            integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
            crossOrigin="anonymous"
            onLoad={kakaoInit}
          ></Script>
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  );
}
