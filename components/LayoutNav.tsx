import Image from "next/image";
import Link from "next/link";
import cke_logo from "../public/logos/CKT-logo-230920.avif";
import logo from "../public/logos/KS AEROSPACE-logo.png";
//import logo2 from "../public/logos/HaneE-logo2.png";
import { Category } from "../types";
import categoryData from "../public/json/categoryData.json";
// import cartIcon from "../public/icons/cart-nav.svg";
import cartIcon from "../public/icons/BsCart4.svg";
import profileIcon from "../public/icons/FaRegUser.svg";
import loginIcon from "../public/icons/RiLoginBoxLine.svg";
import searchIcon from "../public/icons/BsSearch.svg";
import HomeIcon from "../public/icons/home.svg?svgr";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import useGetUserData from "../hooks/useGetUserData";

const LayoutNav = () => {
  const {
    value: keywords,
    setValue: setKeywords,
    onChange: onKeywordsChange,
  } = useInput("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const { push, query } = useRouter();
  const { data: userData } = useGetUserData();

  const categoryNavGenerator = (category: Category, i: number) => {
    if (category.path === "all" || category.path === "test") return null;

    return (
      <li key={i}>
        <Link
          href={{
            pathname: `/products/categories/${category.path}${
              category.path !== "all" ? "/all" : ""
            }`,
            query: { orderby: "popularity" },
          }}
        >
          <h3 className="mb-3 xs:text-base">{category.name}</h3>
        </Link>
        <ul className="flex flex-col gap-2 text-sm">
          {category.subCategories?.map((subCategory, i) => (
            <li key={i}>
              <Link
                href={{
                  pathname: `/products/categories/${category.path}/${subCategory.path}`,
                  query: { orderby: "popularity" },
                }}
              >
                {subCategory.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  };

  const onSearchToggle = (e: MouseEvent<HTMLButtonElement>) => {
    if (!searchInputRef.current) return;

    e.preventDefault();
    setShowSearchInput(true);
    searchInputRef.current.focus();
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();

    if (!keywords || keywords.trim().length === 0) return;

    push({
      pathname: "/products/search",
      query: { keywords, orderby: "popularity" },
    });

    setShowSearchInput(false);
  };

  // 검색창 외부 클릭 감지
  useEffect(() => {
    const windowClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;

      !target.classList.contains("search") && setShowSearchInput(false);
    };

    if (showSearchInput) {
      window.addEventListener("click", windowClickHandler);
    } else {
      window.removeEventListener("click", windowClickHandler);
    }

    return () => {
      window.removeEventListener("click", windowClickHandler);
    };
  }, [showSearchInput]);

  useEffect(() => {
    if (query.keywords) {
      setKeywords(query.keywords as string);
    } else {
      setKeywords("");
    }
  }, [query.keywords, setKeywords]);

  return (
    //<nav className="fixed top-0 left-0 right-0 z-50 mx-auto h-16 w-full min-w-[360px] border-b bg-white px-7 py-4 text-lg font-semibold text-blue-800">
    <nav className="fixed top-0 left-0 right-0 z-50 mx-auto h-auto w-full min-w-[360px] border-b bg-white px-7 py-4 text-lg font-semibold">
      <ol className="mx-auto flex h-full max-w-[1700px] items-center justify-evenly gap-5 xs:gap-2">
        <div className="flex  grow items-center justify-start gap-10 md:gap-5 sm:gap-2">
          <li className="items-center mx-4 w-auto xs:mx-0 xs:ml-2 xs:w-12 ">
            <Link href="/" className="flex">
              {" "}
              <Image
                src="/logos/CKT-logo-230920.avif"
                alt="CKE"
                className="transiton-transform max-h-12 w-auto "
                sizes="100vw"
                width={0}
                height={0}
              />
              <Image
                src={logo}
                alt="Logo"
                className="xs:hidden max-h-12 w-auto translate-y-[10%] shrink "
                sizes="100vw"
                width={0}
                height={0}
                priority
              />
            </Link>
          </li>
          {/* <li>
            <Link
              href="/collections"
              className="flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all hover:bg-zinc-200 2xs:px-2"
            >
              Featured Products
            </Link>
          </li> */}
          <li className="btn--category">
            <Link
              href="/products/categories/all"
              className="flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all hover:bg-amber-100 2xs:px-2"
            >
              Categories
            </Link>
            <div className="category__dropdown absolute left-0 top-full h-0 w-full overflow-hidden border-zinc-200 bg-white bg-opacity-60 transition-all duration-500">
              <ul className="relative z-50 mt-4 flex w-full justify-evenly bg-white  text-lg">
                {Object.values(categoryData).map((category, i) =>
                  categoryNavGenerator(category as Category, i)
                )}
              </ul>
            </div>
          </li>
        </div>
        <div className="flex shrink-0 gap-4">
          <form onSubmit={onSearch} className="flex justify-end gap-2">
            <input
              type="search"
              ref={searchInputRef}
              placeholder=" Product Search"
              className={`search z-40 transition-all duration-500 px-2
                md:absolute md:top-full md:right-0 md:w-screen md:bg-white md:p-2 md:text-xl 
                ${showSearchInput ? "max-w-full" : "max-w-0 md:px-0"}`}
              style={{ borderBottom: "1px solid #e5e7eb" }}
              value={keywords}
              onChange={onKeywordsChange}
            />
            <button
              onClick={showSearchInput ? onSearch : onSearchToggle}
              className={`  rounded-md p-1 transition-all hover:bg-gray-200 `}
            >
              <Image src={searchIcon} alt="Search" className="search w-6" />
            </button>
          </form>
          <Link
            href={userData ? "/account?tab=profile" : "/login"}
            className="flex rounded-md px-1 py-1 transition-all hover:bg-zinc-200"
          >
            <Image
              src={userData ? profileIcon : loginIcon}
              alt={userData ? "Account" : "Login"}
              className="w-6"
            />
          </Link>
          {userData && (
            <Link
              href="/cart"
              className="flex rounded-md px-1 py-1 transition-all hover:bg-zinc-200 relative"
            >
              <Image src={cartIcon} alt="Profile" className="w-6" />
              <span className="absolute flex h-5 w-5  top-[-20%] right-[-30%]   items-center justify-center rounded-full bg-red-700 text-xs text-white">
                {Object.keys(userData.cart || {}).length >= 10
                  ? "9+"
                  : Object.keys(userData.cart || {}).length}
              </span>
            </Link>
          )}
        </div>
      </ol>
      <style jsx>{`
        @media (hover: hover) {
          .btn--category:hover {
            .category__dropdown {
              height: 220px;
              border-top: 1px solid rgba(39, 39, 42, 0.1);
              border-bottom: 1px solid rgba(39, 39, 42, 0.1);
            }
          }
        }
      `}</style>
    </nav>
  );
};

export default LayoutNav;
