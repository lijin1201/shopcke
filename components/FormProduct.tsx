import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import useInput from "../hooks/useInput";
import {
  Category,
  CategoryName,
  ColorType,
  GenderType,
  ImageType,
  ProductType,
  SizeType,
  StockType,
} from "../types";
import categoryData from "../public/json/categoryData.json";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import useInputImg from "../hooks/useInputImg";
import useProduct, { checkIfFileExists } from "../hooks/useProduct";
import Loading from "./AnimtaionLoading";
import { useRouter } from "next/router";
import filterData from "../public/json/filterData.json";
import axios from "axios";
import { MouseEvent } from "react";

interface Props {
  prevData?: ProductType;
}

const FormProduct: React.FC<Props> = ({ prevData }) => {
  const { replace } = useRouter();
  const filesInputRefs = useRef<Array<HTMLInputElement>>([]);
  const optionImgRefs = useRef<Array<HTMLInputElement>>([]);
  const {
    files: thumbnail,
    onFilesChange: onThumbnailChange,
    setFiles: setThumbnailFiles,
  } = useInputImg(null);
  const {
    files: optionsThumb,
    onFilesChange: onOptionsThumbChange,
    setFiles: setOptionsThumbFiles,
  } = useInputImg(null);
  const {
    files: detailImgs,
    onFilesChange: onDetailImgsChange,
    setFiles: setDetailImgsFiles,
  } = useInputImg(null);
  const {
    value: category,
    setValue: setCategory,
    onChange: onCategoryChange,
  } = useInput<CategoryName | "">("");
  const [subCategoryList, setSubCategoryList] = useState<Array<Category>>([]);
  const [optionList, setOptionList] = useState<Array<any> | undefined>([]);
  const {
    value: subCategory,
    setValue: setSubCategory,
    onChange: onSubCategoryChange,
  } = useInput<string>(subCategoryList[0]?.path);
  const {
    value: color,
    setValue: setColor,
    onChange: onColorChange,
  } = useInput<ColorType | "">("");
  const {
    value: gender,
    setValue: setGender,
    onChange: onGenderChange,
  } = useInput<GenderType | "">("");
  const {
    value: name,
    setValue: setName,
    onChange: onNameChange,
  } = useInput<string>("");
  const { value: price, setValue: setPrice } = useInput<number | "">(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const { value: stock, setValue: setStock } = useInput<StockType>({
    // xs: 0,
    // s: 0,
    // m: 0,
    // l: 0,
    // xl: 0,
    // xxl: 0,
    // xxxl: 0,
    // other: 0,
  });
  const {
    value: tags,
    setValue: setTags,
    onChange: onTagsChange,
  } = useInput<string>("");
  const {
    value: size,
    setValue: setSize,
    onChange: onSizeChange,
  } = useInput<Array<SizeType>>([]);
  const {
    value: description,
    setValue: setDescription,
    onChange: onDescriptionChange,
  } = useInput<string>("");
  const {
    set: { mutateAsync, isLoading },
    deleteOptionThumb: { mutateAsync: delOptionThumbAsync },
  } = useProduct();

  const {
    value: optionImgMap,
    setValue: setOptionImgMap,
    // onChange: onOptionImgMapChange,
  } = useInput<{
    [key: string]: FileList | ImageType;
  }>({});

  // 제품 등록 성공시 초기화
  const reset = () => {
    setCategory("");
    setSubCategory("");
    setSubCategoryList([]);
    setName("");
    setPrice(0);
    setGender("");
    setColor("");
    setStock({ blue: 0, pink: 0, black: 0, white: 0, other: 0 });
    setSize([]);
    setTags("");
    setDescription("");
    setThumbnailFiles(null);
    setDetailImgsFiles(null);
    setOptionsThumbFiles(null);
    if (filesInputRefs.current?.length !== 0) {
      filesInputRefs.current.forEach((input) => {
        input.value = "";
      });
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 사이즈 체크박스 생성
  const sizeCheckboxGenerator = () => {
    //change filterData to optionList
    let localFilterS: Array<{
      value: string;
      text: string;
    }>;
    // if (category === "headphone") {
    localFilterS = optionList as unknown as Array<{
      value: string;
      text: string;
    }>;
    // } else {
    //   localFilterS = filterData.size;
    // }
    // if (!localFilterS) // add "value: all; text: ALL" to it's array
    console.log("localFiterS: " + localFilterS);
    if (!localFilterS) {
      return <></>;
      //localFilterS = Array({ value: "all", text: "ALL" });
      //setSize((prev: Array<SizeType>) => [...prev, "all" as SizeType]);
    }
    // return filterData.size.map((cur, i) => {
    return localFilterS.map((cur, i) => {
      const onToggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        // e.preventDefault();

        if (size.some((size) => size === cur.value)) {
          // @ts-ignore
          setSize((prev: Array<SizeType>) =>
            prev.filter((size) => size !== (cur.value as SizeType))
          );
        } else {
          // @ts-ignore
          setSize((prev: Array<SizeType>) => [...prev, cur.value as SizeType]);
        }
      };

      return (
        <label key={i}>
          {cur.text}{" "}
          <input
            onChange={onToggleCheckbox}
            type="checkbox"
            checked={size.some((size) => size === cur.value)}
            value={cur.value}
          />
        </label>
      );
    });
  };

  // 사이즈 별 재고량 input 생성
  const uploadBySizeGenerator = () => {
    const onOptionImgMapChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | ImageType,
      sizei: SizeType
    ) => {
      const value =
        "id" in e
          ? e
          : e.target instanceof HTMLSelectElement
          ? JSON.parse(e.target.value)
          : e.target.files;

      setOptionImgMap(
        // @ts-ignored
        (prev: {
          [key: string]: FileList | ImageType;
        }): {
          [key: string]: FileList | ImageType;
        } =>
          ({
            ...prev,
            [sizei]: value,
          } as {
            [key: string]: FileList | ImageType;
          })
      );
    };
    return size.map((sizei, i) => {
      return (
        <label className="flex items-center gap-2" key={i}>
          <h4 className="w-14 text-center text-base font-semibold">
            {sizei.toUpperCase()}
          </h4>

          <input
            className="hidden"
            id={"uploadByOption" + i}
            ref={(el) => {
              if (el) filesInputRefs.current[3 + i] = el;
            }}
            type="file"
            onChange={(e) => {
              e.preventDefault();
              onOptionImgMapChange(e, sizei);
            }}
            required={!prevData}
            accept="image/*"
          />
          <label htmlFor={"uploadByOption" + i}>
            {" "}
            <i className="fa fa-cloud-upload"></i>Choose file
          </label>
          <h4>{filesInputRefs.current[3 + i]?.value as string}</h4>
          <h4>{JSON.stringify(optionImgMap[sizei])}</h4>
          {/* <h4>
            {optionImgMap[sizei] &&
              "id" in optionImgMap[sizei] &&
              (optionImgMap[sizei] as ImageType).src}
          </h4> */}

          {/* check existing in storage */}
          <input
            ref={(el) => {
              if (el) {
                optionImgRefs.current[i] = el;
              }
            }}
            type="text"
            //value=""f
            // onChange={async (e) => {
            //   e.preventDefault();
            //   prevData &&
            //     onOptionImgMapChange(
            //       await checkIfFileExists(prevData, e.target.value),
            //       sizei
            //     );
            // }}
            placeholder={
              (prevData?.optionsImgMap &&
                prevData?.optionsImgMap[sizei] &&
                "id" in prevData.optionsImgMap[sizei] &&
                (prevData.optionsImgMap[sizei] as ImageType).id) as string
            }
            style={{
              borderBottom: "1px solid #1f2937",
            }}
            className="px-2 py-1"
          />

          <button
            onClick={async (e) => {
              e.preventDefault();
              const img =
                prevData &&
                (await checkIfFileExists(
                  prevData,
                  optionImgRefs.current[i].value
                ));
              if (img?.id) {
                onOptionImgMapChange(img, sizei);
                optionImgRefs.current[i].style.backgroundColor = "lightgreen";
              } else {
                optionImgRefs.current[i].style.backgroundColor = "red";
              }
            }}
          >
            Set
          </button>

          <select
            onChange={(e) => onOptionImgMapChange(e, sizei)}
            style={{
              borderBottom: "1px solid #1f2937",
            }}
            className="px-2 py-1"
            value=""
            // required
          >
            <option value="" disabled>
              Select existing file
            </option>
            {prevData?.optionsThumb &&
              prevData?.optionsThumb.map((optThumb, i) => (
                <option key={i} value={JSON.stringify(optThumb)}>
                  {optThumb.id}
                </option>
              ))}
            {/* {Object.entries(categoryData).map(
              (category, i) =>
                category[0] !== "all" && (
                  <option key={i} value={category[0]}>
                    {category[1].name}
                  </option>
                )
            )} */}
          </select>
        </label>
      );
    });
  };

  const stockBySizeGenerator = () => {
    return size.map((sizei, i) => {
      const onStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setStock(
          // @ts-ignored
          (prev: StockType): StockType =>
            ({
              ...prev,
              [sizei]: value === "0" ? 0 : value === "" ? "" : parseInt(value),
            } as StockType)
        );
      };

      const removeStock = (e: MouseEvent<HTMLButtonElement>, name: string) => {
        e.preventDefault();
        // if (Object.keys(stock).length == 1) {
        if (size.length == 1) {
          setSize(["all"]);
          setStock(
            // @ts-ignored
            (prev: StockType): StockType =>
              Object.assign(
                {},
                ...Object.keys(prev).map((key) => ({ ["all"]: prev[key] }))
              )
          );
        } else {
          setStock(
            // @ts-ignored
            (prev: StockType): StockType =>
              Object.fromEntries(
                Object.entries(prev).filter(([key]) => key !== name)
              )
          );
          // @ts-ignore
          setSize((prev: Array<SizeType>) =>
            prev.filter((size) => size !== (name as SizeType))
          );
        }
      };

      return (
        <label className="flex items-center gap-2" key={i}>
          <>
            <h4 className="w-14 text-center text-base font-semibold">
              {sizei.toUpperCase()}
            </h4>
            {console.log(stock)}
            {!optionList?.some((option) => option.value === sizei) &&
              !(sizei === "all") &&
              size.length === 1 && (
                <Button onClick={(e) => removeStock(e, sizei)}>Remove</Button>
              )}
            <input
              type="number"
              value={stock[sizei]}
              min={0}
              onChange={onStockChange}
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              className="px-2 py-1"
            />
          </>
        </label>
      );
    });
  };

  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setPrice(e.target.value ? parseInt(e.target.value) : "");
    setPrice(e.target.value ? parseFloat(e.target.value) : "");
  };

  // 업로드
  const onProductUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category === "" || subCategory === "" || gender === "" || color === "")
      return;

    // 기타 태그 반영 및 상품 데이터
    const tagList: Array<string> = [...tags.split(" ")];

    // 태그 중복을 방지하기 위해 수정모드에서는 defaultTags를 추가하지 않는다.
    if (!prevData) {
      // 기본 상품 정보 태그
      const defaultTags = [
        category,
        subCategory,
        ...name.split(" "),
        categoryData[category].name,
      ];

      // 하위 카테고리 한글명 태그
      const KORsubCategory = categoryData[category].subCategories.find(
        (cur) => cur.path === subCategory
      )?.name;
      if (KORsubCategory) defaultTags.push(KORsubCategory);

      // 성별 관련 태그
      const genderTag =
        gender === "male"
          ? ["male", "man"] // ['남성', '남자']
          : gender === "female"
          ? ["female", "woman"] // ['여성', '여자']
          : ["male", "man", "female", "woman", "unisex", "neutral"]; // ['남성', '남자', '여성', '여자', '남녀공용', '공용'];

      tagList.push(...genderTag);
      tagList.push(...defaultTags);
    }

    // 선택되지 않은 사이즈는 탈락
    const existingStock: StockType = {};
    size.forEach((curSize) => {
      existingStock[curSize] = stock[curSize];
    });

    // 최종적으로 업로드할 상품 데이터 (이미지 경로는 mutate 과정에서 처리 후 할당)
    const product: ProductType = {
      category,
      color,
      date: prevData ? prevData.date : Date.now(),
      detailImgs: prevData ? prevData.detailImgs : [{ src: "", id: "" }],
      gender,
      id: prevData ? prevData.id : uuidv4(),
      thumbnail: prevData?.thumbnail ? prevData.thumbnail : { src: "", id: "" },
      optionsThumb: prevData?.optionsThumb ? prevData.optionsThumb : [],
      optionsImgMap: prevData?.optionsImgMap ? prevData.optionsImgMap : {},
      name,
      orderCount: prevData ? prevData.orderCount : 0,
      price: price as number,
      size, // 필터링용 사이즈
      stock: existingStock, // 옵션 선택용 사이즈 & 재고
      totalStock,
      subCategory,
      tags: tagList,
      description,
    };

    // 상품 데이터 업로드
    if (product)
      mutateAsync({
        product,
        files: {
          thumbnail,
          detailImgs,
          optionsImage: optionsThumb,
          optionImgMap,
        },
        isEdit: !!prevData,
      })
        .then(() => {
          window.alert("제품 등록이 완료되었습니다.");
          prevData ? replace(`/products/product/${prevData.id}`) : reset();
        })
        .catch(() => {
          window.alert(
            "제품 등록 과정에서 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요."
          );
        });
  };

  // 상품 수정 모드일 경우, 즉 prevData prop이 존재할 경우 상태 업데이트
  useEffect(() => {
    if (!prevData) return;

    setCategory(prevData.category as CategoryName);
    setSubCategory(prevData.subCategory);
    setName(prevData.name);
    setPrice(prevData.price);
    setGender(prevData.gender);
    setColor(prevData.color as ColorType);
    setStock({
      // xs: 0,
      // s: 0,
      // m: 0,
      // l: 0,
      // xl: 0,
      // xxl: 0,
      // xxxl: 0,
      // other: 0,
      ...prevData.stock,
    });
    setSize(prevData.size as Array<SizeType>);
    setTags(prevData.tags.join(" "));
    setDescription(prevData.description);
  }, [
    prevData,
    setCategory,
    setColor,
    setDescription,
    setGender,
    setName,
    setPrice,
    setSize,
    setStock,
    setSubCategory,
    setTags,
  ]);

  // 카테고리에 맞는 하위 카테고리 생성하기
  useEffect(() => {
    if (!category) return;

    const newList = categoryData[category as CategoryName]
      .subCategories as Array<Category>;

    setSubCategoryList(newList);
    setSubCategory(newList[0]?.path);
    setOptionList((categoryData[category as CategoryName] as Category).options);
    if (!optionList) {
    }
  }, [category, prevData, setSubCategory]);

  // 총 재고수
  useEffect(() => {
    setTotalStock(
      Object.values(stock)
        .map((item) => Number(item))
        .reduce((acc, cur, i) => {
          return typeof cur !== "number" || cur < 1 ? acc : acc + cur;
        }, 0)
    );
  }, [stock]);

  return (
    <React.Fragment>
      <form
        className="flex flex-wrap gap-16 text-zinc-800"
        onSubmit={onProductUpload}
      >
        <div className="flex w-full flex-wrap gap-16">
          <label>
            <h3 className="mb-2 text-2xl font-semibold">제품명</h3>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="제품명"
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              className="px-2 py-1"
            />
          </label>
          <label>
            <h3 className="mb-2 text-2xl font-semibold">제품 가격</h3>
            <input
              type="number"
              step="0.01"
              value={price}
              min={0.01}
              onChange={onPriceChange}
              placeholder="가격"
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              className="px-2 py-1"
              required
            />
            <span className="ml-2 text-base font-semibold"> USD</span>
          </label>
          <label>
            <h3 className="mb-2 text-2xl font-semibold">태그</h3>
            <input
              type="text"
              value={tags}
              placeholder="태그(띄어쓰기로 구분)"
              onChange={onTagsChange}
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              className="px-2 py-1"
            />
          </label>
        </div>
        <div className="flex flex-wrap gap-16">
          <label>
            <h3 className="mb-2 text-2xl font-semibold">카테고리</h3>
            <select
              onChange={onCategoryChange}
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              className="px-2 py-1"
              value={category}
              required
            >
              <option value="" disabled>
                선택
              </option>
              {Object.entries(categoryData).map(
                (category, i) =>
                  category[0] !== "all" && (
                    <option key={i} value={category[0]}>
                      {category[1].name}
                    </option>
                  )
              )}
            </select>
          </label>
          <label>
            <h3 className="mb-2 text-2xl font-semibold">하위 카테고리</h3>
            <select
              onChange={onSubCategoryChange}
              style={{
                borderBottom: "1px solid #1f2937",
              }}
              required
              className="px-2 py-1"
              value={subCategory}
            >
              <option value="" disabled>
                선택
              </option>
              {subCategoryList.map((subCategory, i) => (
                <option value={subCategory.path} key={i}>
                  {subCategory.name}
                </option>
              ))}
            </select>
          </label>
          <div className="flex gap-16">
            <label>
              <h3 className="mb-2 text-2xl font-semibold">성별</h3>
              <select
                onChange={onGenderChange}
                style={{
                  borderBottom: "1px solid #1f2937",
                }}
                required
                className="px-2 py-1"
                value={gender}
              >
                <option value="" disabled>
                  선택
                </option>
                <option value={"all"}>공용</option>
                <option value={"male"}>남성</option>
                <option value={"female"}>여성</option>
              </select>
            </label>
            <label>
              <h3 className="mb-2 text-2xl font-semibold">색상</h3>
              <select
                onChange={onColorChange}
                style={{
                  borderBottom: "1px solid #1f2937",
                }}
                required
                className="px-2 py-1"
                value={color}
              >
                <option value="" disabled>
                  선택
                </option>
                {filterData.color.map((color, i) => (
                  <option key={i} value={color.value}>
                    {color.text}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="flex flex-wrap gap-16">
          <label className="w-fit">
            <h3 className="mb-2 text-2xl font-semibold">대표 사진</h3>
            {prevData && (
              <p className="mb-2">
                새로운 사진으로 변경할 경우에만 등록하고 기존 사진을 이용하실
                경우 비워두세요.
              </p>
            )}
            <input
              ref={(el) => {
                if (el) filesInputRefs.current[0] = el;
              }}
              type="file"
              onChange={onThumbnailChange}
              required={!prevData}
              accept="image/*"
            />
          </label>
          <label className="w-fit">
            <h3 className="mb-2 text-2xl font-semibold">Options Image</h3>
            {prevData && <p className="mb-2">Existing images are kept.</p>}
            <input
              ref={(el) => {
                if (el) filesInputRefs.current[2] = el;
              }}
              type="file"
              onChange={onOptionsThumbChange}
              multiple
              // required={!prevData}
              accept="image/*"
            />
            <Button
              theme="gray"
              onClick={(e) => {
                e.preventDefault();
                if (prevData)
                  delOptionThumbAsync({
                    product: prevData,
                    optionsThumb: prevData.optionsThumb,
                  });
              }}
            >
              Delete
            </Button>
            <p>
              {prevData?.optionsThumb && JSON.stringify(prevData.optionsThumb)}
            </p>
          </label>
          <label className="w-fit">
            <h3 mb-2 text-2xl font-semibold>
              {" "}
              Test options
            </h3>
            {uploadBySizeGenerator()}
          </label>
          <label className="w-fit">
            <h3 className="mb-2 text-2xl font-semibold">상세 사진</h3>
            {prevData && (
              <p className="mb-2">
                새로운 사진으로 변경할 경우에만 등록하고 기존 사진을 이용하실
                경우 비워두세요.
              </p>
            )}
            <input
              ref={(el) => {
                if (el) filesInputRefs.current[1] = el;
              }}
              type="file"
              onChange={onDetailImgsChange}
              multiple
              required={!prevData}
              accept="image/*"
            />
          </label>
        </div>
        <div className="flex w-full flex-wrap gap-16">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">재고</h3>
            <div className="flex flex-wrap gap-5">
              {sizeCheckboxGenerator()}
            </div>
            {stockBySizeGenerator()}
            <div className="mt-2 flex items-center gap-2 text-xl font-semibold">
              <span className="w-fit text-center">총 재고량</span>
              <span className="px-2 py-1 text-base">{totalStock} 개</span>
            </div>
          </div>
          <label>
            <h3 className="mb-2 text-2xl font-semibold">제품 설명</h3>
            <textarea
              value={description}
              onChange={onDescriptionChange}
              style={{ border: "1px solid #1f2937" }}
              className="aspect-[5/2] min-w-[300px] rounded-sm px-2 py-1 text-base"
            />
          </label>
        </div>
        <div className="flex w-full gap-3">
          <Button theme="black">제품 {prevData ? "수정" : "등록"}</Button>
          <Button
            onClick={
              prevData
                ? () => {}
                : (e) => {
                    e.preventDefault();
                    reset();
                  }
            }
            href={prevData ? `/products/product/${prevData.id}` : ""}
            tailwindStyles="bg-zinc-100 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-300"
          >
            {prevData ? "돌아가기" : "초기화"}
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          if (prevData) revalidate(prevData.id);
        }}
      >
        Revalidate
      </Button>
      <Loading show={isLoading} fullScreen={true} />
    </React.Fragment>
  );
};

const revalidate = async (id: string) => {
  await axios.request({
    method: "POST",
    url:
      process.env.NEXT_PUBLIC_ABSOLUTE_URL +
      "/api/revalidate?secret=" +
      process.env.NEXT_PUBLIC_REVALIDATE_TOKEN,
    headers: {
      "Content-Type": "application/json",
    },
    data: { target: "product", id },
  });
};

export default FormProduct;
