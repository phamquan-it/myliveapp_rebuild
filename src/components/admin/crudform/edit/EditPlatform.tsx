import React, { useState } from "react";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface EditPlatFormProps {
  initialValues: {
    id?: string;
    name?: string;
    icon?: any; // Adjust the type as needed for file uploads
  };
}

const EditPlatForm: React.FC<EditPlatFormProps> = ({ initialValues }) => {
  const [fileList, setFileList] = useState([]);
  const handleFileChange = ({ fileList }: { fileList: any }) =>
    setFileList(fileList);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form.Item
        label="ID"
        name="id"
        initialValue={initialValues.id}
        className="hidden"
      >
        <Input placeholder="ID" disabled />
      </Form.Item>
      <Form.Item label="Title" name="title" initialValue={initialValues.name}>
        <Input
          placeholder="Enter title"
          onChange={() => {
            console.log(initialValues);
          }}
        />
      </Form.Item>
      <Form.Item label="Upload File" name="icon">
        <Upload fileList={fileList} onChange={handleFileChange}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </>
  );
};

export default EditPlatForm;
