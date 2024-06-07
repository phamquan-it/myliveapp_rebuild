import React from "react";
import { Form, Input, Upload, DatePicker, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
interface editCategoryProps {
  value: any;
}
const EditCategory: React.FC<editCategoryProps> = ({ value }) => {
  return (
    <div>
      <Form.Item label="ID" name="id" initialValue={value.id}>
        <Input
          placeholder="Enter ID"
          onChange={() => {
            console.log(value);
          }}
        />
      </Form.Item>
      <Form.Item
        label="Platform"
        name="category"
        initialValue={value.platformId}
      >
        <Select
          showSearch
          placeholder="Select platform"
          // onChange={onChange}
          // onFocus={onFocus}
          // onBlur={onBlur}
          // onSearch={onSearch}
        />
      </Form.Item>
      <Form.Item label="Name" name="name" initialValue={value.name}>
        <Input placeholder="Enter Name" />
      </Form.Item>

      <Form.Item
        label="Date Created"
        name="dateCreate"
        initialValue={value.createdAt}
      >
        <Input placeholder="Basic usage" />
      </Form.Item>
    </div>
  );
};

export default EditCategory;
