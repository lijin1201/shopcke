import Link from "next/link";
import { MouseEventHandler, ReactNode } from "react";
import { UrlObject } from "url";

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tailwindStyles?: string;
  theme?: string;
  href?: UrlObject | string;
  disabled?: boolean;
}
const Button: React.FC<Props> = ({
  children,
  onClick,
  tailwindStyles,
  theme = "gray",
  href,
  disabled = false,
}) => {
  return href ? (
    <Link
      scroll={false}
      href={href}
      className={`inline-block h-fit w-fit break-keep rounded-md px-4 py-2 text-center text-base font-semibold transition-all ${
        theme === "gray"
          ? "bg-zinc-200 text-zinc-600 hover:bg-zinc-100"
          : theme === "black"
          ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-500"
          : theme === "red"
          ? "bg-red-800 text-zinc-50 hover:bg-red-600"
          : ""
      } ${
        disabled
          ? "!pointer-events-none !bg-zinc-100 !text-zinc-200"
          : "!pointer-events-auto"
      } ${tailwindStyles}`}
    >
      {children}
    </Link>
  ) : (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`inline-block h-fit w-fit break-keep rounded-md px-4 py-2 text-center text-base font-semibold transition-all ${
        theme === "gray"
          ? "bg-zinc-200 text-zinc-600 hover:bg-zinc-100"
          : theme === "black"
          ? "bg-zinc-800 text-zinc-50 hover:bg-zinc-500"
          : theme === "red"
          ? "bg-red-800 text-zinc-50 hover:bg-red-600"
          : ""
      } ${
        disabled
          ? "!pointer-events-none !bg-zinc-100 !text-zinc-200"
          : "!pointer-events-auto"
      } ${tailwindStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
