import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { UseMutateFunction } from "react-query";
import useInput from "../hooks/useInput";
import { AddressType, UserData } from "../types";
import Button from "./Button";
// import FormAddress from "./FormAddress";
import FormAddressFill from "./FormAddressFill";

interface Props {
  userData: UserData | null;
  editProfile: UseMutateFunction<
    void,
    unknown,
    {
      name: string;
      addressData?: AddressType | null;
      phoneNumber?: string | null;
      addressArr?: Array<AddressType>;
    },
    unknown
  >;
  editAddrArr: UseMutateFunction<
    void,
    unknown,
    { addressData: AddressType | null; isRemove?: boolean },
    unknown
  >;
}

const FormEditProfile: React.FC<Props> = ({
  userData,
  editProfile,
  editAddrArr,
}) => {
  const { push } = useRouter();
  const [addressData, setAddressData] = useState<AddressType | null>(
    userData?.addressData || null
  );
  const [tempAddr, setTempAddr] = useState<AddressType | null>(null);
  const [alert, setAlert] = useState<string>("");
  const { value: name, onChange: onNameChange } = useInput(
    userData?.user?.displayName || ""
  );
  const { value: phoneNumber, onChange: onPhoneNumberChange } = useInput(
    userData?.phoneNumber || ""
  );

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!name) {
      setAlert(/* '이름을 입력해주세요.' */ "Please enter name");
      return;
    }

    const newProfile = {
      name: name as string,
      phoneNumber,
      addressData,
    };

    editProfile(newProfile);

    push({ query: { tab: "profile" } });
  };

  return (
    <div
      className="flex flex-col gap-10 text-base text-zinc-800"
      // onSubmit={onSubmit}
    >
      <label>
        <h3 className="text-xl font-semibold">* Name{/* 이름 */}</h3>
        <input
          type="text"
          value={name || ""}
          onChange={onNameChange}
          placeholder={userData?.user?.displayName || "이름"}
          required
          style={{
            borderBottom: "1px solid #1f2937",
          }}
          className="mt-2 h-8 px-2 pt-1 pb-1"
        />
      </label>
      <label>
        <h3 className="text-xl font-semibold">Phone{/* 전화번호 */}</h3>
        <input
          type="text"
          value={phoneNumber || ""}
          onChange={onPhoneNumberChange}
          placeholder={userData?.phoneNumber || ""}
          style={{
            borderBottom: "1px solid #1f2937",
          }}
          className="mt-2 h-8 px-2 pt-1 pb-1"
        />
      </label>
      <div>
        <h3 className="mb-3 text-xl font-semibold">
          {/* 기본 배송 주소 */}Shipping addresses
        </h3>
        <div className="flex flex-col gap-2">
          <span>
            <span
              className="bg-zinc-200 text-sm inline-block break-keep rounded-md px-2 py-1 text-center 
             font-semibold"
            >
              (default)
            </span>
            {addressData ? (
              addressData.postCode + " " + addressData.address
            ) : (
              <span className="text-red-600">(No address data set)</span>
            )}
          </span>
          <div className="grid grid-cols-5 gap-1">
            {userData?.addressArr.map((addressD, i) => (
              <span
                key={i}
                className="group overflow-hidden rounded-lg border border-zinc-50 shadow-lg shadow-zinc-300"
              >
                {addressD?.postCode + " " + addressD?.address}
                <button
                  className="invisible group-hover:visible rounded bg-slate-100 text-green-600"
                  onClick={() => setAddressData(addressD)}
                >
                  Set to default
                </button>{" "}
                <button
                  className="invisible group-hover:visible rounded bg-slate-100 text-red-600"
                  onClick={() =>
                    editAddrArr({ addressData: addressD, isRemove: true })
                  }
                >
                  Remove
                </button>
              </span>
            ))}
          </div>
          <FormAddressFill
            addressData={tempAddr}
            setAddressData={setTempAddr}
          />
          {tempAddr && `(${tempAddr.postCode})` + " " + tempAddr.address}
          <button
            className="default-button"
            onClick={() => {
              editAddrArr({ addressData: tempAddr });
            }}
          >
            Save to profile
          </button>
          {/* {addressData?.postCode + " " + addressData?.address}{" "} */}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <p className="h-6 w-full text-sm text-red-700">{alert}</p>
        <Button theme="black" onClick={onSubmit}>
          {/* 수정 완료 */}Finish
        </Button>
        <Button href={{ query: { tab: "profile" } }}>{/* 취소 */}Cancel</Button>
      </div>
    </div>
  );
};

export default FormEditProfile;
