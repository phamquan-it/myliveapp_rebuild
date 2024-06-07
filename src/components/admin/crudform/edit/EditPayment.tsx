import React from "react";
import { Form, Input, Select, Switch, DatePicker, Button } from "antd";

const { Option } = Select;
interface editPaymentProps {
  value: any;
}
const EditPayment: React.FC<editPaymentProps> = ({ value }) => {
  return (
    <>
      <Form.Item
        label="Id"
        name="id"
        rules={[{ required: true, message: "Please enter id" }]}
        initialValue={value.id}
      >
        <Input
          placeholder="Enter id"
          onChange={() => {
            console.log(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}
        initialValue={value.creator}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        initialValue={value.account}
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>
      <Form.Item
        label="Action"
        name="action"
        rules={[{ required: true, message: "Please select an action" }]}
        initialValue={value.paymethod}
      >
        <Select placeholder="Select action">
          <Option value="action1">Action 1</Option>
          <Option value="action2">Action 2</Option>
          <Option value="action3">Action 3</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Amount"
        name="amount"
        initialValue={value.amount}
        rules={[
          {
            required: true,
            type: "number",
            message: "Please enter a valid amount",
          },
        ]}
      >
        <Input type="number" placeholder="Enter amount" />
      </Form.Item>
      <Form.Item
        initialValue={value.rate}
        label="Rate"
        name="Rate"
        rules={[
          {
            required: true,
            type: "number",
            message: "Please enter a valid fund",
          },
        ]}
      >
        <Input type="number" placeholder="Enter fund" />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        initialValue={value.date}
        rules={[
          {
            required: true,
            message: "Please enter a valid date",
          },
        ]}
      >
        <Input type="text" placeholder="Enter date" />
      </Form.Item>
    </>
  );
};
export default EditPayment;
