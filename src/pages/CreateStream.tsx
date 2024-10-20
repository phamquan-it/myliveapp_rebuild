import React, { useEffect, useRef, useState } from 'react';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Card, DatePicker, Form, Input, Modal, Select, Tooltip, Space, Switch, message, Table, Image } from 'antd';
import { FormInstance } from 'antd/lib';
import { usePlatformData } from '@/components/live-streams/CreateStreamByAdmin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import moment from 'moment';
import CreateStreamForm from '@/components/app/CreateStreamForm';
import CreateStreamTable from '@/components/app/CreateStreamTable';
import CreateStreamProcess from '@/components/app/CreateStreamProcess';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';

export enum DownloadOn {
    GOOGLE_DRIVE = 'google_drive',
    UPLOAD = 'upload',
    DEFAULT_DOWNLOAD = 'default_download',
    YOUTUBE_DOWNLOAD = 'youtube'
}

export interface StreamRequest {
    source_link?: string | null,
    key?: string,
    name?: string,
    vpsId?: number
    platformId?: number,
    startTime?: string,
    endTime?: string,
    loop?: string,
    download_on?: DownloadOn
}


const App: React.FC = () => {
    const queryClient = useQueryClient()
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
            queryClient.invalidateQueries({ queryKey: ['activityStream'] })
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
        console.log(streamData)
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
                    <CreateStreamForm setStreamData={setStreamData} vps={data} />
                </div>
            </Modal>
        </>
    );
};

export default App;

