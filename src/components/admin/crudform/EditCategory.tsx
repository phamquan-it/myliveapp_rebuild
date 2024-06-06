import React from "react";
import { Form, Input, Upload, DatePicker, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditCategory: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission here
  };

  return (
    <div>
      <Form.Item label="ID" name="id">
        <Input placeholder="Enter ID" />
      </Form.Item>
      <Form.Item label="Platform" name="category">
        <Select
          showSearch
          placeholder="Select platform"
          // onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
        />
      </Form.Item>
      <Form.Item label="Name" name="name">
        <Input placeholder="Enter Name" />
      </Form.Item>

      <Form.Item label="Date Created" name="dateCreate">
        <DatePicker />
      </Form.Item>
    </div>
  );
};

export default EditCategory;
