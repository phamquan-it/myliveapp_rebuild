import React from "react";
import { Form, Input, Upload, DatePicker, Button, Select, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";
import { useTranslations } from "next-intl";
interface editCategoryProps {
  value: any;
}
const EditCategory: React.FC<editCategoryProps> = ({ value }) => {
  const { data } = useQuery({
    queryKey: ["platform/list"],
    queryFn: () => axiosClient.get("/platform/list?language=en"),
  });
  const options = data?.data?.data.map((item: any) => ({
    value: item.id,
    label: (
      <div className="flex items-center gap-1">
        <Image src={item.icon} alt="" width={25} />
        {item.name}
      </div>
    ),
  }));
  const t = useTranslations("DashboardMenu");
  return (
    <div>
      <Form.Item
        label="ID"
        name="id"
        initialValue={value.id}
        className="hidden"
      >
        <Input
          placeholder="Enter ID"
          onChange={() => {
            console.log(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("platform")}
        name="platform"
        initialValue={value.platformId}
      >
        <Select placeholder="Select platform" options={options} />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        initialValue={value.name}
        className=""
      >
        <Input placeholder="Enter Name" />
      </Form.Item>

      <Form.Item
        label="Date Created"
        name="dateCreate"
        className="hidden"
        initialValue={value.createdAt}
      >
        <Input placeholder="Basic usage" />
      </Form.Item>
    </div>
  );
};

export default EditCategory;
