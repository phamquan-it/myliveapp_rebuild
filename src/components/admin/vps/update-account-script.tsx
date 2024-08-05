import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
interface UpdateAccountScriptProps {
    accountScript: any
}
const UpdateAccountScript: React.FC<UpdateAccountScriptProps> = ({ accountScript }) => {
    const onFinish = (values: any) => {

        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        console.log(accountScript);
    };
    return (
        <>

            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    name: accountScript.name,
                    filename: accountScript.filename,
                    content: accountScript.content
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="File name"
                    name="filename"
                    rules={[{ required: true, message: 'Please input your filename!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input your shell script!' }]}
                >
                    <Input.TextArea placeholder="" rows={10}/>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default UpdateAccountScript