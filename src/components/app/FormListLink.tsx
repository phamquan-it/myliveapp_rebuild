import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React from 'react';
interface FormListLinkProps {

}

const FormListLink: React.FC<FormListLinkProps> = () => {

    return <>
        <Form.Item label="Link video" rules={[{required: true}]} name='linkvideo'>
            <Form.List name="users">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'link_type']}
                                    rules={[{ required: true, message: 'Missing first name' }]}
                                >
                                    <Select style={{
                                        width: 180
                                        }} options={[
                                        {
                                            label: "Google drive",
                                            value: '1',
                                        },
                                        {
                                            label: "Download link",
                                            value: '2',
                                        },
                                        {
                                            label: "Youtube link",
                                            value: '3',
                                        }
                                    ]} placeholder="Select link" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'last']}
                                    rules={[{ required: true, message: 'Missing last name' }]}
                                >
                                    <Input placeholder="Your link" />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} />
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add field
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </Form.Item>
    </>
}

export default FormListLink
