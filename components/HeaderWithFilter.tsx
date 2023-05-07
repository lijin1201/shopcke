import { useRouter } from "next/router";
import categoryData from "../public/json/categoryData.json";
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from "react";
import {
  CategoryName,
  ColorType,
  FilterCheckbox,
  FilterNameType,
  FilterType,
  GenderType,
  OrderType,
  SizeType,
} from "../types";
import Button from "./Button";
import Link from "next/link";
import filterData from "../public/json/filterData.json";

interface Props {
  productsLength: number;
  filter: FilterType;
}

const HeaderWithFilter: React.FC<Props> = ({
  productsLength,
  filter: appliedFilter,
}) => {
  const { push, query, back } = useRouter();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [checkedFilter, setCheckedFilter] = useState<FilterType>({
    ...appliedFilter,
  });

  // 카테고리 변경
  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const value = e.target.value as CategoryName;

    setCheckedFilter((prev) => ({
      ...prev,
      category: value,
    }));

    push(
      {
        query: {
          ...query,
          categories: [value, value === "all" ? "" : "all"],
        },
      },
      undefined,
      { scroll: false }
    );
  };

  // 정렬 기준 변경
  const onOrderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const value = e.target.value as OrderType;

    setCheckedFilter((prev) => ({ ...prev, orderby: value }));

    push(
      {
        query: { ...query, orderby: value },
      },
      undefined,
      { scroll: false }
    );
  };

  // 개별 체크박스 클릭
  const onCheckboxChange = (
    name: FilterNameType,
    value: GenderType & SizeType & ColorType
  ) => {
    const newFilter: FilterType = { ...checkedFilter };
    if (name === "gender") {
      newFilter.gender = value;
    } else if (name === "color") {
      newFilter.color = value;
    } else if (!newFilter.size.includes(value)) {
      newFilter.size.push(value);
    } else {
      newFilter.size.splice(newFilter.size.indexOf(value), 1);
    }

    setCheckedFilter(newFilter);
  };

  // 전체 선택 체크박스 클릭
  const onAllCheckboxToggle = (name: FilterNameType) => {
    const newFilter: FilterType = { ...checkedFilter };

    if (name === "gender") {
      newFilter.gender = "all";
    } else if (name === "color") {
      newFilter.color = "";
    } else if (newFilter.size.length === filterData.size.length) {
      newFilter.size = [];
    } else {
      newFilter.size = filterData.size.map(
        (filter) => filter.value
      ) as Array<SizeType>;
    }

    setCheckedFilter(newFilter);
  };

  // 체크박스 생성
  const checkboxGenerator = (
    list: Array<FilterCheckbox>,
    name: FilterNameType
  ) => {
    const checkboxes: Array<ReactNode> = [
      <li key={-1}>
        <label className="flex w-fit items-center gap-1">
          <input
            name={name}
            type={name === "size" ? "checkbox" : "radio"}
            value="all"
            onChange={() => {
              onAllCheckboxToggle(name);
            }}
            checked={
              name === "size"
                ? checkedFilter.size.length === filterData.size.length
                : name === "gender"
                ? checkedFilter.gender === "all"
                : checkedFilter[name].length === 0
            }
          />
          전체
        </label>
      </li>,
    ];

    checkboxes.push(
      ...list.map((data, i) => (
        <li key={i}>
          <label className="flex w-fit items-center gap-1">
            <input
              name={name}
              type={name === "size" ? "checkbox" : "radio"}
              value={data.value}
              onChange={() => {
                onCheckboxChange(
                  name,
                  data.value as GenderType & ColorType & SizeType
                );
              }}
              checked={
                name === "size"
                  ? checkedFilter[name].includes(data.value)
                  : checkedFilter[name] === data.value
              }
            />
            {name === "color" && (
              <span
                style={{ backgroundColor: data.displayColor }}
                className={`h-3 w-3 rounded-full ${
                  data.value === "white" && "border"
                }`}
              />
            )}
            {data.text}
          </label>
        </li>
      ))
    );

    return checkboxes;
  };

  // 하위 카테고리 버튼 생성
  const subCategoryGenerator = (categories: Array<string>) => {
    if (!categories) return;

    let [category, subCategory] = categories as [CategoryName, string];

    const subCategories: Array<ReactNode> = [
      <li
        key={-1}
        className={`px-1 transition-all
          ${
            (!subCategory || subCategory === "all") &&
            "bg-zinc-800 font-bold text-zinc-50"
          }`}
      >
        <Link
          href={{
            pathname: `/products/categories/${category}${
              category === "all" ? "" : "/all"
            }`,
            query: { orderby: "popularity" },
          }}
        >
          전체
        </Link>
      </li>,
    ];

    categoryData[category]?.subCategories.forEach((cur, i) => {
      subCategories.push(
        <li
          key={i}
          className={`px-1 transition-all
        ${subCategory === cur.path && "bg-zinc-800 font-bold text-zinc-50"}`}
        >
          <Link
            href={{
              pathname: `/products/categories/${category}/${cur.path}`,
              query: { orderby: "popularity" },
            }}
          >
            {cur.name}
          </Link>
        </li>
      );
    });

    return subCategories;
  };

  // 필터 적용
  const onFilterApply = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const { gender, size, color } = checkedFilter;

    const filterQuery = {
      gender: gender || "all",
      size:
        size.length === 0 || size.length === filterData.size.length
          ? "all"
          : size.join(" "),
      color: color || "all",
    };

    push(
      {
        query: { ...query, ...filterQuery },
      },
      undefined,
      { scroll: false }
    );
  };

  // 필터 초기화
  const onFilterReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    push({
      query: {
        ...query,
        gender: "all",
        size: "all",
        color: "all",
      },
    });

    setCheckedFilter((prev) => ({
      ...prev,
      gender: "all",
      size: filterData.size.map((size) => size.value as SizeType),
      color: "",
    }));
  };

  // 필터 탭 펼치기
  const onFilterToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilterOpen((prev) => !prev);
  };

  // 적용된 필터로 보여질 필터 처리
  useEffect(() => {
    setCheckedFilter((prev) => ({ ...prev, ...appliedFilter }));
  }, [appliedFilter]);

  return (
    <div className="relative mb-12 border-b bg-white text-zinc-800">
      <section className="relative flex justify-between px-12 py-5 font-bold md:pb-3 xs:px-5">
        <header className="text-3xl font-bold md:text-2xl xs:text-xl">
          <nav className="text-lg text-zinc-500 md:text-base xs:text-sm">
            <button onClick={() => back()} className="group">
              <div className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300"
                  className="my-auto w-[12px] stroke-zinc-500 transition-transform duration-500 group-hover:translate-x-[2px]"
                  style={{
                    rotate: "180deg",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "50px",
                  }}
                >
                  <polyline points="78.79 267.02 222.75 150 78.79 32.98" />
                </svg>
                뒤로가기
              </div>
            </button>
          </nav>
          <h1 className="group relative flex items-center gap-3">
            {checkedFilter.keywords ? (
              checkedFilter.keywords
            ) : checkedFilter.category ? (
              <div className="flex items-center gap-2">
                <span>
                  {categoryData[checkedFilter.category as CategoryName]?.name}{" "}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 300 300"
                  className="my-auto w-[20px] stroke-zinc-500 transition-transform duration-500 group-hover:translate-x-[5px]"
                  style={{
                    rotate: "90deg",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "50px",
                  }}
                >
                  <polyline points="78.79 267.02 222.75 150 78.79 32.98" />
                </svg>

                <select
                  className="absolute left-0 h-9 w-full cursor-pointer text-lg opacity-0"
                  onChange={onCategoryChange}
                  value={checkedFilter.category}
                >
                  <option value="all">전체</option>
                  <option value="clothes">의류</option>
                  <option value="accessory">악세서리</option>
                  <option value="shoes">신발</option>
                  <option value="bag">가방</option>
                  <option value="jewel">주얼리</option>
                </select>
              </div>
            ) : null}
            <p className="text-sm font-medium text-zinc-600 xs:text-xs">
              {productsLength} 제품
            </p>
          </h1>
        </header>
        <div className="mt-7 flex gap-5">
          <select
            className="cursor-pointer text-right text-sm"
            onChange={onOrderChange}
            value={checkedFilter.orderby}
          >
            <option value="" disabled>
              정렬 기준
            </option>
            <option value="popularity">인기순</option>
            <option value="date">신상품</option>
            <option value="priceDes">가격 높은 순</option>
            <option value="priceAsc">가격 낮은 순</option>
          </select>
          {(!appliedFilter.keywords || appliedFilter.keywords.length === 0) && (
            <button
              onClick={onFilterToggle}
              className={`transition-all duration-500 ${
                filterOpen && "text-zinc-400"
              }`}
            >
              필터
            </button>
          )}
        </div>
      </section>
      {(!appliedFilter.keywords || appliedFilter.keywords?.length === 0) && (
        <nav className="px-12 pb-5 text-lg md:text-base xs:px-5">
          <ul className="flex flex-wrap gap-5 2xs:gap-3">
            {subCategoryGenerator(query.categories as Array<string>)}
          </ul>
        </nav>
      )}
      {(!appliedFilter.keywords || appliedFilter.keywords.length === 0) && (
        <section
          className={`h-0 w-full overflow-hidden font-semibold text-zinc-500 transition-all duration-500 ${
            filterOpen ? "h-[460px] border-t p-5" : "mb-0 h-0"
          }`}
        >
          <section className="flex justify-evenly">
            <div>
              <h4 className="mb-3 text-lg text-zinc-800">성별</h4>
              <ul className="flex flex-col gap-2">
                {checkboxGenerator(
                  filterData.gender as GenderType & ColorType & SizeType,
                  "gender"
                )}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-lg text-zinc-800">사이즈</h4>
              <ul className="flex flex-col gap-2">
                {checkboxGenerator(
                  filterData.size as GenderType & ColorType & SizeType,
                  "size"
                )}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-lg text-zinc-800">색상</h4>
              <ul className="flex flex-col gap-2">
                {checkboxGenerator(
                  filterData.color as GenderType & ColorType & SizeType,
                  "color"
                )}
              </ul>
            </div>
          </section>
          <section className="flex justify-end gap-2 px-5 pt-10">
            <Button onClick={onFilterApply} theme="black">
              적용
            </Button>
            <Button
              onClick={onFilterReset}
              tailwindStyles="bg-zinc-100 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-300"
            >
              초기화
            </Button>
            <Button
              onClick={onFilterToggle}
              tailwindStyles="bg-zinc-100 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-300"
            >
              닫기
            </Button>
          </section>
        </section>
      )}
    </div>
  );
};

export default HeaderWithFilter;
