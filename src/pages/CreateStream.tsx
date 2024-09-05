import React, { useEffect, useRef, useState } from 'react';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Select, Tooltip, Space, Switch, message, Table } from 'antd';
import { FormInstance } from 'antd/lib';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';

const { RangePicker } = DatePicker;

const App: React.FC = () => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

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
                <div className="grid grid-cols-2">
                    <Form
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        form={form}
                        name="dynamic_form_complex"
                        style={{
                            maxHeight: 500,
                            overflowY: 'auto',
                            maxWidth: 600,
                            paddingRight: 5,
                        }}
                        className="scrollable-div"
                        autoComplete="off"
                        initialValues={{ items: [{}] }}
                        onFinish={onFinish}
                        ref={formRef}
                    >
                        <Form.Item label="Stream now" name="stream_now">
                            <Switch onChange={(value) => setIsStreamNow(value)} />
                        </Form.Item>

                        <Form.Item label="Drive link" name="drive_link" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.List name="items">
                            {(fields, { add, remove }) => (
                                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            id="card-stream"
                                            title={`Stream ${field.name + 1}`
                                            }
                                            key={field.key}  // Added key prop here
                                            extra={
                                                <CloseOutlined onClick={() => { if (fields.length > 1) remove(field.name); }} />
                                            }
                                        >
                                            <Form.Item
                                                label="Name"
                                                initialValue={`Stream ${field.name + 1}`}
                                                style={{ width: 435 }}
                                                name={[field.name, 'name']}
                                                rules={[{ required: true, message: 'Name is required' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                label="Platform"
                                                name={[field.name, 'platform']}
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    options={
                                                        data?.data?.platforms?.map((platform: any) => ({
                                                            label: platform.name,
                                                            value: platform.id,
                                                        }))
                                                    }
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Stream key"
                                                name={[field.name, 'streamkey']}
                                                rules={[{ required: true }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            {/* Nested Form.List */}
                                            {!isStreamNow && (
                                                <>
                                                    <Form.Item label="Cron">
                                                        <Form.List name={[field.name, 'list']}>
                                                            {(subFields, subOpt) => (
                                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                    {subFields.map((subField) => (
                                                                        <div key={subField.key}> {/* Added key prop here */}
                                                                            <Space align="baseline">
                                                                                <Form.Item
                                                                                    name={[subField.name, 'end_time']}
                                                                                    rules={[
                                                                                        { required: true, message: 'End time is required' },
                                                                                    ]}
                                                                                >
                                                                                    <RangePicker showTime />
                                                                                </Form.Item>
                                                                                <Tooltip title="Rest time: minus">
                                                                                    <Form.Item
                                                                                        name={[subField.name, 'rest_time']}
                                                                                        rules={[
                                                                                            { required: true, message: 'Rest time is required' },
                                                                                        ]}
                                                                                    >
                                                                                        <Input type="number" placeholder="Rest time" min={0} />
                                                                                    </Form.Item>
                                                                                </Tooltip>
                                                                                <CloseOutlined onClick={() => subOpt.remove(subField.name)} />
                                                                            </Space>
                                                                        </div>
                                                                    ))}
                                                                    <Button type="dashed" onClick={() => subOpt.add()} block>
                                                                        + Add Cron
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </Form.List>
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Card>
                                    ))}
                                    <Form.Item
                                        label="&nbsp;"
                                        name="btn-submit"
                                    >
                                        <Button type="dashed" onClick={() => {
                                            setScrollToBottomState(!scrollToBottomState)
                                            return add()
                                        }} block>
                                            + Add Stream
                                        </Button>

                                    </Form.Item>
                                </div>
                            )}
                        </Form.List>
                    </Form>


                    <Table dataSource={dataSource} columns={columns} />;
                </div>
            </Modal>
        </>
    );
};

export default App;

