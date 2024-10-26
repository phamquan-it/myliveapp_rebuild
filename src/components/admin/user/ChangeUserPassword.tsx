import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, message } from 'antd';
import React from 'react';
export type ChangePasswordType = {
    user_id?: string,
    new_password?: string
    confirm_password?: string
};

interface ChangeUserPasswordProps {
    change_password: ChangePasswordType
}

const ChangeUserPassword: React.FC<ChangeUserPasswordProps> = ({ change_password }) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['update_user_password'],
        mutationFn: (data: ChangePasswordType) => axiosInstance.patch('/users/update-password', data),
        onSuccess: ()=>{
            message.success("Success")
        },
        onError: (err)=>{
            message.error(err.message)
        }
    })
    const onFinish: FormProps<ChangePasswordType>['onFinish'] = (values) => {
        mutate({...change_password, ...values})
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<ChangePasswordType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            labelAlign="left"
        >

            <Form.Item<ChangePasswordType>
                label="New password"
                name="new_password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<ChangePasswordType>
                label="Comfirm password"
                name="confirm_password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isPending}>
                    Change password
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default ChangeUserPassword
