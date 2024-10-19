import { Button, Form, Input, Select, Image, DatePicker, message, Alert, Space, Switch, Radio, RadioChangeEvent } from 'antd';
import React, { useState } from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import { getCookie } from 'cookies-next';
import { convertGoogleDriveLinkToDownload, getGoogleDriveKey } from '@/utils/driveLinkConverter';
import { GoogleOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import FormListLink from './FormListLink';
import { useTranslations } from 'next-intl';
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaGoogleDrive, FaRegCheckCircle } from 'react-icons/fa';

const { RangePicker } = DatePicker;

interface CreateStreamFormProps {
    setStreamData: any;
    vps: any
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

const useGoogleDriveCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');

    return useMutation({
        mutationKey: ['googledrivechecklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/autolive-control/get-google-drive-video-metadata', {
                params: { source_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            const { width, height } = res.data?.videoMediaMetadata
            const resolution = `${width}x${height}`;
            setLinkState(true);
            form.setFieldsValue({ resolution });
        },
        onError: (err) => {
            setLinkState(false);
            form.setFieldsValue({ resolution: '' });
        },
    });
};

const useYoutubeCheckLink = (form: any, setLinkState: React.Dispatch<React.SetStateAction<boolean>>) => {
    const token = getCookie('token');
    return useMutation({
        mutationKey: ['youtubechecklink'],
        mutationFn: (data: any) =>
            axiosInstance.get('/youtubedl', {
                params: { youtube_link: data },
                headers: { Authorization: `Bearer ${token}` },
            }),
        onSuccess: (res) => {
            setLinkState(true);
            console.log(res.data)
        },
        onError: (err) => {
            setLinkState(false);
            console.error(err.message)
        },
    });
};


const CreateStreamForm: React.FC<CreateStreamFormProps> = ({ setStreamData, vps }) => {

    const [linkState, setLinkState] = useState(false);
    const [form] = Form.useForm();
    const { data } = usePlatformData();
    const checkLink = useCheckLink(form, setLinkState);
    const googleCheckLink = useGoogleDriveCheckLink(form, setLinkState)
    const youtubeCheckLink = useYoutubeCheckLink(form, setLinkState)

    // Form submission logic
    const onFinish = (values: any) => {
        console.log(values);
        if (values.platforms.length != 0)
            setStreamData((prevData: any) => [...prevData, values]);
    };

    const [userCron, setUserCron] = useState(false)
    const [isYoutubeLink, setIsYoutubeLink] = useState(true)
    const handleCron = () => {
        setUserCron(!userCron)
    }


    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const t = useTranslations('MyLanguage')

    console.log(youtubeCheckLink?.data?.data)
    return (
        <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 18 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            {/* Drive link input */}

            <Form.Item
                label="Vps"
                name="vpsId"
                rules={[{ required: true }]}
            >
                <Select options={vps.data.map((vp: any) => ({ ...vp, value: vp.vps_vps_provider, label: `${vp.name} - ${vp.vps_vps_provider}` }))} />
            </Form.Item>
            <Form.Item
                label={t('drive_link')}
                name="drive_link"
                validateStatus={(linkState) ? 'success' : 'error'}
                rules={[{ required: true, type: "url" }]}
            >
                <Input
                    onBlur={(e: any) => {
                        youtubeCheckLink.mutate(e.target.value)
                    }}
                    prefix={(linkState) ? <FaRegCheckCircle style={{
                        color: 'green'
                    }} /> : <MdOutlineErrorOutline />}
                    addonAfter={<Image src="https://cdn-icons-png.flaticon.com/128/5968/5968523.png" width={25} alt="" preview={false} />}
                />
            </Form.Item>
            {/* Resolution display */}
            <Form.Item
                label={t('resolution')}
                name="resolution"
                rules={[{ required: true }]}
            >
                {isYoutubeLink
                    ? <Select options={youtubeCheckLink.data?.data.map((youtube: any)=>({ label: youtube.format, value: youtube.url }))}/>
                    : <Input readOnly disabled />
                }
            </Form.Item>

            {/* Stream name input */}
            <Form.Item
                label={t('stream_name')}
                name="stream_name"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>

            {/* Platforms selection */}


            <div style={{ display: 'grid', gridTemplateColumns: '4fr 18fr', gap: '16px' }}>
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
                                            rules={[{ required: true }]}
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
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Stream key" style={{
                                                width: "360px"
                                            }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        {t('add_platform')}
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                </div>
            </div>

            <Form.Item
                label={t('schedule')}
            >
                <Switch defaultChecked onChange={handleCron} />
            </Form.Item>
            <Form.Item label={t('live_time')} name="live_time" className={userCron ? 'hidden' : ''}>
                <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={[t('start_time'), t('endtime')]} />
            </Form.Item>

            <Form.Item
                label={t('loop')} name='loop' initialValue={'only'} rules={[
                    {
                        required: true
                    }
                ]}
            >
                <Radio.Group>
                    <Radio value='infinity'>{t('infinity')}</Radio>
                    <Radio value='only'>{t('only')}</Radio>
                </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                <div className='flex gap-2'>
                    <Button type="primary" htmlType='submit'>{t('add')}</Button>
                    <Button type="default" htmlType='reset'>{t('reset')}</Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default CreateStreamForm;

