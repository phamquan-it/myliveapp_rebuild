import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Select, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { useState } from 'react';
interface NewStreamProps {

}

const NewStream: React.FC<NewStreamProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {

    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    type FieldType = {
        source_link?: string;  // A link, so it's a string
        key?: string;          // Unique identifier, string type
        name?: string;         // Name of the file or resource
        platformId?: number;   // Platform ID, assumed to be a number
        vpsId?: number;
        startTime?: string,
        endTime?: string,// VPS ID, assumed to be a number
        loop?: string;         // Loop setting, 'infinity' suggests a string
        download_on?: string;  // Download source, string type
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const [sourceLink, setSourceLink] = useState('youtube')
    return <>
        <Button type="primary" icon={<PlusCircleFilled />} iconPosition="end"
            onClick={() => {
                setIsModalOpen(true)
            }}
        >New stream</Button>

        <Modal title="New stream" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
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
                    label="Source link"
                    name="source_link"
                    rules={[{ required: true }]}
                >
                    <Space.Compact className='!w-full'>
                        <Input />
                        <Select style={{ width: 200 }} value={sourceLink} options={[{ value: 'youtube', label: <span>Youtube</span> }]} />
                    </Space.Compact>
                </Form.Item>

                <Button type="primary" htmlType='submit'></Button>
            </Form>
        </Modal>
    </>

}

export default NewStream
