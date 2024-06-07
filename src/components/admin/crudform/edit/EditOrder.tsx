import React from "react";
import { Form, Input, Select } from "antd";

const { Option } = Select;

interface EditOrderProps {
  initialValues: {
    id?: string;
    service?: any;
    link?: string;
    user?: any;
    charge?: number;
    startCount?: number;
    actuallySpent?: number;
    status?: string;
    quantity?: number;
  };
}

const EditOrder: React.FC<EditOrderProps> = ({ initialValues }) => {
  return (
    <>
      <Form.Item label="ID" name="id" initialValue={initialValues.id}>
        <Input
          placeholder="Basic usage"
          onChange={() => {
            console.log(initialValues);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Services"
        name="services"
        rules={[{ required: true, message: "Please select a service" }]}
        initialValue={initialValues.service.id}
      >
        <Select placeholder="Select service">
          <Option value="service1">Service 1</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Provider"
        name="provider"
        initialValue={initialValues.link}
      >
        <Input placeholder="Enter provider" />
      </Form.Item>
      <Form.Item
        label="User"
        name="user"
        rules={[
          {
            required: true,
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
        initialValue={initialValues.user.email}
      >
        <Input placeholder="Enter user email" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-2">
        <Form.Item
          label="Charge"
          name="charge"
          initialValue={initialValues.charge}
        >
          <Input type="number" placeholder="Enter charge" />
        </Form.Item>
        <Form.Item
          label="Start Count"
          name="startCount"
          initialValue={initialValues.startCount}
        >
          <Input type="number" placeholder="Enter start count" />
        </Form.Item>
      </div>
      <Form.Item
        label="Actually Spent"
        name="actuallySpent"
        initialValue={initialValues.actuallySpent}
      >
        <Input type="number" placeholder="Enter actually spent" />
      </Form.Item>

      <div className="grid md:grid-cols-2 gap-2">
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select a status" }]}
          initialValue={initialValues.status}
        >
          <Select placeholder="Select status">
            <Option value="In progress">In progress</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Error">Error</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Quantity"
          name="quantity"
          initialValue={initialValues.quantity}
        >
          <Input type="number" placeholder="Enter quantity" />
        </Form.Item>
      </div>
    </>
  );
};

export default EditOrder;
