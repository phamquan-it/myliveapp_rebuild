import { Button, ConfigProvider, Form, FormInstance, FormProps, Input, Modal, Select, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useState } from 'react';
import { ConversionType } from '../VpsConfig';
import { EditFilled } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';

interface EditConversionProps {
    conversion: ConversionType;
}

const EditConversion: React.FC<EditConversionProps> = ({ conversion }) => {
    const resolution = useQuery({
        queryKey: ['resolution'],
        queryFn: () => axiosInstance.get('/resolution')
    })
    const updateConvetionMutation = useMutation({
        mutationKey:['conversion-update'],
        mutationFn: (conversionData: ConversionType)=> axiosInstance.patch(`/conversion/update/${conversion.id}`, conversionData),
        onSuccess: ()=>{
            message.success("Success")
        },
        onError:(err)=>{
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
        updateConvetionMutation.mutate({...values, amount: Number(values.amount)})
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

            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: 'green', // Set the primary color to green
                    },
                }}
            >
                <Button type="default" icon={<EditFilled />} style={{
                    color: 'green',
                    borderColor: 'green'
                }} onClick={() => {
                    setIsModalOpen(true)
                }}></Button>
            </ConfigProvider>
            <Modal title="Edit" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ ...conversion }} // Set the initial values from the conversion prop
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="From"
                        name="from"
                        rules={[{ required: true}]}
                    >
                        <Select options={resolution?.data?.data.map((res: any) => ({ ...res, value: res.key }))} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="To"
                        name="to"
                        rules={[{ required: true}]}
                    >
                        <Select options={resolution?.data?.data.map((res: any) => ({ ...res, value: res.key }))} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Amount"
                        name="amount"
                        rules={[{ required: true}]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditConversion;

