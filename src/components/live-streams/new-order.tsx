import axiosInstance from '@/apiClient/axiosConfig';
import { useCheckLink, useGoogleDriveCheckLink, useYoutubeCheckLink } from '@/apiClient/providers/streams';
import PlatformSelect from '@/components/admin/PlatformSelect';
import { CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Checkbox, DatePicker, Form, FormProps, Input, Select, Space, Table, Upload, UploadProps, Image, message } from 'antd';
import form from 'antd/es/form';
import Title from 'antd/lib/typography/Title';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { usePlatformData } from './CreateStreamByAdmin';
import { SourceLink } from '@/enums/SourceLink';
import moment from 'moment';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { getGoogleDriveKey } from '@/utils/driveLinkConverter';
import { getManifestUrl, getManifestUrls, getMaxResolutionFormat } from '@/helpers/youtubefilterlink';
import { StreamType } from '@/@type/CreateStreamType';
import { RcFile } from 'antd/lib/upload';
import { handleUploadFile } from '../../../handleUploadFile';
import { getVideoProperties } from '@/helpers/getVideoInfo';
import { useExchangeRate } from '@/apiClient/providers/exchangeRate';
import { useRouter } from 'next/router';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

interface NewOrderProps {
    role?: number
}
const NewOrder: React.FC<NewOrderProps> = ({ role }) => {
    const queryClient = useQueryClient()
    const [videoInfo, setVideoInfo] = useState({
        resolution: '',
        duration: '',
        ext: '',
        size: ''
    })
    const [fileList, setFileList] = useState<RcFile[]>([]);

    const [isUploading, setIsUploading] = useState(false)
    const [linkState, setLinkState] = useState(false)
    const checkLink = useCheckLink(form, setLinkState);
    const googleCheckLink = useGoogleDriveCheckLink(form, setLinkState)
    const youtubeCheckLink = useYoutubeCheckLink(form, setLinkState)
    const { data, isFetching } = useQuery({
        queryKey: ['queryKey'],
        queryFn: () => axiosInstance.get<any>('vps-provider/getvps', {
            params: {
                language: "en"
            }
        })
    });

    const t = useTranslations("MyLanguage")
    const [useCron, setUseCron] = useState(true)
    const [loop, setLoop] = useState(true)
    const onFinishFailed: FormProps<StreamType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const props: UploadProps = {
        accept: ".mp4",
        maxCount: 1,
        onRemove: (file: any) => {
            setVideoInfo({
                duration: '',
                ext: '',
                resolution: '',
                size: ''
            })
            setFileList((prevFileList) => {
                const index = prevFileList.indexOf(file);
                const newFileList = prevFileList.slice();
                newFileList.splice(index, 1);
                return newFileList;
            });
        },
        beforeUpload: async (file: RcFile) => {
            const { width, height, duration } = await getVideoProperties(file);
            const resolution = `${width}x${height}`;
            setVideoInfo({
                duration: duration + '',
                resolution,
                ext: file.type,
                size: file.size + ''
            })
            try {
                setLinkState(true);
            } catch (error) {
                console.error('Error getting video resolution:', error);
            }
            if (fileList.length < 1) {
                setFileList([...fileList, file]);
            }
            return false; // Prevent automatic upload by Ant Design
        },
        onChange: () => { },
        fileList,
    };

    const uploadProps: UploadProps = {
        directory: false, // Allows folder selection
        beforeUpload: (file: any) => {
            const isMp4OrMov = file.type === 'video/mp4' || file.type === 'video/quicktime';
            if (!isMp4OrMov) {
                alert('You can only upload MP4 or MOV files!');
            }
            return isMp4OrMov || Upload.LIST_IGNORE;
        },
    };
    const router = useRouter()
    const createStreamMutation = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (data: StreamType) =>
            axiosInstance.post('/autolive-control/create-new-stream', { ...data, resolution: videoInfo.resolution + '', duration: videoInfo.duration + '' }),
        onSuccess: () => {
            message.success("OK")
            queryClient.invalidateQueries({ queryKey: ['activityStream'] })
        },
        onError: (err) => {
            message.error("Err")
        }
    })

    const onFinish: FormProps<StreamType>['onFinish'] = async (values) => {

        values.download_on = sourceLink;
        const currentDate = new Date();
        const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
        const timezoneOffsetInHours = -(timezoneOffsetInMinutes / 60);
        values.loop = (loop) ? "infinity" : "only"
        if (values.schedule != undefined && useCron) {
            const start_time = moment(values.schedule[0].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
            const end_time = moment(values.schedule[1].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
            values.startTime = start_time;
            values.endTime = end_time;
        }
        switch (sourceLink) {
            case SourceLink.GOOGLE_DRIVE:
                values.source_link = getGoogleDriveKey(values.source_link + '') + ''
                break;
            case SourceLink.YOUTUBE:
                values.source_link = values.source_link;
                break
            case SourceLink.UPLOAD:
                console.log(values)
                const key = await customUploadFile(fileList, (isUploading: boolean) => {
                    setIsUploading(isUploading)
                    console.log(`Uploading: ${isUploading}`);
                });
                values.source_link = key + ''
                break;
        }
        console.log(values)
        await createStreamMutation.mutate(values)
        console.log('Success:', values);
    };
    useEffect(() => {
        const maxResolutionFormat = getMaxResolutionFormat(youtubeCheckLink?.data?.data);
        const manifestUrl: any = getManifestUrl(youtubeCheckLink?.data?.data);
        console.log(manifestUrl)
        console.log(maxResolutionFormat)
        setVideoInfo({
            resolution: `${maxResolutionFormat?.width ?? ''} x ${maxResolutionFormat?.height ?? ''}`,
            duration: 'Unknown',
            size: maxResolutionFormat?.filesize,
            ext: maxResolutionFormat?.ext
        })
    }, [youtubeCheckLink.data])

    useEffect(() => {
        const videoData = googleCheckLink?.data?.data

        console.log(
            videoData
        )
        setVideoInfo({
            duration: videoData?.videoMediaMetadata?.durationMillis,
            resolution: `${videoData?.videoMediaMetadata?.width ?? ''}x${videoData?.videoMediaMetadata?.height ?? ''}`,
            ext: videoData?.mimeType,
            size: videoData?.size,
        })
    }, [googleCheckLink.data])

    useEffect(() => {
        const vidInfo = checkLink.data?.data[0]
        console.log(
            checkLink.data?.data[1]
        )
        setVideoInfo({
            duration: vidInfo?.duration ?? '',
            ext: "",
            resolution: `${vidInfo?.width ?? ''}x${vidInfo?.height ?? ''}`,
            size: ""
        })
    }, [checkLink.data])

    const p = useTranslations("Placeholder")
    const exchangeQuery = useExchangeRate()
    const platformquery = usePlatformData();
    const [sourceLink, setSourceLink] = useState(SourceLink.GOOGLE_DRIVE)

    console.log(exchangeQuery?.data?.data?.conversion_rate / 1000, "exchange")

    const [selectedRange, setSelectedRange] = useState<any>(null);

    const handleNowClick = () => {
        const now = dayjs();
        setSelectedRange([now, now]);
    };
    return <div className="h-full">
        <div className="grid lg:grid-cols-3 h-full gap-3">
            <div className="col-span-2 row-span-1">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 1000 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelAlign="left"
                >
                    {role == 1 ? '' :
                        <Form.Item<StreamType>
                            label="Vps"
                            name="vpsId"
                            rules={[{ required: true }]}
                        >
                            <Select options={data?.data.map((vp: any) => ({ ...vp, value: vp.vps_vps_provider, label: `${vp.name} - ${vp.vps_vps_provider}` }))} />
                        </Form.Item>
                    }
                    <Form.Item<StreamType>
                        label={t('source_link')}
                        name="source_link"
                        validateStatus={linkState ? "success" : "error"}
                        rules={[{ required: sourceLink != "gcloud" }]}
                    >
                        <Input prefix={
                            linkState ? <CheckCircleOutlined style={{
                                color: "green"
                            }} /> : <MdOutlineErrorOutline style={{ color: "red" }} />
                        } addonAfter={<Select loading={googleCheckLink.isPending || youtubeCheckLink.isPending || checkLink.isPending} className="!w-40" value={sourceLink} options={
                            sourceOptions

                        }

                            onChange={(e) => {
                                setSourceLink(e)
                                if (e == SourceLink.UPLOAD) {
                                    setLinkState(true)
                                } else setLinkState(false)
                            }} />}
                            onBlur={(e: any) => {
                                switch (sourceLink) {
                                    case SourceLink.GOOGLE_DRIVE:
                                        googleCheckLink.mutate(getGoogleDriveKey(e.target.value))
                                        break;
                                    case SourceLink.YOUTUBE:
                                        youtubeCheckLink.mutate(e.target.value)
                                        break;
                                    case SourceLink.DOWNLOAD_LINK:
                                        checkLink.mutate(e.target.value)
                                        break;
                                }

                            }}
                        />
                    </Form.Item>

                    {
                        (sourceLink == 'gcloud') ?
                            <>
                                <div className="mt-2">
                                    <Form.Item
                                        name="file"
                                        wrapperCol={{ offset: 4, span: 20 }}
                                    >
                                        <Upload {...props}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>

                                </div>
                            </> : <></>
                    }
                    <Form.Item wrapperCol={{
                        sm: { offset: 4, span: 20 }
                    }}>
                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item<StreamType>
                                name="platformId"
                                rules={[{ required: true }]}
                            >
                                <Select options={platformquery.data?.data?.platforms.map((platform: any) => ({
                                    ...platform,
                                    label: (
                                        <div className="flex items-center gap-1">
                                            <Image width={20} src={platform.image} alt="image" />
                                            {platform?.name}
                                        </div>
                                    ),
                                    value: platform.id,
                                }))}
                                    placeholder={p("selectplatform")}
                                />
                            </Form.Item>
                            <Form.Item<StreamType>
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder={t('stream_name')} />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item<StreamType>
                        label={t('stream_key')}
                        name="key"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            sm: { offset: 4, span: 20 }
                        }}
                        rules={[{ required: true }]}>
                        <Space>
                            <Form.Item<StreamType>
                                name="loop"
                            >
                                <Checkbox checked={loop} onChange={() => {
                                    setLoop(!loop)
                                }}>{t('loop')}</Checkbox>
                            </Form.Item>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            sm: { offset: 4, span: 20 }
                        }}
                        rules={[{ required: useCron }]}>
                        <Space>

                            <Form.Item
                                wrapperCol={{
                                    sm: { offset: 0, span: 24 }
                                }}
                                name={useCron ? "schedule" : ""}
                                rules={[{ required: useCron }]}
                            >
                                <RangePicker
                                    disabled={useCron == false} placement="topRight"
                                    disabledDate={disabledDate}
                                    disabledTime={disabledTime}
                                    value={selectedRange}
                                    showTime={{ format: 'HH:mm' }} type="week" format="YYYY-MM-DD HH:mm" placeholder={[t('start_time'), t('endtime')]} />
                            </Form.Item>
                            <Form.Item
                                name="schedule"
                            >
                                <Checkbox checked={useCron} onChange={(e) => {
                                    setUseCron(!useCron)
                                }} value="loop">{t('schedule')}</Checkbox>
                            </Form.Item>

                        </Space>
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        sm: { offset: 4, span: 20 }
                    }}>
                        <div className="flex gap-2">
                            <Button type="primary" htmlType="submit" loading={createStreamMutation.isPending || isUploading}>
                                {t('create_stream')}
                            </Button>
                            <Button htmlType="reset">
                                {t('reset')}
                            </Button>
                            <Form.Item>
                                {isUploading ? "Uploading..." : ''}
                            </Form.Item>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div className="grid grid-rows-2 gap-3">
                <Table showHeader={false} dataSource={[
                    { name: t('resolution'), value: videoInfo.resolution },
                    { name: t('file_size'), value: videoInfo.size },
                    { name: t('duration'), value: videoInfo.duration },
                    { name: t('extention'), value: videoInfo.ext }
                ]} columns={columns} pagination={false} />
                <Table showHeader={false} dataSource={[
                    {
                        key: '1',
                        name: 'Price',
                        value: `$32`,
                    },
                    {
                        key: '2',
                        name: 'Exchange rate',
                        value: exchangeQuery?.data?.data?.conversion_rate / 1000,
                    },
                    {
                        key: '3',
                        name: 'Total(VND)',
                        value: 42,
                    },
                ]} columns={columns} pagination={false} />
            </div>
        </div>
    </div>
}
export default NewOrder
const sourceOptions = [
    {
        value: SourceLink.GOOGLE_DRIVE,
        label: <div className='flex items-center gap-2'>
            <Image src="https://cdn-icons-png.flaticon.com/128/5968/5968523.png" width={20} alt="" preview={false} /> GG Drive
        </div>
    },
    {
        value: SourceLink.YOUTUBE,
        label: <div className='flex items-center gap-2'>
            <Image src="https://cdn-icons-png.flaticon.com/128/174/174883.png" width={20} alt="" preview={false} /> Youtube
        </div>
    },
    {
        value: SourceLink.DOWNLOAD_LINK,
        label: <div className='flex items-center gap-2'>
            <Image src="https://cdn-icons-png.flaticon.com/128/9502/9502265.png" width={20} alt="" preview={false} /> Download link
        </div>
    },
    {
        value: SourceLink.UPLOAD,
        label: <div className='flex items-center gap-2'>
            <Image src="https://cdn-icons-png.flaticon.com/128/10024/10024248.png" width={20} alt="" preview={false} /> Upload video
        </div>
    }

]


const columns: ColumnsType<any> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'value',
        dataIndex: 'value',
        key: 'value',
        align: "right"
    },
];

export const customUploadFile = async (fileList: any, setUploading: any) => {
    if (fileList.length === 0) {
        message.error('No file selected');
        return;
    }

    const file = fileList[0]; // Taking the first file

    setUploading(true);

    try {
        const response = await handleUploadFile(file, '/video-uploads');
        if (response.key) {
            message.success('Upload successful!');
            return response.key
        } else {
            message.error('Upload failed');
        }
    } catch (error) {
        message.error('Error uploading video');
    } finally {
        setUploading(false);
    }
}


const disabledDate = (current: any) => {
    // Disable dates before today
    return current && current.isBefore(dayjs().startOf('day'));
};

const disabledTime = (date: any, type: any) => {
    const now = dayjs();
    if (!date) return {};

    const isToday = date.isSame(now, 'day');

    return {
        disabledHours: () => {
            const hours = [];
            for (let i = 0; i < 24; i++) {
                if (isToday && i < now.hour()) hours.push(i);
            }
            return hours;
        },
        disabledMinutes: (selectedHour: any) => {
            const minutes = [];
            if (isToday && selectedHour === now.hour()) {
                for (let i = 0; i < 60; i++) {
                    if (i < now.minute()) minutes.push(i);
                }
            }
            return minutes;
        },
    };
};
