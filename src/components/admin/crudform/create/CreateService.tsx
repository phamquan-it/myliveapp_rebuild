import React, { useState } from "react";
import { Form, Input, Select, Button, Modal, Checkbox, FormProps } from "antd";
import { useTranslations } from "next-intl";
import { PlusCircleFilled } from "@ant-design/icons";

const { Option } = Select;

const CreateService: React.FC = () => {

    type FieldType = {
        name?: string;
        rate?: string;
        platform?: number;
        level?: number;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const t = useTranslations("DashboardMenu");
    const d = useTranslations("MyLanguage");


    const handleOk = () => {

    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className=''>
            <Button type="primary" icon={<PlusCircleFilled />} iconPosition='end' onClick={() => {
                setIsModalOpen(true)
            }} className='!w-full'>{ d('create') }</Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Form
                    name="Create service"
                    layout='vertical'
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    );
};

export default CreateService;
