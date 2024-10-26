import axiosInstance from '@/apiClient/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Select, message } from 'antd';
import React from 'react';
type FieldType = {
    user_id?: string
    name?: string;
    role_id?: number;
};

interface UpdateUserInfoProps {
    user_info: FieldType
}

const UpdateUserInfo: React.FC<UpdateUserInfoProps> = ({ user_info }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ['updateinfo'],
        mutationFn: (info: any) => axiosInstance.patch('users/update-info', { ...user_info, ...info }),
        onSuccess: (res) => {
            message.success("OK")
            queryClient.invalidateQueries({queryKey: ['user']})
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        mutate(values)
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return <>


        <Form
            name="basic"
            labelCol={{ span: 6 }}
            labelAlign='left'
            wrapperCol={{ span: 18 }}
            style={{ maxWidth: 600 }}
            initialValues={{ name: user_info.name, role_id: user_info.role_id }}
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
                label="Role"
                name="role_id"
                rules={[{ required: true }]}
            >
                <Select options={
                    [
                        { value: 1, label: <span>User</span> },
                        { value: 2, label: <span>Manager</span> },
                        { value: 3, label: <span>Admin</span> },
                    ]} />
            </Form.Item>


            <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Button type="primary" htmlType="submit" loading={isPending}>
                    {('Update')}
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default UpdateUserInfo
