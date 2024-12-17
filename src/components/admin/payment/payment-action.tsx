import axiosInstance from '@/apiClient/axiosConfig';
import { Payment } from '@/pages/dashboard/payment/history';
import { EditFilled, EditOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, ConfigProvider, Form, FormProps, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
interface PaymentActionProps {
    paymentId: number
    paymentInfo: Payment
}

const PaymentAction: React.FC<PaymentActionProps> = ({ paymentId, paymentInfo }) => {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {

    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    type FieldType = {
        amount_vnd?: string;
        rate?: string;
        amount_usd?: string;
    };

    const { data, isPending, mutate } = useMutation({
        mutationKey: ['update-payment'],
        mutationFn: (id: number | string) => axiosInstance.patch(`/payment/update/status/${id}`, { status: "completed" }),
        onSuccess: () => {
            message.success("OK")
            queryClient.invalidateQueries({ queryKey: ['update-payment'] })
        }
    })
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <ConfigProvider theme={{
            token: {
                colorPrimary: "rgb(73, 189, 101)"
            }
        }}>
            <Button type="primary" icon={<EditFilled />} onClick={() => {
                setIsModalOpen(true)
            }}></Button>
        </ConfigProvider>
        <Modal title="Confirm payment" open={isModalOpen} footer={[]} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
                style={{ maxWidth: 600 }}
                initialValues={{ ...paymentInfo, amount_vnd: (paymentInfo.amount * 24000) }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                labelAlign="left"
            >
                <Form.Item<FieldType>
                    className="pb-2"
                    label=<span className="font-semibold text-slate-800">Amount(VND)</span>
                    name="amount_vnd"
                    rules={[{ required: true }]}
                >
                    <Input />

                </Form.Item>
                <Form.Item<Payment>
                    className="pb-2"
                    label=<span className="font-semibold text-slate-800">Rate</span>
                    name="rate"
                >
                    <Input />
                </Form.Item>
                <Form.Item<Payment>
                    className="pb-2"
                    label=<span className="font-semibold text-slate-800">Amount(USD)</span>
                    name="amount"
                >
                    <Input />
                </Form.Item>
            </Form>
            <div className="flex justify-between">
                <Button type="primary" danger loading={isPending} >Deny</Button>
                <Button type="primary" loading={isPending} onClick={() => {
                    mutate(paymentId)
                }}>Accept</Button>
            </div>
        </Modal>
    </>
}

export default PaymentAction
