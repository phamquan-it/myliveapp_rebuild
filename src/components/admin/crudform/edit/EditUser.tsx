import React, { useEffect } from "react";
import { Form, Input, Select, Switch } from "antd";

const { Option } = Select;

interface EditUserProps {
  formValues: {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    funds?: number;
    total_money?: number;
    isActive?: number;
  };
}

const EditUser: React.FC<EditUserProps> = ({ formValues }) => {
  return (
    <>
      <Form.Item label="ID" name="id" initialValue={formValues.id}>
        <Input
          placeholder="ID"
          onChange={() => {
            console.log(formValues);
          }}
        />
      </Form.Item>
      <Form.Item
        initialValue={formValues.name}
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        initialValue={formValues.email}
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email address",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
      <div className="grid grid-cols-3 gap-2">
        <Form.Item
          label="Fund Number"
          name="fundNumber"
          initialValue={formValues.funds}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Total Money"
          name="totalMoney"
          initialValue={formValues.total_money}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item label="Is Active" name="isActive" valuePropName="checked">
          <Switch value={formValues.isActive == 1} />
        </Form.Item>
      </div>
    </>
  );
};

export default EditUser;
