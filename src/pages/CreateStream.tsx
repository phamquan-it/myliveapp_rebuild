import React, { useEffect, useRef, useState } from 'react';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Select, Tooltip, Space, Switch, message, Table } from 'antd';
import { FormInstance } from 'antd/lib';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';

const { RangePicker } = DatePicker;

const App: React.FC = () => {
    
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
        },
 
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: 'Cron',
            dataIndex: 'cron',
            key: 'cron',
        },
    ];


    const formRef = useRef<FormInstance<any> | null>(null);
    const [scrollToBottomState, setScrollToBottomState] = useState(false)

    // Step 3: Function to scroll to bottom
    const scrollToBottom = () => {
        if (formRef.current) {
            const formElement = formRef.current.getFieldsValue();
            console.log(formElement);
            console.log(formElement.items[0].name);
            formRef.current.scrollToField('btn-submit', {
                scrollMode: 'always',
                behavior: 'smooth',
            });
        }
    };
    useEffect(() => {
        scrollToBottom()
    }, [scrollToBottomState])

    const [form] = Form.useForm();
    const [isStreamNow, setIsStreamNow] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        form.submit();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { mutate } = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (data: any) => axiosInstance.post('/autolive-control/create-new-stream', data),
        onSuccess: () => {
            message.success("OK")
        },
        onError: () => {
            message.error("no ok")
        }
    })

    // Handle form submission
    const onFinish = (values: any) => {
        console.log('Form Values:', values);
        values.items.map((item: any) => {
            mutate({
                source_link: values.drive_link,
                key: item.streamkey,
                platformId: item.platform
            })
        })

    };

    const { data } = usePlatformData();

    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusCircleFilled />}></Button>
            <Modal width={1000} title="Create stream" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className="grid">

                    <Table dataSource={[{name:"123"}]} className='border'  columns={columns} pagination={false} />
                  
                     <Form
                       name="basic"
                       labelCol={{ span: 8 }}
                       wrapperCol={{ span: 16 }}
                       style={{ maxWidth: 600 }}
                       initialValues={{ remember: true }}
                       onFinish={onFinish}
                       autoComplete="off"
                     >
                       <Form.Item
                         label="Stream key"
                         name="streamkey"
                         rules={[{ required: true, message: 'Please input your username!' }]}
                       >
                         <Input />
                       </Form.Item>
                   
                                          
                       <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                         <Button type="primary" htmlType="submit">
                           Submit
                         </Button>
                       </Form.Item>
                     </Form>
                </div>
            </Modal>
        </>
    );
};

export default App;

