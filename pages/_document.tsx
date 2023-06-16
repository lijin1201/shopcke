import { Html, Main, Head, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko-KR">
      <Head>
        {/* 파비콘 */}
        <link rel="icon" href="/logos/favicon.ico" />
        {/* 구글 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        {/* 기본 meta 데이터 */}
        <meta name="author" content="HanaElectron" />
        <meta
          name="description"
          content="HanaElectron 쇼핑몰 웹사이트입니다."
        />
        {/* 오픈그래프 */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_ABSOLUTE_URL}
        />
        <meta property="og:title" content="HanaElectron" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/hana262.appspot.com/o/logos%2FHanaE-logo.png?alt=media&token=ae3d3c68-095e-42b5-bc4b-4b639fe4be02"
        />
        <meta
          property="og:description"
          content="HanaElectron  쇼핑몰 웹사이트입니다."
        />
        <meta property="og:site_name" content="HanaElectron" />
        <meta property="og:locale" content="ko_KR" />
        {/* 트위터카드 */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`HanaElectron`} />
        <meta
          name="twitter:description"
          content="HanaElectron 쇼핑몰 웹사이트입니다."
        />
        <meta
          name="twitter:image"
          content="https://firebasestorage.googleapis.com/v0/b/hana262.appspot.com/o/logos%2FHanaE-logo.png?alt=media&token=ae3d3c68-095e-42b5-bc4b-4b639fe4be02"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
