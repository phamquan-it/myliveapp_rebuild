import { CreateNewStream } from "@/@type/api_object/streams/create_new_stream";
import axiosInstance from "@/apiClient/axiosConfig";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import PlatformSelect from "@/components/admin/PlatformSelect";
import CreateStreamForm from "@/components/app/CreateStreamForm";
import CreateStreamTable from "@/components/app/CreateStreamTable";
import { customUploadFile } from "@/pages/CreateStream";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Affix, Button, Form, Input, Select, Switch, message } from "antd";
import Title from "antd/lib/typography/Title";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
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
                newStream.source_link = key + "";
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
            <div className="m-auto grid max-w-screen-xl">

                <Title level={5}>New order</Title>
                <div>
                    <CreateStreamForm setStreamData={setStreamData} vps={data} />
                </div>
                <div style={{
                    position: "relative"
                }}>
                    <Affix className='absolute right-0 -top-10'>
                        <Button type="primary" onClick={handleOk} loading={isPending}>
                            Xác nhận
                        </Button>
                    </Affix>
                    <CreateStreamTable dataSource={streamData} />
                </div>
            </div>
        </>
    );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}.json`))
                .default,
        },
    };
}
