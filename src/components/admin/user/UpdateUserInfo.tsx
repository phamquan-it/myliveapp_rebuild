import { Button, Form, FormProps, Input, Select } from 'antd';
import React from 'react';
interface UpdateUserInfoProps {

}

const UpdateUserInfo: React.FC<UpdateUserInfoProps> = () => {
    type FieldType = {
        name?: string;
        role: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
            initialValues={{ remember: true }}
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
                name="role"
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
                <Button type="primary" htmlType="submit">
                    {('Update')}
                </Button>
            </Form.Item>
        </Form>
    </>
}

export default UpdateUserInfo
