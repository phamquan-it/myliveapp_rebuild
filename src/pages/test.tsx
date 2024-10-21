import React, { useState } from 'react';
import { Form, Input, Button, Upload, message, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import { RcFile } from 'antd/es/upload';

const FormWithUpload = () => {
    const [fileList, setFileList] = useState<RcFile[]>([]);

    const props: UploadProps = {
        onRemove: (file: any) => {
            setFileList((prevFileList) => {
                const index = prevFileList.indexOf(file);
                const newFileList = prevFileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: (file: RcFile) => {
            setFileList([...fileList, file]);
            return false; // Prevent automatic upload by Ant Design
        },
        fileList,
    };

    const uploadFileMutation = useMutation({
        mutationKey: ['uploadfile'],
        mutationFn: (
            uploadData: {
                formData: FormData,
                stream_id: string | number
            }) => axiosInstance.post('/sftp-upload/' + uploadData.stream_id, uploadData.formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }),
        onSuccess: () => {
            message.success("Upload ok")
        },
        onError: () => {
            message.error("Upload err")
        }
    })

    const onFinish = async (values: any) => {
        console.log('Form values:', values);
        if (fileList.length === 0) {
            message.error('Please select a file to upload');
            return;
        }

        // Prepare form data with file
        const formData = new FormData();
        formData.append('username', values.username);
        fileList.forEach((file) => {
            formData.append('video', file); // Append file to form data
        });
        uploadFileMutation.mutate({
            formData,
            stream_id: 372
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name='name'
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
                rules={[{ required: true }]}
            >
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={uploadFileMutation.isPending}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormWithUpload;

