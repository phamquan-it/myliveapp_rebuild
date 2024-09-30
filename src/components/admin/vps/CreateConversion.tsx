import { Button, ConfigProvider, Form, FormInstance, FormProps, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { ConversionType } from '../VpsConfig';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import { PlusCircleFilled } from '@ant-design/icons';

interface CreateConversionProps {
}

const CreateConversion: React.FC<CreateConversionProps> = ({ }) => {
    const resolution = useQuery({
        queryKey: ['resolution'],
        queryFn: () => axiosInstance.get('/resolution')
    })
    const createConvetionMutation = useMutation({
        mutationKey: ['conversion-update'],
        mutationFn: (conversionData: ConversionType) => axiosInstance.post(`/conversion/create/`, conversionData),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    });

    type FieldType = {
        from?: string;
        to?: string;
        amount?: number;
    };

    // Use destructuring for form instance
    const [form] = useForm<FieldType>();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        createConvetionMutation.mutate({ ...values, amount: Number(values.amount) })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        form.submit(); // Submit the form when OK is clicked
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>

            <Button type="primary" icon={<PlusCircleFilled />} style={{
            }} onClick={() => {
                setIsModalOpen(true)
            }}></Button>

            <Modal title="Create" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="From"
                        name="from"
                        rules={[{ required: true }]}
                    >
                        <Select options={resolution?.data?.data.map((res: any) => ({ ...res, value: res.key }))} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="To"
                        name="to"
                        rules={[{ required: true }]}
                    >
                        <Select options={resolution?.data?.data.map((res: any) => ({ ...res, value: res.key }))} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Amount"
                        name="amount"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateConversion;

