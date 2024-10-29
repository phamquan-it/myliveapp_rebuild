import axiosInstance from '@/apiClient/axiosConfig';
import { useCheckLink, useGoogleDriveCheckLink, useYoutubeCheckLink } from '@/apiClient/providers/streams';
import PlatformSelect from '@/components/admin/PlatformSelect';
import { CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { customUploadFile } from '@/pages/uploadvideotest';
const { RangePicker } = DatePicker;


const NewOrder = () => {


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
    const uploadProps: UploadProps = {
        directory: false, // Allows folder selection
        accept: ".mp4",
        maxCount: 1,
        beforeUpload: (file: any) => {
            const isMp4OrMov = file.type === 'video/mp4' || file.type === 'video/quicktime';
            if (!isMp4OrMov) {
                alert('You can only upload MP4 or MOV files!');
            }
            return isMp4OrMov || Upload.LIST_IGNORE;
        },
    };
    const createStreamMutation = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (data: StreamType) =>
            axiosInstance.post('/autolive-control/create-new-stream', data),
        onSuccess: () => {
            message.success("OK")
        },
        onError: (err) => {
            message.error("Err")
        }
    })

    const onFinish: FormProps<StreamType>['onFinish'] = async (values) => {
        console.log(values)
        if (sourceLink === SourceLink.UPLOAD) {
            const fileList = values.file.fileList;
            const key = await customUploadFile(fileList, (isUploading:boolean) => {
                console.log(`Uploading: ${isUploading}`);
            });
        }

        return
        //  values.download_on = sourceLink;
        //  const currentDate = new Date();
        //  const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
        //  const timezoneOffsetInHours = -(timezoneOffsetInMinutes / 60);
        //  values.loop = (loop) ? "infinity" : "only"
        //  if (values.schedule != undefined && useCron) {
        //      const start_time = moment(values.schedule[0].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
        //      const end_time = moment(values.schedule[1].$d).subtract(timezoneOffsetInHours, 'hour').format('YYYY-MM-DDTHH:mm:ss') + "Z";
        //      values.startTime = start_time;
        //      values.endTime = end_time;
        //  }
        //  switch (sourceLink) {
        //      case SourceLink.GOOGLE_DRIVE:
        //          values.source_link = getGoogleDriveKey(values.source_link + '') + ''
        //          break;
        //      case SourceLink.YOUTUBE:
        //          values.source_link = getManifestUrl(youtubeCheckLink?.data?.data);
        //          break
        //      case SourceLink.UPLOAD:
        //          values.source_link = ''
        //          break;
        //  }
        //  await createStreamMutation.mutate(values)
        //  console.log('Success:', values);
    };
    useEffect(() => {
        const maxResolutionFormat = getMaxResolutionFormat(youtubeCheckLink?.data?.data);
        const manifestUrl: any = getManifestUrl(youtubeCheckLink?.data?.data);
        console.log(maxResolutionFormat)
        console.log(manifestUrl)
    }, [youtubeCheckLink.data])

    const platformquery = usePlatformData();
    const [sourceLink, setSourceLink] = useState(SourceLink.GOOGLE_DRIVE)
    return <div className="h-full">
        <div className="grid grid-cols-3 h-full gap-3">
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
                    <Form.Item<StreamType>
                        label="Vps"
                        name="vpsId"
                        rules={[{ required: true }]}
                    >
                        <Select options={data?.data.map((vp: any) => ({ ...vp, value: vp.vps_vps_provider, label: `${vp.name} - ${vp.vps_vps_provider}` }))} />
                    </Form.Item>
                    <Form.Item<StreamType>
                        label="Source link"
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
                                        <Upload {...uploadProps}>
                                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                        </Upload>
                                    </Form.Item>

                                </div>
                            </> : <></>
                    }
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
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
                                    placeholder="Select platform"
                                />
                            </Form.Item>
                            <Form.Item<StreamType>
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Stream name" />
                            </Form.Item>
                        </div>
                    </Form.Item>
                    <Form.Item<StreamType>
                        label="Stream key"
                        name="key"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{ offset: 4, span: 20 }}
                        rules={[{ required: true }]}
                    >
                        <Space>
                            <Form.Item<StreamType>
                                name="loop"
                            >
                                <Checkbox checked={loop} onChange={() => {
                                    setLoop(!loop)
                                }}>Loop</Checkbox>
                            </Form.Item>

                            <Form.Item
                                name="schedule"
                            >
                                <Checkbox checked={useCron} onChange={(e) => {
                                    setUseCron(!useCron)
                                }} value="loop">Schedule</Checkbox>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    {(useCron) ?
                        <Form.Item
                            wrapperCol={{ offset: 4, span: 20 }}
                            name="schedule"
                            rules={[{ required: true }]}
                        >
                            <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={[t('start_time'), t('endtime')]} />
                        </Form.Item>
                        : ''
                    }
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <div className="flex gap-2">
                            <Button type="primary" htmlType="submit" loading={createStreamMutation.isPending}>
                                Create
                            </Button>
                            <Button htmlType="reset">
                                Reset
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
            <div className="grid grid-rows-2 gap-3">
                <Input.TextArea readOnly />
                <Table showHeader={false} dataSource={dataSource} columns={columns} pagination={false} />
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



const dataSource = [
    {
        key: '1',
        name: 'Price',
        age: 32,
    },
    {
        key: '2',
        name: 'Tax',
        age: 42,
    },
    {
        key: '3',
        name: 'Total',
        age: 42,
    },
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
];


