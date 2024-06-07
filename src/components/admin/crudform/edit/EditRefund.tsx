import React from "react";
import { Form, Input, Select, Switch, DatePicker, Button } from "antd";
import { useTranslations } from "next-intl";

const { Option } = Select;

const UpdateRefund: React.FC = () => {
  const t = useTranslations("MyLanguage");
  return (
    <div>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter an email" }]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        label={t("service")}
        name="service"
        rules={[{ required: true, message: "Please select a service" }]}
      >
        <Select placeholder="Select service">
          <Option value="service1">Service 1</Option>
          <Option value="service2">Service 2</Option>
          <Option value="service3">Service 3</Option>
        </Select>
      </Form.Item>
      <Form.Item label={t("status")} name="status" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item
        label={t("amountPaid")}
        name="amountPaid"
        rules={[{ required: true, message: "Please enter amount paid" }]}
      >
        <Input type="number" placeholder="Enter amount paid" />
      </Form.Item>
      <Form.Item
        label={t("refundAmount")}
        name="refundAmount"
        rules={[{ required: true, message: "Please enter refund amount" }]}
      >
        <Input type="number" placeholder="Enter refund amount" />
      </Form.Item>
      <Form.Item
        label={t("createat")}
        name="createAt"
        rules={[{ required: true, message: "Please enter date create" }]}
      >
        <DatePicker />
      </Form.Item>
    </div>
  );
};

export default UpdateRefund;
