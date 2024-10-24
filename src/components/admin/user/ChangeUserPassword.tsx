import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
interface ChangeUserPasswordProps {

}

const ChangeUserPassword: React.FC<ChangeUserPasswordProps> = () => {
    type ChangePasswordType = {
        old_password?: string;
        new_password?: string;
        confirm_password?: string;
    };
    const onFinish: FormProps<ChangePasswordType>['onFinish'] = (values) => {
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
                label="Old password"
                name="old_password"
                rules={[{ required: true }]}
            >
                <Input.Password />
            </Form.Item>

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
                <Button type="primary" htmlType="submit">
                    Change password
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default ChangeUserPassword
