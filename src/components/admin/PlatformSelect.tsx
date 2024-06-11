import axiosClient from "@/apiClient/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Form, Image, Select } from "antd";
import { SelectProps } from "antd/lib";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

interface PlatformSelectProps {
  props?: SelectProps<any>;
  required?: boolean;
  onChange?: (value: any) => void;
  noLabel?: any;
}

const PlatformSelect: React.FC<PlatformSelectProps> = ({
  props,
  required,
  onChange,
  noLabel,
}) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["platform"],
    queryFn: () => axiosClient.get(`/platform/list?language=${router.locale}`),
  });
  const t = useTranslations("DashboardMenu");

  const rules = required ? [{ required: true, message: t("platform") }] : [];

  return (
    <Form.Item
      label={noLabel == undefined ? t("platform") : ""}
      name="platform"
      initialValue={1}
      rules={rules} // Apply rules conditionally
      {...props} // Spread additional props here
    >
      <Select
        showSearch
        placeholder="Select platform"
        options={data?.data?.data.map((item: any) => ({
          ...item,
          value: item.id,
          label: (
            <div className="flex items-center gap-1">
              <Image src={item.icon} alt="" preview={false} width={25} />
              {item.name}
            </div>
          ),
        }))}
        onChange={onChange}
        {...props} // Spread additional props to the Select component
      />
    </Form.Item>
  );
};

export default PlatformSelect;
