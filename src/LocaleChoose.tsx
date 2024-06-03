import { Image, Select } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
interface LanguageChooseProps {
  onChange?: (value: string) => void;
}
const LanguageChoose: React.FC<LanguageChooseProps> = ({ onChange }) => {
  const router = useRouter();
  const switchLanguage = (value: any) => {
    router.push(router, "", { locale: value });
  };
  return (
    <Select
      style={{ width: 200 }}
      placeholder="Choose a language"
      value={router.locale}
      onChange={onChange || switchLanguage}
    >
      <Select.Option value={"en"}>
        <div className="flex items-center">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/330/330425.png"
            alt=""
            width={25}
            preview={false}
          />{" "}
          &nbsp; English
        </div>
      </Select.Option>
      <Select.Option value="vi">
        <div className="flex items-center">
          <Image
            src="https://cdn-icons-png.flaticon.com/128/555/555515.png"
            alt=""
            width={25}
            preview={false}
          />
          &nbsp; Tiếng việt
        </div>
      </Select.Option>
    </Select>
  );
};
export default LanguageChoose;
