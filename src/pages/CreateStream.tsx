import React, { useRef, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Select, SelectProps, Space, Switch, Tooltip } from 'antd';
import { FormInstance } from 'antd/lib';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';

const { RangePicker } = DatePicker;
const App: React.FC = () => {
    const formRef = useRef<FormInstance<any> | null>(null);

    // Step 3: Function to scroll to bottom
    const scrollToBottom = () => {
        if (formRef.current) {
            // Get the form DOM element
            const formElement = formRef.current.getFieldsValue();
            console.log(formElement)
            console.log(formElement.items[0].name)
            formRef.current.scrollToField('drive_link', {
                scrollMode: "always",
                behavior: "smooth",
                skipOverflowHiddenElements: false,

            })
            // Use querySelector to get the last input element within the form

        }
    };

    const [form] = Form.useForm();
    const [isStreamNow, setIsStreamNow] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        form.submit()
    }
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    // Handle form submission
    const onFinish = (values: any) => {
        console.log('Form Values:', values);

    };

    const {data} = usePlatformData();

    return (
        <>
            <Button type="primary" onClick={() => {
                setIsModalOpen(true)
            }}>Show  modal</Button>
            <Modal title="Create stream" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    name="dynamic_form_complex"
                    style={{
                        maxHeight: 500,
                        overflowY: "auto",
                        maxWidth: 600,
                        paddingRight: 5
                    }}
                    className="scrollable-div"
                    autoComplete="off"
                    initialValues={{ items: [{}] }}
                    onFinish={onFinish}
                    ref={formRef}
                >
                    <Form.Item
                        label="Stream now"
                        name="stream_now"
                    >
                        <Switch onChange={(value) => {
                            setIsStreamNow(value)
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="Drive link"
                        name="drive_link"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                {fields.map((field) => (
                                    <Card
                                        size="small"
                                        id="card-stream"
                                        title={(
                                            <>
                                                <Form.Item id="create-stream"

                                                    initialValue={`Stream ${field.name + 1}`} name={[field.name, 'name']}>
                                                    <Input readOnly style={{
                                                        width: 300,
                                                        border: "none"
                                                    }} />
                                                </Form.Item>
                                            </>
                                        )}
                                        key={field.key}
                                        extra={
                                            <CloseOutlined
                                                onClick={() => {
                                                    if(fields.length > 1)
                                                    remove(field.name);
                                                }}
                                            />
                                        }
                                    >
                                        <Form.Item label="Name" initialValue={`Stream ${field.name + 1}`} style={{ width: 435 }} name={[field.name, 'name']} rules={[{ required: true, message: 'Name is required' }]}>
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Platform"
                                            name={[field.name, 'platform']}
                                            rules={[{ required: true }]}
                                        >
                                            <Select options={
                                            data?.data?.platforms
                                            .map((platform:any)=> ({
                                                label: platform.name,
                                                value: platform.id
                                            }))} />
                                        </Form.Item>
                                        <Form.Item
                                            label="Stream key"
                                            name={[field.name, 'streamkey']}
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        {/* Nested Form.List */}
                                        {(isStreamNow) ? <></> : (
                                            <>
                                                <Form.Item label="Cron">
                                                    <Form.List name={[field.name, 'list']}>
                                                        {(subFields, subOpt) => (
                                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                                {subFields.map((subField) => (
                                                                    <div>
                                                                        <Space key={subField.key} align="baseline">
                                                                            <Form.Item name={[subField.name, 'end_time']} rules={[
                                                                                { required: true, message: 'Second is required' },
                                                                            ]}>

                                                                                <RangePicker showTime />
                                                                            </Form.Item>
                                                                            <Tooltip title="Rest time: minus">
                                                                                <Form.Item name={[subField.name, 'rest_time']} rules={[
                                                                                    { required: true, message: 'Rest time is required' },
                                                                                ]}>
                                                                                    <Input type="number" placeholder="Rest time" minLength={1} min={0} />
                                                                                </Form.Item>
                                                                            </Tooltip>
                                                                            <CloseOutlined
                                                                                onClick={() => {
                                                                                    subOpt.remove(subField.name);
                                                                                }}
                                                                            />
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
                                <Button type="dashed" onClick={() => {
                                    add()
                                }} block>
                                    + Add Stream
                                </Button>
                            </div>
                        )}
                    </Form.List>



                </Form>
            </Modal>
        </>
    );
};

export default App;

