import React from "react";
import { Form, Input, Select, Button } from "antd";
import { useTranslations } from "next-intl";

const { Option } = Select;

const CreateService: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };
  const t = useTranslations("DashboardMenu");
  const d = useTranslations("MyLanguage");
  return (
    <div className="grid md:grid-cols-3 gap-2">
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
      >
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item label={d("minorder")} name="min" rules={[{ required: true }]}>
        <Input type="number" placeholder="Enter Min" />
      </Form.Item>
      <Form.Item label={d("maxorder")} name="max" rules={[{ required: true }]}>
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
      >
        <Input type="number" placeholder="Enter Rate" />
      </Form.Item>

      <div className="col-span-3">
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label={d("initial_rate")}
            name="firstrateconfig"
            rules={[{ required: true }]}
            className=""
          >
            <Input type="number" placeholder="Enter First Rate Config" />
          </Form.Item>
          <Form.Item
            label={d("rate_config")}
            name="rateconfig"
            rules={[{ required: true }]}
          >
            <Input type="number" placeholder="Enter Rate Config" />
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
