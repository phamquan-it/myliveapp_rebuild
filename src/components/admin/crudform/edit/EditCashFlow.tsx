import React from "react";
import { Form, Input, Select, Switch, DatePicker, Button } from "antd";
import { useTranslations } from "next-intl";

const { Option } = Select;

interface EditCashFlowProps {
  value: any;
}

const EditCashFlow: React.FC<EditCashFlowProps> = ({ value }) => {
  const t = useTranslations("MyLanguage");
  return (
    <div>
      <Form.Item
        label="ID"
        name="id"
        rules={[{ required: true, message: "Please enter an ID" }]}
        initialValue={value.id}
      >
        <Input
          placeholder="Enter ID"
          onChange={() => {
            console.log(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        initialValue={value.email}
        rules={[{ required: true, message: "Please enter an email" }]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        label={t("amountPaid")}
        name="amountPaid"
        initialValue={value.money}
        rules={[{ required: true, message: "Please enter amount paid" }]}
      >
        <Input type="number" placeholder="Enter amount paid" />
      </Form.Item>
      <Form.Item
        initialValue={value.fund}
        label={t("refundAmount")}
        name="refundAmount"
        rules={[{ required: true, message: "Please enter refund amount" }]}
      >
        <Input type="text" placeholder="Enter refund amount" />
      </Form.Item>
    </div>
  );
};

export default EditCashFlow;
