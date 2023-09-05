import Link from "next/link";
import categoryData from "../public/json/categoryData.json";

const LayoutFooter = () => {
  return (
    <footer className="relative mx-auto flex h-fit min-w-[360px] flex-col items-center justify-center gap-y-5 bg-zinc-50 py-12 text-zinc-500">
      <ul className="flex w-full max-w-[1700px] flex-wrap justify-start gap-12 p-5 pt-0">
        <li>
          <h3 className="mb-5 font-bold">Product Tour</h3>
          <ul className="flex flex-col gap-2">
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/collections">Featured</Link>
            </li>
            {Object.values(categoryData).map((category, i) => (
              <li
                key={i}
                className="transition-all hover:font-semibold hover:text-zinc-800"
              >
                <Link
                  href={`/products/categories/${category.path}${
                    category.path !== "all" && "/all"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h3 className="mb-5 font-bold">Account</h3>
          <ul className="flex flex-col gap-2">
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/account?tab=profile">My Profile</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/account?tab=bookmark">Bookmark</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/account?tab=orders">Order History</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/cart">Cart</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/login">Login</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/register">Sign Up</Link>
            </li>
          </ul>
        </li>

        <li>
          <h3 className="mb-5 font-bold">Contact</h3>
          <ul className="flex flex-col gap-2">
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="mailto:cke@hanaelectron.com?subject=[HanaElectron] - ">
                Email
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="mb-5 font-bold">Legal Terms</h3>
          <ul className="flex flex-col gap-2">
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/legal-notice">Terms and Conditions</Link>
            </li>
            <li className="transition-all hover:font-semibold hover:text-zinc-800">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </li>
        <li>
          <h3 className="font-bold transition-all hover:text-zinc-800">
            <Link href="/sitemap">Site Map</Link>
          </h3>
        </li>
      </ul>

      <section className="w-full max-w-[1700px] p-5 pb-0 pr-24 text-sm">
        <h3 className="mb-2 text-xs font-bold">KS AEROSPACE</h3>
        <p className="max-w-[600px]">
          Business Name : KS AEROSPACE / CEO (Name): JAE SUNG JANG / Business
          Registration No. : C4185163/ Phone : 323_717_0050 / Address : 3224 W
          OLYMPIC BLVD LOS ANGELES CA 90006 / Email:{" "}
          <Link
            href="mailto:cke@hanaelectron.com?subject=[하나일렉트론 문의] - "
            className="underline transition-all hover:text-zinc-800"
          >
            cke@hanaelectron.com
          </Link>
          {" / "}
          Home Page:{" "}
          <Link
            href="/privacy-policy"
            className="underline transition-all hover:text-zinc-800"
          >
            hanaelectron.com
          </Link>
          {" / "}
          <Link
            href="/legal-notice"
            className="underline transition-all hover:text-zinc-800"
          >
            Legal Notice
          </Link>
          {" / "}
          <Link
            href="/privacy-policy"
            className="underline transition-all hover:text-zinc-800"
          >
            Privacy Policy
          </Link>{" "}
          / &copy; {new Date().getFullYear()}. KS AEROSPACE All Rights Reserved.
        </p>
      </section>
    </footer>
  );
};

export default LayoutFooter;
