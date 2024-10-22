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
import { CreateNewStream } from '@/@type/api_object/streams/create_new_stream';
import { handleUploadFile } from '../../handleUploadFile';

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
        mutationFn: (data: {
            stream: any,
            fileList: any
        }) => new Promise((resolve, reject) => {
            axiosInstance.post('/autolive-control/create-new-stream', data.stream).then((res) => {
                if (res?.data.download_on != 'upload') {
                    resolve(res.data)
                } else {
                    const file = data.fileList[0]
                    const formData = new FormData();
                    //upload file
                    formData.append('video', file); // Append file to form data
                    axiosInstance.post('/sftp-upload/' + res?.data?.id, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }).then((resupload) => {
                        resolve(resupload)
                    }).catch((err) => {
                        reject(err)
                    })
                }

            }).catch((err) => {
                reject(err)
            })
        }),
        onSuccess: (res) => {
            message.success("OK")
            queryClient.invalidateQueries({ queryKey: ['activityStream'] })
        },
        onError: (err) => {
            console.log(err)
            message.error("no ok")
        }
    })
    const [streamData, setStreamData] = useState<any[]>([])

    useEffect(() => {
        setStreamData([])
    }, [isModalOpen])
    // create stream


    const [uploadStatus, setUploadStatus] = useState()
    const handleOk = () => {
        streamData.map(async (data: any) => {
            const newStream: CreateNewStream = {
                source_link: data.drive_link,
                key: data.stream_key,
                name: data.stream_name,
                platformId: data.platformId,
                loop: data.loop,
                vpsId: data.vpsId,
                download_on: data.download_on
            }

            if (data.download_on == "gcloud") {
                const fileList = data.upload_files;
                const key = await customUploadFile(fileList, setUploadStatus)
                newStream.source_link = key+"";
            }
            if (data.start_time != undefined) {
                newStream.startTime = data.start_time
            }
            if (data.end_time != undefined) {
                newStream.endTime = data.end_time
            }
            mutate({
                stream: newStream,
                fileList: data.upload_files
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
                    <CreateStreamForm setStreamData={setStreamData} vps={data} />
                </div>
            </Modal>
        </>
    );
};

export default App;

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
            return response.key
            message.success('Upload successful!');
        } else {
            message.error('Upload failed');
        }
    } catch (error) {
        message.error('Error uploading video');
    } finally {
        setUploading(false);
    }
};
