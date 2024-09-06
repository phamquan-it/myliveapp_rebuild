import axiosInstance from '@/apiClient/axiosConfig';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import { convertGoogleDriveLinkToDownload } from '@/utils/driveLinkConverter';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Checkbox, Form, FormProps, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';


interface CreateStreamProps {

}


const CreateStream: React.FC<CreateStreamProps> = () => {
    const token = getCookie("token")
    type FieldType = {
        source_link: string,
        platformId: number,
        streamKey: string,
        loop: boolean
    };

    const [videoData, setVideoData] = useState<any>(null)
    const dataSource = [
        {
            key: '1',
            name: 'Resolution',
            value: (videoData != null) ? `${videoData[0]?.width}x${videoData[0].height}` : '',
        },
        {
            key: '2',
            name: 'Type',
            value: (videoData != null) ? `${videoData[0]?.codec_type}` : '',
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
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];


    const [linkState, setLinkState] = useState(false)
    const checkLink = useMutation({
        mutationKey: ['checklink'],
        mutationFn: (data: string) => axiosInstance
            .get("/autolive-control/get-video-metadata",
                {
                    "params": {
                        "source_link": data
                    },
                    "headers": {
                        "Authorization": `Bearer ${token}`
                    }
                }),
        onSuccess: (res) => {
            setLinkState(true)
            setVideoData(res?.data)
            message.success("OK")
        },
        onError: () => {
            message.error("No ok");
        }
    })
    const platforms = usePlatformData()
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log(convertGoogleDriveLinkToDownload(values.source_link));
        return
        checkLink.mutate(values.source_link);
        console.log('Success:', values);


    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return <>
        <Button type="primary" onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Create stream" open={isModalOpen} onCancel={handleCancel} width={1000}>
            <div className="grid grid-cols-2 gap-3">
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Link"
                        name="source_link"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input onBlur={(e) => {
                            checkLink.mutate(convertGoogleDriveLinkToDownload(e.target.value) ?? '');
                        }} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Stream key"
                        name="streamKey"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Platform"
                        name="platformId"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Select options={platforms?.data?.data?.platforms.map((platform: any) => ({ ...platform, label: platform.name, value: platform.id }))} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }} name='loop'
                    >

                        <Checkbox>Loop</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" disabled={!linkState}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

                <div>
                    <Alert
                        description={linkState ? "ok" : "no ok"}
                        type={linkState ? "info" : "error"}
                    />
                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </div>
            </div>
        </Modal>
    </>

}

export default CreateStream
