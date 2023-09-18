import Link from "next/link";
import Image from "next/image";
import { CollectionType } from "../types";

interface Props {
  collection: CollectionType;
}

const CollectionSectionThumbnail: React.FC<Props> = ({ collection }) => {
  return (
    <div className="group relative w-full overflow-hidden">
      <Link href={`/collections/${collection.id}`}>
        {/* <div className="relative mx-[-1px] aspect-auto max-h-[300px] overflow-hidden xl:max-h-[450px]"> */}
        <div className=" flex flex-col justify-center items-center">
          <Image
            src={collection.img.src}
            alt={collection.enTitle}
            // className="object-contain transition-transform duration-500 group-hover:scale-105 "
            // className="h-full max-w-[800px]  group-hover:scale-110 "
            className="max-w-[1000px] w-full h-auto transition-transform duration-500  group-hover:scale-110 "
            sizes="100vw"
            width={0}
            height={0}
          />
        </div>
        <hgroup
          className={`z-1 absolute break-keep transition-all duration-500 group-hover:opacity-80 group-hover:blur ${
            collection.titlePos[0] === "top"
              ? "top-[10%] bottom-auto"
              : collection.titlePos[0] === "bottom"
              ? "top-auto bottom-[10%]"
              : "top-0 bottom-0 my-auto h-fit"
          } ${
            collection.titlePos[1] === "left"
              ? "left-[5%] right-auto text-left"
              : collection.titlePos[1] === "right"
              ? "left-auto right-[5%] text-right"
              : "left-0 right-0 text-center"
          }`}
          style={{ textShadow: "1px 1px 0px #52525b" }}
        >
          <h1 className="mb-2 text-6xl font-bold text-zinc-50 lg:text-5xl md:text-4xl sm:text-3xl">
            {collection.enTitle}
          </h1>
          <h2 className="text-4xl font-semibold text-zinc-50 lg:text-3xl md:text-2xl sm:text-lg">
            {collection.subTitle}
          </h2>
        </hgroup>
      </Link>
      <Image
        src={`/images/${collection.title}-0.jpg`}
        alt=""
        className="max-w-[1000px] w-full h-auto mx-auto"
        sizes="100vw"
        width={990}
        height={990}
      />
    </div>
  );
};

export default CollectionSectionThumbnail;
