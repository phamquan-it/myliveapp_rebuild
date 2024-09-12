import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, message } from 'antd';
import React from 'react';
import axios from 'axios';
import { handleUploadFile } from '../../handleUploadFile';

// Import your handleUploadFile function

const Page = () => {
  const rootFolder = __dirname; // Example root folder

  const customUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;

    try {
      // Call handleUploadFile with necessary parameters
      const response = await handleUploadFile(file, rootFolder);
      console.log(response)

      onSuccess && onSuccess(response);
      message.success('File uploaded successfully');
    } catch (error) {
      onError && onError(error);
      message.error('File upload failed');
    }
  };

  return (
    <Upload customRequest={customUpload}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default Page;
