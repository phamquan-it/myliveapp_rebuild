import { MinusCircleOutlined, PlusCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Modal, Select, Space } from 'antd';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import SelectProfile from '../admin/vps/select-profile';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';

const AddVpsConfig = () => {
    const profilesSlug = useQuery({
        queryKey: ['ProfileSlug', location], queryFn: () => axiosInstance.get(
            "/vps-provider/get-profile-for-create-vps", {
            params: {
                locationId: 'dk'
            }
        })
    });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    type FieldType = {
        name?: string;
        ram?: string;
        cpu?: string;
        cores?: string;
        gpu?: string;
        diskpace?: string;
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const t = useTranslations('MyLanguage')
    return <>
        <Button type="primary" onClick={() => {
            setIsModalOpen(true)
        }} icon={<PlusCircleFilled />}>{t('add_config')}</Button>

        <Modal title={t('add_config')} width='1000px' open={isModalOpen} onCancel={handleCancel}>

            <Form
                layout='horizontal'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <SelectProfile profiles={profilesSlug?.data?.data?.profiles} onSelectProfileChange={(value: any) => {
                    console.log(value)
                }} />
                <Form.Item className='py-3'
                    label="Config"
                    name="config"
                    
                >
                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'resolution']}
                                            rules={[{ required: true }]}
                                        >
                                            <Select style={{
                                                width: 200
                                            }} options={[
                                                { value: 'hd', label: <span>HD</span> },
                                                { value: 'fhd', label: <span>Full HD</span> },
                                                { value: '2k', label: <span>2K</span> },
                                                { value: '4k', label: <span>4K</span> },
                                                { value: '8k', label: <span>8K</span> },

                                            ]} allowClear
                                                placeholder='Select resolution'
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'last']}
                                            rules={[{ required: true, message: 'Missing last name' }]}
                                        >
                                            <Input placeholder="Maximum num streams" />
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
            </Form>
        </Modal>
    </>
}

export default AddVpsConfig
