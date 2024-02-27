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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function App({ Component, pageProps }: AppProps) {
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
        {/* <PayPalScriptProvider
          deferLoading={true}
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            currency: "USD",
            intent: "capture",
          }}
        > */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {/* </PayPalScriptProvider> */}
      </Hydrate>
    </QueryClientProvider>
  );
}
