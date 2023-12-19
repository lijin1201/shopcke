import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  url?: string;
  img?: string;
}

const Seo: React.FC<Props> = ({ title, description, url, img }) => {
  return (
    <Head>
      <title>{title ? `Shopcke │ ${title}` : "Shopcke"}</title>
      {/* 기본 meta 데이터 */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="HanaElectron" />
      <meta
        name="description"
        content={description || "Shoopcke site for online shopping."}
      />
      {/* 오픈그래프 */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={url || process.env.NEXT_PUBLIC_ABSOLUTE_URL}
      />
      <meta
        property="og:title"
        content={title ? `Shopcke │ ${title}` : "Shopcke"}
      />
      <meta
        property="og:image"
        content={
          img ||
          "https://firebasestorage.googleapis.com/v0/b/hana262.appspot.com/o/logos%2FHanaE-logo.png?alt=media&token=ae3d3c68-095e-42b5-bc4b-4b639fe4be02"
        }
      />
      <meta
        property="og:description"
        content={description || "Online shopping mall by hanaelectron."}
      />
      <meta property="og:site_name" content="Shopcke" />
      <meta property="og:locale" content="ko_KR" />
      {/* 트위터카드 */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={title ? `Shopcke │ ${title}` : "Shopcke"}
      />
      <meta
        name="twitter:description"
        content={description || "Online shopping mall by hanaelectron."}
      />
      <meta
        name="twitter:image"
        content={
          img ||
          "https://firebasestorage.googleapis.com/v0/b/hana262.appspot.com/o/logos%2FHanaE-logo.png?alt=media&token=ae3d3c68-095e-42b5-bc4b-4b639fe4be02"
        }
      />
    </Head>
  );
};

export default Seo;
