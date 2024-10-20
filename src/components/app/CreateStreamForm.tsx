import { Button, Form, Input, Select, Image, DatePicker, message, Alert, Space, Switch, Radio, RadioChangeEvent, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import { getCookie } from 'cookies-next';
import { convertGoogleDriveLinkToDownload, getGoogleDriveKey } from '@/utils/driveLinkConverter';
import { GoogleOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import FormListLink from './FormListLink';
import { useTranslations } from 'next-intl';
import { MdOutlineErrorOutline } from "react-icons/md";
import { FaGoogleDrive, FaRegCheckCircle } from 'react-icons/fa';
import moment from 'moment';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useCheckLink, useGoogleDriveCheckLink, useYoutubeCheckLink } from '@/apiClient/providers/streams';

const { RangePicker } = DatePicker;

interface CreateStreamFormProps {
    setStreamData: any;
    vps: any
}

// Helper hook for checking links
dayjs.extend(utc);
dayjs.extend(timezone);

const CreateStreamForm: React.FC<CreateStreamFormProps> = ({ setStreamData, vps }) => {
    const [sourceLink, setSourceLink] = useState('google_drive')
    const [linkState, setLinkState] = useState(false);
    const [form] = Form.useForm();
    const { data } = usePlatformData();
    const checkLink = useCheckLink(form, setLinkState);
    const googleCheckLink = useGoogleDriveCheckLink(form, setLinkState)
    const youtubeCheckLink = useYoutubeCheckLink(form, setLinkState)

    // Form submission logic
    const onFinish = (values: any) => {
        const currentDate = new Date();
        const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
        const timezoneOffsetInHours = -(timezoneOffsetInMinutes / 60);
        if (values.live_time != undefined) {
            const start_time = moment(values.live_time[0].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
            const end_time = moment(values.live_time[1].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
            values.start_time = start_time;
            values.end_time = end_time;
        }
        values.platforms.map((platform: any) => {
            values.platformId = platform.platform;
            setStreamData((prevData: any) => [{ ...values, platforms: [platform], ...platform }, ...prevData])
        });
    };

    const [userCron, setUserCron] = useState(false)

    const handleCron = () => {
        setUserCron(!userCron)
    }

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    const t = useTranslations('MyLanguage')
    useEffect(() => {
        if (sourceLink == 'upload') {
            setLinkState(true)
        }
    }, [sourceLink])
    const getLabel = () => {
        switch (sourceLink) {
            case 'google_drive':
                return 'Drive link'
            case 'youtube':
                return 'Youtube link'
            case 'upload':
                return 'Upload file';
            default:
                return 'Default download'
        }
    }

    const handleChange = (info: any) => {
        const { file } = info;
        if (file.status === 'removed') return; // Ignore if the file is removed

        const isVideo = file.type.startsWith('video/');
        if (!isVideo) {
            message.error('You can only upload video files!');
            return;
        }

        const video = document.createElement('video');
        const objectURL = URL.createObjectURL(file.originFileObj);

        video.src = objectURL;

        video.onloadedmetadata = () => {
            const width = video.videoWidth;
            const height = video.videoHeight;

            // Set the resolution state (optional)
            console.log(width, height)
            const resolution = `${width}x${height}`;
            setLinkState(true);
            form.setFieldsValue({ resolution });
            // Check the resolution (for example: 1280x720)
            URL.revokeObjectURL(objectURL); // Clean up
        };
    };
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
                <Select options={vps?.data.map((vp: any) => ({ ...vp, value: vp.vps_vps_provider, label: `${vp.name} - ${vp.vps_vps_provider}` }))} />
            </Form.Item>
            <Form.Item
                label={`${getLabel()}`}
                name="drive_link"
                validateStatus={(linkState) ? 'success' : 'error'}
                rules={[{ required: true, type: "url" }]}
            >
                <Input disabled={sourceLink == 'upload'}
                    onBlur={(e: any) => {
                        switch (sourceLink) {
                            case 'youtube':
                                youtubeCheckLink.mutate(e.target.value)
                                break;
                            case 'google_drive':
                                googleCheckLink.mutate(getGoogleDriveKey(e.target.value))
                                break;
                            case 'upload':
                                setLinkState(true);
                                break;
                            default:
                                checkLink.mutate(e.target.value)
                        }
                    }}
                    prefix={(linkState) ? <FaRegCheckCircle style={{
                        color: 'green'
                    }} /> : <MdOutlineErrorOutline />}
                    addonAfter={
                        <>
                            <Select style={{
                                width: 70
                            }} options={[
                                {
                                    value: 'google_drive',
                                    label: <div className='flex items-center'>
                                        <Image src="https://cdn-icons-png.flaticon.com/128/5968/5968523.png" width={20} alt="" preview={false} />
                                    </div>
                                },
                                {
                                    value: 'youtube',
                                    label: <div className='flex items-center'>
                                        <Image src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={20} alt="" preview={false} />
                                    </div>
                                },
                                {
                                    value: 'default_download',
                                    label: <div className='flex items-center'>
                                        <Image src="https://cdn-icons-png.flaticon.com/128/9502/9502265.png" width={20} alt="" preview={false} />
                                    </div>
                                },
                                {
                                    value: 'upload',
                                    label: <div className='flex items-center'>
                                        <Image src="https://cdn-icons-png.flaticon.com/128/10024/10024248.png" width={20} alt="" preview={false} />
                                    </div>
                                }
                            ]}
                                onChange={(e: string) => {
                                    setSourceLink(e)
                                    setLinkState(false)
                                }}
                                value={sourceLink} />
                        </>
                    }
                />
            </Form.Item>
            {sourceLink == 'upload' ? <>
                <Form.Item
                    wrapperCol={{ offset: 4, span: 20 }}
                    rules={[{ required: true }]}
                >
                    <Upload onChange={handleChange} >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

            </> : <></>}
            {/* Resolution display */}
            <Form.Item
                label={t('resolution')}
                name="resolution"
                rules={[{ required: true }]}
            >
                {(sourceLink == 'youtube')
                    ? <Select options={youtubeCheckLink.data?.data.map((youtube: any) => ({ label: youtube.format, value: youtube.url }))} />
                    : <Input readOnly disabled />
                }
            </Form.Item>
            {/* Platforms selection */}
            <Form.Item
                wrapperCol={{ offset: 4, span: 20 }}
                rules={[{ required: true }]}
            >
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
                                        <Input placeholder="Stream key" />
                                    </Form.Item>
                                    <Form.Item
                                        name={[name, 'stream_name']}
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Stream name" />
                                    </Form.Item>

                                    <MinusCircleOutlined className='-translate-y-1' onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()} icon={<PlusOutlined />}>
                                    {t('add_platform')}
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
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

