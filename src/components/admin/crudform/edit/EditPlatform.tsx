import { EditFilled, PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, FormProps, Input, Modal, Upload, UploadProps, message } from 'antd';
import React, { useState } from 'react';
import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { handleUploadFile } from '../../../../../handleUploadFile';
import { Platform } from '@/@type';
type FieldType = {
    id: number
    name?: string;
    rmtp?: string;
    image?: string;
};



interface UpdatePlatformProps {
    platform: FieldType
}
const UpdatePlatform: React.FC<UpdatePlatformProps> = ({ platform }) => {
    const queryClient = useQueryClient()

    console.log(platform.id)
    const createPlatform = useMutation({
        mutationKey: ['platform'],
        mutationFn: (pf: any) => axiosInstance
            .patch("platform/update/" + platform.id,
                pf,
            ),
        onSuccess: (res) => {
            message.success("Success")
            setIsModalOpen(false)
            queryClient.invalidateQueries({ queryKey: ['platform'] })
        },
        onError: (err) => {
            message.error(err.message)
        }
    })


    const [key, setKey] = useState(platform?.image)
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
        <ConfigProvider theme={{
            token: {
                colorPrimary:'green'
            }
            }}>
            <Button  onClick={showModal} iconPosition="end"  icon={<EditFilled />} className="border-green-700 text-green-700"></Button>
        </ConfigProvider>
        <Modal title="Update" open={isModalOpen} onCancel={handleCancel} footer={[]}>
            <Form
                layout="vertical"
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ ...platform }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Rmtp"
                    name="rmtp"
                    rules={[{ required: true }]}
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
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
}
export default UpdatePlatform


