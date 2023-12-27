import Collections from "../components/Collections";
import QuickCategory from "../components/QuickCategory";
import Seo from "../components/Seo";
import Image from "next/image";

const Home = () => {
  return (
    <main className="page-container bg-white">
      <Seo />
      {/* head image */}
      <Image
        src={`/images/Featured Products-0.jpg`}
        alt=""
        className="max-w-[1000px] w-full h-auto mx-auto"
        sizes="100vw"
        width={990}
        height={990}
      />
      <Collections />
      <QuickCategory />
    </main>
  );
};

export default Home;
