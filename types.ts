import { ReactNode } from "react";

export type TempCartType = { [key in SizeType]?: number | "" };

export interface ConfirmPaymentData {
  amount: number;
  paymentKey: string;
  orderId: string;
}

export interface DashboardDataType {
  amount: number;
  orders: number;
}

export type OrderStatusType =
  | "Payment in progress"
  | "Payment failed"
  | "Payment cancelled"
  | "Payment completed"
  | "Preparing product"
  | "Shipping in progress"
  | "Refund completed"
  | "Order Cancelled"
  | "Complete";

export interface OrderData {
  amount: number;
  orderId: string;
  uid: string;
  orderName: string;
  recipientName: string;
  addressData: AddressType;
  customerName: string;
  products: CartType;
  shippingRequest: string;
  updatedAt: number;
  createdAt: number;
  status: OrderStatusType;
  payment?: any;
  error?: any;
}

export interface CartType {
  [key: string]: StockType;
}

export interface CartSummaryData {
  totalPrice: number;
  totalCount: number;
  orderCount: number;
  outOfStock: boolean;
  invalidProduct: boolean;
}

export interface AddressType {
  address: string;
  postCode: string;
  additional: string;
}

export interface UserData {
  user: {
    uid: string;
    email: string | null;
    emailVerified: boolean;
    displayName: string | null;
    isAnonymous: boolean;
    providerData: Array<{
      providerId: string | null;
      uid: string | null;
      displayName: string | null;
      email: string | null;
      phoneNumber: string | number | null;
      photoURL: string | null;
    }>;
    stsTokenManager: {
      refreshToken: string | null;
      accessToken: string | null;
      expirationTime: number | null;
    };
    createdAt: string | null;
    lastLoginAt: string | null;
    apiKey: string | null;
    appName: string | null;
  } | null;
  addressData: AddressType | null;
  addressArr: Array<AddressType>;
  bookmark: Array<string> | null;
  cart: CartType | null;
  order: Array<any> | null;
  phoneNumber: string | null;
  isAdmin?: boolean;
  isTestAccount?: boolean;
}

export interface CollectionType {
  id: string;
  createdAt: number;
  enTitle: string;
  title: string;
  subTitle: string;
  titlePos: Array<string>;
  img: ImageType;
  description: string;
  products: Array<string>;
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  tags: Array<string>;
  category: string;
  subCategory: string;
  thumbnail: ImageType;
  optionsThumb: Array<ImageType>;
  optionsImgMap: OptionImgType;
  detailImgs: Array<ImageType>;
  date: number;
  //option: OptionType;
  gender: GenderType;
  color: string;
  orderCount: number;
  stock: StockType;
  totalStock: number;
  size: Array<string>;
  description: string;
}

export interface OptionType {
  xs?: number | "";
  s?: number | "";
  m?: number | "";
  l?: number | "";
  xl?: number | "";
  xxl?: number | "";
  xxxl?: number | "";
  other?: number | "";
}

export interface ProductListType {
  [key: string]: ProductType | null;
}

export interface FilterType {
  category: string;
  subCategory: string;
  gender: GenderType | "";
  size: Array<SizeType>;
  color: ColorType | "";
  orderby: OrderType;
  keywords?: string;
  catExclude?: string;
}

export type OrderOrderbyType = "updated" | "createdAt" | "createdAtAcs";

export interface OrderFilterType {
  orderby: OrderOrderbyType;
  status: OrderStatusType | "all";
  orderId: string;
  uid: string;
}

export type FilterNameType = "gender" | "size" | "color";

export interface StockType {
  // blue?: number | "";
  // pink?: number | "";
  // black?: number | "";
  // white?: number | "";
  // // xl?: number | "";
  // // xxl?: number | "";
  // // xxxl?: number | "";
  // other?: number | "";
  [key: string]: number | "";
}

export type GenderType = "male" | "female" | "all";
export type SizeType = "blue" | "pink" | "black" | "white" | "other" | "all";
export type ColorType =
  | "black"
  | "white"
  | "gray"
  | "red"
  | "orange"
  | "brown"
  | "beige"
  | "blue"
  | "skyblue"
  | "green";

export type OrderType = "popularity" | "date" | "priceAsc" | "priceDes";

export interface FilterCheckbox {
  value: GenderType & ColorType & SizeType;
  text: string;
  displayColor?: string;
}

export interface ErrorReport {
  uid: string | undefined;
  url: string | undefined;
  errorMessage: string | undefined;
  errorCode: string | undefined;
  filter?: FilterType;
}

export interface Category {
  name: CategoryName;
  path: string;
  subCategories?: Array<Category>;
  options?: Array<any>;
}

export interface CategoryDataType {
  [key: string]: Category;
}

export type CategoryName =
  | "all"
  | "kitchenware"
  | "headphone"
  | "battery"
  | "health food";

export type ImageType = {
  src: string;
  id: string;
};

export interface OptionImgType {
  [key: string]: FileList | ImageType;
}
