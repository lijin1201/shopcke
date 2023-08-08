import {
  // ChangeEvent,
  Dispatch,
  // MouseEvent,
  SetStateAction,
  // useState,
} from "react";
import { useForm } from "react-hook-form";
import { AddressType } from "../types";

interface Props {
  addressData: AddressType | null;
  setAddressData: Dispatch<SetStateAction<AddressType | null>>;
}

const FormAddressFill: React.FC<Props> = ({ addressData, setAddressData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

  const submitHandler = ({
    address,
    city,
    postalCode,
    country,
  }: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }) => {
    setAddressData({
      address: address + " " + city + " " + country,
      postCode: postalCode || "",
      additional: "",
    });
    // dispatch({
    //   type: "SAVE_SHIPPING_ADDRESS",
    //   payload: { fullName, address, city, postalCode, country },
    // });
    // Cookies.set(
    //   "cart",
    //   JSON.stringify({
    //     ...cart,
    //     shippingAddress: {
    //       fullName,
    //       address,
    //       city,
    //       postalCode,
    //       country,
    //     },
    //   })
    // );
    // router.push("/payment");
  };

  return (
    <div
      className={`mx-2 flex flex-col flex-wrap gap-2 ${
        !addressData && "text-zinc-500"
      }`}
    >
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        {/* <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter full name" })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div> */}
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter address",
              minLength: { value: 3, message: "Address is more than 2 chars" },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            className="w-full"
            id="city"
            {...register("city", {
              required: "Please enter city",
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            {...register("postalCode", {
              required: "Please enter postal code",
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            className="w-full"
            id="country"
            {...register("country", {
              required: "Please enter country",
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        <span>
          {addressData?.address
            ? `(${addressData?.postCode})`
            : addressData
            ? `(${addressData.postCode})`
            : ""}{" "}
          {addressData?.address
            ? addressData?.address
            : addressData
            ? addressData.address
            : "검색된 주소 없음"}
        </span>
      </div>
    </div>
  );
};

export default FormAddressFill;
