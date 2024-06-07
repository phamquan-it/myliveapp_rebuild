import React from "react";
import { Form, Input, Select, Button } from "antd";
import { useTranslations } from "next-intl";

const { Option } = Select;
interface editServiceProps {
  service: any;
}
const EditService: React.FC<editServiceProps> = ({ service }) => {
  const t = useTranslations("DashboardMenu");
  const d = useTranslations("MyLanguage");
  return (
    <div className="grid md:grid-cols-3 gap-2">
      <Form.Item
        label="ID"
        name="id"
        className="md:col-span-3"
        rules={[{ required: true }]}
        initialValue={service.service.id}
      >
        <Input
          placeholder="Enter ID"
          onChange={() => {
            console.log(service);
          }}
        />
      </Form.Item>
      <Form.Item
        label={t("platform")}
        name="platform"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select Platform">
          <Option value="web">Web</Option>
          <Option value="mobile">Mobile</Option>
          {/* Add other platform options */}
        </Select>
      </Form.Item>
      <Form.Item
        initialValue={service.categoriesId}
        label={t("category")}
        name="category"
        className="md:col-span-2"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select Category">
          <Option value="frontend">Frontend</Option>
          <Option value="backend">Backend</Option>
          {/* Add other category options */}
        </Select>
      </Form.Item>
      <Form.Item
        label={d("name")}
        name="name"
        className="md:col-span-3"
        rules={[{ required: true }]}
        initialValue={service.service.name}
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item
        label={d("minorder")}
        name="min"
        rules={[{ required: true }]}
        initialValue={service.service.min}
      >
        <Input type="number" placeholder="Enter Min" />
      </Form.Item>
      <Form.Item
        label={d("maxorder")}
        name="max"
        rules={[{ required: true }]}
        initialValue={service.service.max}
      >
        <Input type="number" placeholder="Enter Max" />
      </Form.Item>
      <Form.Item label="Level" name={d("level")} rules={[{ required: true }]}>
        <Select placeholder="Select Level">
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          {/* Add other level options */}
        </Select>
      </Form.Item>
      <Form.Item
        label={d("rate")}
        name="rate"
        className="md:col-span-3"
        rules={[{ required: true }]}
        initialValue={service.service.rate}
      >
        <Input type="number" placeholder="Enter Rate" />
      </Form.Item>

      <Form.Item
        label={d("initial_rate")}
        name="firstrateconfig"
        rules={[{ required: true }]}
        className="col-span-2"
        initialValue={service.service.initial_rate}
      >
        <Input type="number" placeholder="Enter First Rate Config" />
      </Form.Item>
      <Form.Item
        initialValue={service.service.rate_config}
        label={d("rate_config")}
        name="rateconfig"
        rules={[{ required: true }]}
      >
        <Input type="number" placeholder="Enter Rate Config" />
      </Form.Item>
    </div>
  );
};

export default EditService;
