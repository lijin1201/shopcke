import Image from "next/image";
import Link from "next/link";
//import HeadphoneIcon from '../public/svgr/headphone.svg?svgr';
import HeaderHomeSection from "./HeaderHomeSection";
import categoryData from "../public/json/categoryData.json";

const QuickCategory = () => {
  //https://merrily-code.tistory.com/138
  //"next.config.js change webpack loader for specific svg" ==>
  //https://stackoverflow.com/questions/66764119/getting-nextjs-image-component-svgr-webpack-to-play-nicely-together

  const svgDir = require.context("!@svgr/webpack!../public/icons");

  const images = Object.values(categoryData).map((category) => {
    let svgM = null;
    try {
      svgM = svgDir(`./${category.path}.svg`).default;
    } catch (error) {
      console.log("svgDir error");
    }
    return {
      name: category.path,
      svg: svgM,
    };
  });

  const RenderImgByCategory = ({
    path,
    ...rest
  }: {
    path: string;
    [rest: string]: any;
  }) => {
    const Svg = images.find((img) => img.name === path)?.svg;
    return Svg ? <Svg {...rest} /> : <span>{path}</span>;
  };

  return (
    <section>
      <HeaderHomeSection
        href="/products/categories/all"
        text=/* "제품 둘러보기" */ "Browse our products"
      />
      {/* <ul className="mx-auto flex flex-wrap justify-evenly gap-10 px-12 pb-24 text-lg font-semibold text-amber-900 md:grid md:grid-cols-2"> */}
      <ul
        className="mx-auto grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] \
      align-baseline justify-items-center  auto-rows-auto gap-10 px-12 pb-24 text-lg font-semibold text-amber-900 "
      >
        {Object.values(categoryData).map((category, i) => {
          if (category.path === "all" || category.path === "test") return null;
          return (
            <li
              // className="group m-auto max-w-[100px] basis-[20%] text-center"
              className="group w-[100px] text-center"
              key={i}
            >
              <Link
                href={{
                  pathname: `/products/categories/${category.path}/all`,
                  query: { orderby: "popularity" },
                }}
              >
                <div className="align-baseline mb-2 flex aspect-square items-center justify-center overflow-hidden  border-4 border-zinc-200">
                  <RenderImgByCategory
                    path={category.path}
                    className={
                      "trainsiton-transform h-auto w-[70%] duration-500 group-hover:scale-105 " +
                      ("iconClass" in category ? category.iconClass : "")
                    }
                  />
                </div>
                <h4>{category.name}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* test */}
      <div className=" grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]  align-text-top justify-items-center text-lg font-semibold text-amber-900 ">
        <div
          // className="group m-auto max-w-[100px] basis-[20%] text-center"
          className=" w-[50px]  box-border border-2"
        >
          abcd abcd
          {/* <h4 className="">battery</h4> */}
        </div>
        <div
          // className="group m-auto max-w-[100px] basis-[20%] text-center"
          className="group m-auto w-[100px] "
          key="2"
        >
          {/* <div className="align-baseline mb-2 flex aspect-square items-center justify-center overflow-hidden  border-4 border-zinc-200">
            <RenderImgByCategory
              path="health food"
              className={
                "trainsiton-transform h-auto w-[70%] duration-500 group-hover:scale-105 "
              }
            />
          </div> */}
          efgh efgh
          <h4 className="">Health Food</h4>
        </div>
      </div>
      <style jsx>{`
        .icon {
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            #box-shadow: inset 0 0 0 1px #e4e4e7;
            transition: all 0.5s;
          }
          &:hover {
            &::before {
              box-shadow: inset 0 0 0 50px #e4e4e7;
            }
          }
        }
      `}</style>
    </section>
  );
};

export default QuickCategory;
