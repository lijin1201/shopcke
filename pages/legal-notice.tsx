import Link from 'next/link';
import HeaderBasic from '../components/HeaderBasic';
import Seo from '../components/Seo';

const LegalNotice = () => {
  return (
    <main className="page-container">
      <Seo title="LEGAL NOTICE" />

      <HeaderBasic title={{ text: '이용 약관' }} />
      <section className="flex flex-col gap-12 whitespace-pre-wrap break-keep px-12 pb-24 indent-2 text-base text-zinc-800 xs:px-5">
        <em className="indent-0">
          사용자는 본 웹사이트를 참고하거나 사용하기 전에 다음 약관을 주의 깊게
          읽어야 합니다.
        </em>

        <p>
          이 웹사이트 (이하 <strong>&quot;웹사이트&quot;</strong>) 에 오신 것을
          환영합니다.
        </p>
        <div>
          본 웹사이트는 테스트 웹사이트이며 어떠한 수익 창출도 이직 이루어지지
          않습니다. 하나일렉트론주식회사는 본 웹사이트를 이용할 수 있는 테스트용
          아이디와 비밀번호를 제공합니다. 문론 회원가입 도 가능합니다.
          <div className="flex flex-col gap-1 p-5 indent-0">
            <div>아이디 : shop@sharklasers.com</div>
            <div>비밀번호 : shopcke</div>
          </div>
        </div>

        <em className="mt-10 indent-0">2023년 6 월 16 일.</em>
      </section>
    </main>
  );
};

export default LegalNotice;
