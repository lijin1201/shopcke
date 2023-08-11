import Link from "next/link";
import HeaderBasic from "../components/HeaderBasic";
import Seo from "../components/Seo";

const Sitemap = () => {
  return (
    <main className="page-container">
      <Seo title="SITEMAP" />
      <HeaderBasic title={{ text: /* "사이트맵" */ "Site Map" }} />
      <nav className="flex flex-col gap-12 pb-24">
        <ul className="flex flex-col items-start gap-5 px-12 text-xl xs:px-5">
          <li>
            <Link
              href={{
                pathname: "/",
              }}
            >
              <h3 className="font-bold text-zinc-800">Home{/* 홈 */}</h3>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/collections",
              }}
            >
              <h3 className="font-bold text-zinc-800">
                Featured{/* 컬렉션 */}
              </h3>
            </Link>
          </li>
          <li>
            <h3 className="font-bold text-zinc-800">Products{/* 제품 */}</h3>
            <ul className="mt-3 flex flex-wrap gap-5 pl-5 text-lg font-semibold text-zinc-500">
              <li>
                <Link
                  href={{
                    pathname: `/products/categories/all`,
                  }}
                >
                  All{/* 전체 */}
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: `/products/categories/headphone/all`,
                  }}
                >
                  Headphone
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href={{
                pathname: "/cart",
              }}
            >
              <h3 className="font-bold text-zinc-800">Cart{/* 카트 */}</h3>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/login",
              }}
            >
              <h3 className="font-bold text-zinc-800">Login{/* 로그인 */}</h3>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/register",
              }}
            >
              <h3 className="font-bold text-zinc-800">
                Register{/* 회원가입 */}
              </h3>
            </Link>
          </li>
          <li>
            <h3 className="font-bold text-zinc-800">Account{/* 계정 */}</h3>
            <ul className="mt-3 flex flex-wrap gap-5 pl-5 text-lg font-semibold text-zinc-500">
              <li>
                <Link
                  href={{
                    pathname: "/account",
                    query: { tab: "profile" },
                  }}
                >
                  Profile{/* 프로필 */}
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/account",
                    query: { tab: "bookmark" },
                  }}
                >
                  Favorites{/* 북마크 */}
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: "/account",
                    query: { tab: "orders" },
                  }}
                >
                  Order History{/* 주문 내역 */}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              href={{
                pathname: "/pwreset",
              }}
            >
              <h3 className="font-bold text-zinc-800">
                Reset password{/* 비밀번호 재설정 */}
              </h3>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/legal-notice",
              }}
            >
              <h3 className="font-bold text-zinc-800">
                Terms and conditions{/* 이용 약관 */}
              </h3>
            </Link>
          </li>
          <li>
            <Link
              href={{
                pathname: "/privacy-policy",
              }}
            >
              <h3 className="font-bold text-zinc-800">
                Privacy policy{/* 개인정보 처리 방침 */}
              </h3>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};

export default Sitemap;
