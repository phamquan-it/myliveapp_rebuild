import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Upload, UploadProps, message } from 'antd';
import React, { useState } from 'react';
import { handleUploadFile } from '../../../handleUploadFile';
import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { useTranslations } from 'next-intl';
type FieldType = {
    name?: string;
    rmtp?: string;
    image?: string;
};




const CreatePlatform = () => {
    const queryClient = useQueryClient()
    const createPlatform = useMutation({
        mutationKey: ['platform'],
        mutationFn: (platform: any) => axiosInstance
            .post("platform/add",
                platform,
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
            queryClient.invalidateQueries({ queryKey: ['platform'] })
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

    const t = useTranslations("MyLanguage")
    const [form] = Form.useForm()
    return <>
        <div>
            <Button type="primary" onClick={showModal} icon={<PlusCircleFilled />} iconPosition="end" className='w-full'>{t('create')}</Button>
        </div>
        <Modal title={t('create')} open={isModalOpen} onCancel={handleCancel} onOk={() => {
            form.submit()
        }} okButtonProps={{
            loading: createPlatform.isPending
        }}>
            <Form
                layout="vertical"
                name="basic"
                form={form}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    required
                    label={t('name')}
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    required={false}
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
            </Form>
        </Modal>
    </>
}

export default CreatePlatform
