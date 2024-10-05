import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Select } from 'antd';
import React, { useState } from 'react';
interface CreateNewStreamProps {

}

const CreateNewStream: React.FC<CreateNewStreamProps> = () => {
    type FieldType = {
        vps_id?: string;
        platform_id?: string;
        user_id?: string;
        name?: string;
        resolution?: string;
        start_at?: string;
        end_at?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {

    }
    const [isModalOpen, setIsModalOpen] = useState(false)
    return <>
        <Button type="primary" icon={<PlusCircleFilled />} onClick={() => {
            setIsModalOpen(true)
        }} >Create</Button>

        <Modal title="Create new stream" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 19 }}

                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Vps"
                    name="vps_id"
                    rules={[{ required: true, message: 'Please select your vps!' }]}
                >
                    <Select options={[]} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="User"
                    name="user_id"
                    rules={[{ required: true, message: 'Please select user!' }]}
                >
                    <Select options={[]} />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Platform"
                    name="platform_id"
                    rules={[{ required: true, message: 'Please select platform!' }]}
                >
                    <Select options={[]} />
                </Form.Item>

            </Form>
        </Modal>
    </>
}

export default CreateNewStream
