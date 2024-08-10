import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Select, Upload } from 'antd';
import { Input } from 'antd/lib';
import React from 'react';
interface CreateAutoliveProps {

}

const CreateAutolive: React.FC<CreateAutoliveProps> = () => {

    type FieldType = {
        platformId?: number;
        key?: string;
        file?: File;
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
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Platform"
                name="platformId"
                rules={[{ required: true, message: 'Please select a platform!' }]}
            >
                <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Stream key"
                name="key"
                rules={[{ required: true, message: 'Please input your streamkey!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType> name="file">
                              
                <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Create
                </Button>
            </Form.Item>
        </Form>
        
    </>
}

export default CreateAutolive
