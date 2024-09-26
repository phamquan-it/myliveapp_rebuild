import axiosInstance from '@/apiClient/axiosConfig';
import { EditFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
interface EditLiveConfigProps {
    config: any
}

const EditLiveConfig: React.FC<EditLiveConfigProps> = ({ config }) => {
    const [form] = Form.useForm();
    type FieldType = {
        resolution?: string;
        max?: number;
        cpu?: number;
        ram?: number;
        storage?: number;
    };
    const updateConfig = useMutation({
        mutationKey: ['live'],
        mutationFn: (val: FieldType) => axiosInstance.patch(`/vps-config/update/${config.id}`, val),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        const parsedValues: FieldType = {
            resolution: values.resolution, // Assuming resolution is a string
            max: Number(values.max), // Convert to number
            cpu: Number(values.cpu), // Convert to number
            ram: Number(values.ram), // Convert to number
            storage: Number(values.storage), // Convert to number
        };
        updateConfig.mutate(parsedValues)

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const handleOk = () => {
        form.submit()
    }
    return <>

        <Button style={{
            backgroundColor: 'green'
        }} icon={<EditFilled />} type='primary' onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Edit config" open={isModalOpen} okButtonProps={{

        }} onOk={handleOk} onCancel={handleCancel}>

            <Form form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Resolution"
                    name="resolution"
                    initialValue={config.resolution}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Max"
                    name="max"
                    initialValue={config.max}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Cpu"
                    name="cpu"
                    initialValue={config.cpu}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Ram"
                    name="ram"
                    initialValue={config.ram}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Storage"
                    name="storage"
                    initialValue={config.storage}
                    rules={[{ required: true, message: '' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    </>

}

export default EditLiveConfig
