import React from "react";
import { Form, Input } from "antd";

const PlatformDetail: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="ID" name="id" rules={[{ required: true }]}>
        <Input type="number" placeholder="Enter ID" />
      </Form.Item>
      <Form.Item label="Name" name="name" rules={[{ required: true }]}>
        <Input placeholder="Enter Name" />
      </Form.Item>
      <Form.Item label="Icon" name="icon">
        <Input placeholder="Enter Icon URL" />
      </Form.Item>
      <Form.Item label="Location" name="location">
        <Input type="number" placeholder="Enter Location" />
      </Form.Item>
      <Form.Item label="Created At" name="createdAt">
        <Input placeholder="Enter Created At" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="" allowClear />
      </Form.Item>
      {/* Add other form fields here */}
    </Form>
  );
};

export default PlatformDetail;
