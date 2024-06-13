import axiosClient from "@/apiClient/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Form, Image, Select } from "antd";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import React from "react";
interface CategorySelectProps {
  params?: any;
  required?: boolean;
  initialValue?: any;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  params,
  required,
  initialValue,
}) => {
  const token = getCookie("token");
  const { data } = useQuery({
    queryKey: ["category/list"],
    queryFn: () =>
      axiosClient.get("/categories/list?language=en", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: params,
      }),
  });
  const t = useTranslations("DashboardMenu");
  return (
    <>
      <Form.Item
        label={t("category")}
        name="category"
        rules={[{ required: required ?? true }]}
        initialValue={initialValue}
      >
        <Select
          showSearch
          placeholder="Select category"
          options={data?.data?.data?.map((item: any) => {
            return {
              ...item,
              value: item.id,
              label: (
                <div className="flex items-center gap-1">
                  <Image src={item.icon} alt="" width={25} />
                  <span style={{ fontSize: 14 }}> {item.name}</span>
                </div>
              ),
            };
          })}
        />
      </Form.Item>
    </>
  );
};
export default CategorySelect;
