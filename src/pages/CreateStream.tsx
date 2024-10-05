import React, { useEffect, useRef, useState } from 'react';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Select, Tooltip, Space, Switch, message, Table, Image } from 'antd';
import { FormInstance } from 'antd/lib';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import { useMutation, useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import moment from 'moment';
import CreateStreamForm from '@/components/app/CreateStreamForm';
import CreateStreamTable from '@/components/app/CreateStreamTable';
import CreateStreamProcess from '@/components/app/CreateStreamProcess';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
interface StreamRequest {
    source_link: string | null,
    key: string,
    name: string,
    vpsId?: number
    platformId: number,
    startTime?: string,
    endTime?: string
}


const App: React.FC = () => {
    const router = useRouter()
    const d = useTranslations('DashboardMenu')
    const t = useTranslations('MyLanguage')
    const getGoogleDriveFileKey = (url: string) => {
        const regex = /\/file\/d\/(.*?)\//;
        const match = url.match(regex);

        if (match && match[1]) {
            return match[1]; // This is the Google Drive file key
        } else {
            return null; // Return null if the file key is not found
        }
    }
    const { data, isFetching } = useQuery({
        queryKey: ['queryKey'],
        queryFn: () => axiosInstance.get<any>('vps-provider/getvps', {
            params: {
                language: "en"
            }
        })
    });
    const [vpsId, setVpsId] = useState(0)
    console.log("vps", data?.data?.data)


    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { mutate, isPending, isError } = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (data: any) => axiosInstance.post('/autolive-control/create-new-stream', data),
        onSuccess: () => {
            message.success("OK")
        },
        onError: () => {
            message.error("no ok")
        }
    })
    const [streamData, setStreamData] = useState<any[]>([])

    useEffect(() => {
        setStreamData([])
    }, [isModalOpen])

    const handleOk = () => {
        if (vpsId == 0) {
            message.error("Please select an vps")
            return
        }
        streamData.map((newStream) => {
            newStream.platforms.map((platform: any) => {
                const streamRequest: StreamRequest = {
                    source_link: getGoogleDriveFileKey(newStream.drive_link),
                    key: platform.stream_key,
                    name: newStream.stream_name,
                    vpsId,
                    platformId: platform.platform
                }
                console.log(streamRequest)
                if (newStream.live_time != null) {
                    streamRequest.startTime = moment(newStream.live_time[0].$d).format('YYYY-MM-DD HH:mm')
                    streamRequest.endTime = moment(newStream.live_time[1].$d).format('YYYY-MM-DD HH:mm')
                    mutate(streamRequest)
                    console.log("Live with cron", streamRequest)
                } else {
                    mutate(streamRequest)
                    console.log("live now")
                }

            })
        })
    };


    return (
        <>
            <Button type="primary" onClick={() => setIsModalOpen(true)} icon={<PlusCircleFilled />}></Button>
            <Modal
                width={1000}
                title="Create stream"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnClose
                okButtonProps={{
                    loading: isPending
                }}
            >
                <div className="grid gap-3">
                    <CreateStreamTable dataSource={streamData} />
                    <Select options={data?.data?.map((vps: any) => ({
                        label: vps.slug,
                        value: vps?.vps?.vpsProvider
                    }))} onChange={(value) => {
                        setVpsId(value)
                    }} />
                    <CreateStreamForm setStreamData={setStreamData} />

                </div>
            </Modal>
        </>
    );
};

export default App;

