import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import axios from 'axios';

const UploadForm: React.FC = () => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [formId, setFormId] = useState<string | null>(null);

  const uploadProps: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList(info.fileList); // Update the fileList state
    },
    fileList, // Controlled file list to maintain the state
  };

  const onFinish = async (values: any) => {
    try {
      // Simulating form submission to get an ID
      const response = await Promise.resolve({
        status: 200,
        data: {
          id: 300, // Example response with an ID
        },
      });
      
      if (response.status === 200) {
        const { id } = response.data; // Get the ID from the server response
        setFormId(id.toString()); // Store the formId
        message.success('Form submitted successfully, ID received: ' + id);

        // Now, upload the file using the received ID
        if (fileList.length > 0) {
          const formData = new FormData();
          formData.append('file', fileList[0].originFileObj); // Append the selected file
          formData.append('id', id.toString()); // Attach the form ID

          // Make API call to upload the file
          const uploadResponse = await axios.post(
            `https://example.com/api/upload-with-id/${id}`, 
            formData, 
            { headers: { 'Content-Type': 'multipart/form-data' } }
          );

          if (uploadResponse.status === 200) {
            message.success('File uploaded successfully with ID: ' + id);
          } else {
            message.error('File upload failed.');
          }
        } else {
          message.error('Please upload a file.');
        }
      }
    } catch (error) {
      message.error('Form submission failed.');
      console.error(error);
    }
  };

  return (
    <Form onFinish={onFinish}>
      {/* Other form fields */}
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload {...uploadProps} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UploadForm;

