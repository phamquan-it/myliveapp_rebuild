import { PlayCircleFilled } from '@ant-design/icons';
import { Button, DatePicker, Form, FormProps, Input, Modal } from 'antd';
import React, { useState } from 'react';
import type { DatePickerProps, GetProps } from 'antd';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const { RangePicker } = DatePicker;
interface AddCronProps {
    id: number;
}

export const AddCron: React.FC<AddCronProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    type FieldType = {
        name?: string;
        start_date?: string;
        end_date?: string;
        restime?: string
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <>
        <Button type="primary" onClick={showModal} size="small" icon={<PlayCircleFilled />}></Button>
        <Modal title="Create" open={isModalOpen} onCancel={handleCancel} footer={[]} >

            <Form
                name="basic"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="grid"
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Name is required!' }]}
                >

                    <Input style={{
                        width: 400
                    }} />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Rest time"
                    name="start_date"
                >
                    <RangePicker

                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Name"
                    name="restime"
                >

                    <Input style={{
                        width: 400
                    }} />
                </Form.Item>




                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>;
}


