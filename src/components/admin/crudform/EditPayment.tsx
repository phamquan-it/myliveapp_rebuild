import React from "react";
import { Form, Input, Select, Switch, DatePicker, Button } from "antd";

const { Option } = Select;
const EditPayment = () => {
  return (
    <>
      <Form.Item
        label="Id"
        name="id"
        rules={[{ required: true, message: "Please enter id" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter a name" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
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
        label="Fund"
        name="fund"
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
    </>
  );
};
export default EditPayment;
