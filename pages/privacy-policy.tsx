import HeaderBasic from "../components/HeaderBasic";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import htmlContent from "public/static/privacy-policy.html";

const PrivacyPolicy = () => {
  const [html, setHtml] = useState("");
  const router = useRouter();

  // useEffect(() => {
  //   // Fetch and set the HTML content
  //   // fetch(htmlContent)
  //   //   .then((response) => response.text())
  //   //   .then((data) => setHtml(data));
  //   // setHtml("<span>test Html</span>");
  //   fetch(htmlContent)
  //     .then((response) => response.text())
  //     .then((data) => setHtml(data));
  // }, [router.asPath]);
  return (
    <main className="page-container">
      <Seo title="PRIVACY POLICY" />

      <HeaderBasic title={{ text: "Privacy Policy" }} />
      {/* <section className="flex flex-col gap-12 whitespace-pre-wrap break-keep px-12 pb-24 indent-2 text-base text-zinc-800 xs:px-5"> */}
      <section className="flex flex-col gap-12 break-keep">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </section>
    </main>
  );
};

export default PrivacyPolicy;
