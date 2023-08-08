import HeaderBasic from "../components/HeaderBasic";
import Seo from "../components/Seo";

const PrivacyPolicy = () => {
  return (
    <main className="page-container">
      <Seo title="PRIVACY POLICY" />

      <HeaderBasic title={{ text: "Privacy Policy" }} />
      <section className="flex flex-col gap-12 whitespace-pre-wrap break-keep px-12 pb-24 indent-2 text-base text-zinc-800 xs:px-5">
        {/* <em className="indent-0">개인정보처리.</em>
        <ol className="flex flex-col gap-12">
          <li className="flex flex-col gap-5">
            <strong className="indent-0"> </strong>

            <em className="indent-0">이하 개인정보 처리 방침 예시.</em>
            <p>
              Shopcke는 다음과 같이 웹사이트를 통해 이용자가 제공한 모든
              개인정보뿐만 아니라 개인정보의 처리를 위탁할 업체에 제공할 모든
              개인 정보를 현재 적용되는 정보통신망 이용촉진 및 정보보호 등에
              관한 법률(이하 “정보통신망법”), “개인정보 보호법” 등 관계 법령 및
              Shopcke의 개인정보 처리방침에 따라 처리합니다.
            </p>
          </li>
        </ol>
        <em className="mt-10 indent-0">2023년 6 월 16 일.</em> */}
      </section>
    </main>
  );
};

export default PrivacyPolicy;
