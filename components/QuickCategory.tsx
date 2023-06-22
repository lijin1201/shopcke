import Image from 'next/image';
import Link from 'next/link';
import clothIcon from '../public/icons/clothes.svg';
import hatIcon from '../public/icons/hat.svg';
import shoesIcon from '../public/icons/shoes.svg';
import bagIcon from '../public/icons/bag.svg';
import jewelIcon from '../public/icons/jewel.svg';
//import HeadphoneIcon from '../public/svgr/headphone.svg?svgr';
import HeaderHomeSection from './HeaderHomeSection';
import categoryData from '../public/json/categoryData.json';

const QuickCategory = () => {
  //https://merrily-code.tistory.com/138
  //"next.config.js change webpack loader for specific svg" ==>
  //https://stackoverflow.com/questions/66764119/getting-nextjs-image-component-svgr-webpack-to-play-nicely-together

  const svgDir = require.context('!@svgr/webpack!../public/icons');

  const images = Object.values(categoryData).map((category) => {
    let svgM = null;
    try {
      svgM = svgDir(`./${category.path}.svg`).default;
    } catch (error) {
      console.log('svgDir error');
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
      <HeaderHomeSection href="/products/categories/all" text="제품 둘러보기" />
      <ul className="mx-auto flex flex-wrap justify-evenly gap-10 px-12 pb-24 text-lg font-semibold text-amber-900 md:grid md:grid-cols-2">
        {Object.values(categoryData).map((category, i) => {
          if (category.path === 'all') return null;
          return (
            <li
              className="group m-auto max-w-[100px] basis-[20%] text-center"
              key={i}
            >
              <Link
                href={{
                  pathname: `/products/categories/${category.path}/all`,
                  query: { orderby: 'popularity' },
                }}
              >
                <div className="icon relative mb-2 flex aspect-square items-center justify-center overflow-hidden  border-4 border-zinc-200">
                  <RenderImgByCategory
                    path={category.path}
                    className={
                      'trainsiton-transform h-auto w-[70%] duration-500 group-hover:scale-105 ' +
                      ('iconClass' in category ? category.iconClass : '')
                    }
                  />
                </div>
                <h4>{category.name}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
      <style jsx>{`
        .icon {
          &::before {
            content: '';
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
