import { Image, Select } from "antd";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LocaleOption {
  key: string | number;
  value: string;
  label: ReactNode;
}
const options: LocaleOption[] = [
  {
    key: 1,
    value: "en",
    label: (
      <div className="flex items-center gap-1">
        <Image src="/en.png" alt="" width={25} /> <span>English</span>
      </div>
    ),
  },
  {
    key: 2,
    value: "vi",
    label: (
      <div className="flex items-center gap-1">
        <Image src="/vi.png" alt="" width={25} preview={false} />{" "}
        <span>Tiếng việt</span>
      </div>
    ),
  },
];

const LocaleSwitcher = (props: any) => {
  const router = useRouter();
  const switchLocale = (value: string) => {
    router.push(router, "", { locale: value });
  };
  return (
    <Select
      style={{ width: 150 }}
      options={options}
      defaultValue={router.locale}
      onChange={switchLocale}
      {...props}
    />
  );
};
export default LocaleSwitcher;
