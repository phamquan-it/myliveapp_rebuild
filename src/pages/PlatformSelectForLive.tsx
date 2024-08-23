import React from 'react';
import { MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Cascader, Form, Input, Select, Space } from 'antd';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const App: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Received values of form:', values);
    };

    const {data} = usePlatformData();
    const selectBefore = (
        <Select placeholder="Select platform" options={data?.data?.platforms
            .map((platform:any)=>({
                ...platform, 
                label: platform.name, 
                value: platform.id
            }))} style={{
            width: 150
            }}/>
    );

    return (
        <Form
            name="dynamic_form_item"
            {...formItemLayoutWithOutLabel}
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.List
                name="names"
                rules={[
                    {
                        validator: async (_, names) => {
                            if (!names || names.length < 1) {
                                return Promise.reject(new Error('At least 1 platform'));
                            }
                        },
                    },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                    <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Platforms' : ''}
                                required={false}
                                key={field.key}
                            >

                                <Space direction="vertical">
                                    <Input addonBefore={selectBefore} addonAfter={<MinusCircleOutlined
                                        className="dynamic-delete-button me-2"
                                        onClick={() => remove(field.name)}
                                    />
                                    } placeholder="Your rmtp key" />
                                </Space>
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                style={{ width: '60%' }}
                                icon={<PlusOutlined />}
                            >
                                Add field
                            </Button>

                            <Form.ErrorList errors={errors} />
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default App;
