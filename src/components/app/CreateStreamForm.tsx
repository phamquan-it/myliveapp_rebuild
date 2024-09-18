import { Button, Form, Input, Select, Image, DatePicker, message, Alert, Space, Switch } from 'antd';
import React, { useState } from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import { getCookie } from 'cookies-next';
import { convertGoogleDriveLinkToDownload } from '@/utils/driveLinkConverter';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;

interface CreateStreamFormProps {
    setStreamData: any;
}

// Helper hook for checking links
const useCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');

    return useMutation({
        mutationKey: ['checklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/autolive-control/get-video-metadata', {
                params: { source_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            const resolution = `${res.data[0].width}x${res.data[0].height}`;
            setLinkState(true);
            form.setFieldsValue({ resolution });
        },
        onError: () => {
            setLinkState(false);
            form.setFieldsValue({ resolution: '' });
        },
    });
};

const CreateStreamForm: React.FC<CreateStreamFormProps> = ({ setStreamData }) => {
    const [linkState, setLinkState] = useState(false);
    const [form] = Form.useForm();
    const { data } = usePlatformData();
    const checkLink = useCheckLink(form, setLinkState);

    // Form submission logic
    const onFinish = (values: any) => {
        console.log(values);
        if (values.platforms.length != 0)
            setStreamData((prevData: any) => [...prevData, values]);
    };

    const [userCron, setUserCron] = useState(false)
    const handleCron = () => {
        setUserCron(!userCron)
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            {/* Drive link input */}
            <Form.Item
                label="Drive link"
                name="drive_link"
                rules={[{ required: true, message: 'Please input your driver link!', type: "url" }]}
            >
                <Input
                    onBlur={(e: any) =>
                        checkLink.mutate(convertGoogleDriveLinkToDownload(e.target.value))
                    }
                />
            </Form.Item>

            {/* Link validation status */}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Alert
                    type={linkState ? 'info' : 'error'}
                    message={linkState ? 'Link ok' : 'Invalid link'}
                />
            </Form.Item>

            {/* Resolution display */}
            <Form.Item
                label="Resolution"
                name="resolution"
                rules={[{ required: true, message: 'Invalid resolution!' }]}
            >
                <Input readOnly disabled />
            </Form.Item>

            {/* Stream name input */}
            <Form.Item
                label="Stream name"
                name="stream_name"
                rules={[{ required: true, message: 'Please input your stream name!' }]}
            >
                <Input />
            </Form.Item>

            {/* Platforms selection */}


            <div style={{ display: 'grid', gridTemplateColumns: '8fr 16fr', gap: '16px', maxWidth: '600px' }}>
                <div style={{ gridColumn: 'span 1', padding: '8px' }}>
                </div>
                <div style={{ gridColumn: 'span 1', backgroundColor: '#ffffff', padding: '3px' }}>

                    <Form.List name="platforms">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{ display: 'flex', marginBottom: 8, alignItems: 'center' }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'platform']}
                                            rules={[{ required: true, message: 'Please select platform' }]}
                                        >
                                            <Select style={{
                                                width: 200
                                            }}
                                                options={data?.data?.platforms.map((platform: any) => ({
                                                    ...platform,
                                                    label: (
                                                        <div className="flex items-center gap-1">
                                                            <Image width={20} src={platform.image} alt="image" />
                                                            {platform?.name}
                                                        </div>
                                                    ),
                                                    value: platform.id,
                                                }))}
                                            />

                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'stream_key']}
                                            rules={[{ required: true, message: 'Please enter stream key' }]}
                                        >
                                            <Input placeholder="Stream key" style={{
                                                width: 167
                                            }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add platform
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>


                </div>
            </div>
            {/* Live time selection */}
            <Form.Item
                label="Cron"
            >
                <Switch defaultChecked onChange={handleCron} />
            </Form.Item>
            <Form.Item label="Live time" name="live_time">
                <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8 }}>
                <div>

                </div>
            </Form.Item>
        </Form>
    );
};

export default CreateStreamForm;

