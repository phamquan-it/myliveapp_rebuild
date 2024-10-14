import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Upload, UploadProps, message } from 'antd';
import React, { useState } from 'react';
import { handleUploadFile } from '../../../handleUploadFile';
import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import { headers } from 'next/headers';
type FieldType = {
    name?: string;
    rmtp?: string;
    image?: string;
};




const CreatePlatform = () => {
    const createPlatform = useMutation({
        mutationKey: ['platform'],
        mutationFn: (platform: any) => axiosInstance
            .post("platform/add",
                platform,
            ),
        onSuccess: (res) => {
            message.success("Success")
            setIsModalOpen(false)
        },
        onError: (err) => {
            message.error(err.message)
        }
    })


    const [key, setKey] = useState('')
    const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
        if (key != '') {
            values.image = key
            createPlatform.mutate(values)
        } else message.error("File is empty!")
    };


    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const customUpload = async (options: any) => {
        const { file, onSuccess, onError } = options;

        try {
            // Call handleUploadFile with necessary parameters
            const response = await handleUploadFile(file, __dirname);
            setKey(response.key)
            onSuccess && onSuccess(response);
            message.success('File uploaded successfully');
        } catch (error) {
            onError && onError(error);
            message.error('File upload failed');
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    }
    return <>
        <div>
            <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />} iconPosition="end" className='w-full'>Create</Button>
        </div>
        <Modal title="Create" open={isModalOpen} onCancel={handleCancel} footer={[]}>
            <Form
                layout="vertical"
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Rmtp"
                    name="rmtp"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input />
                </Form.Item>
                <div className="pb-3">
                    <Upload customRequest={customUpload}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </div>
                <Form.Item >
                    <Button type="primary" loading={createPlatform.isPending} htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default CreatePlatform
