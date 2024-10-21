import { CreateNewStream } from "@/@type/api_object/streams/create_new_stream";
import axiosInstance from "@/apiClient/axiosConfig";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import PlatformSelect from "@/components/admin/PlatformSelect";
import CreateStreamForm from "@/components/app/CreateStreamForm";
import CreateStreamTable from "@/components/app/CreateStreamTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Select, Switch, message } from "antd";
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

    const createStream = useMutation({
        mutationKey: ['createStream'],
        mutationFn: (stream: CreateNewStream) => axiosInstance.post("/autolive-control/create-new-stream", stream),
        onSuccess: () => {
            message.success("Create stream ok")
        },
        onError: (err) => {
            console.error(err)
            message.error("Create strean error")
        }
    })
    const handleOk = () => {
        streamData.map((data: any) => {
            const newStream: CreateNewStream = {
                source_link: data.drive_link,
                key: data.stream_key,
                name: data.stream_name,
                platformId: data.platformId,
                loop: data.loop,
                vpsId: data.vpsId,
                download_on: data.download_on
            }
            if (data.start_time != undefined) {
                newStream.startTime = data.start_time
            }
            if (data.end_time != undefined) {
                newStream.endTime = data.end_time
            }


            console.log(data)
            return
            createStream.mutate(newStream)
        })
    };

    return (
        <>

            <div className="grid gap-3">
                <CreateStreamTable dataSource={streamData} />
                <CreateStreamForm setStreamData={setStreamData} vps={data} />
            </div>
        </>
    );
};
export default Page;
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../../messages/${locale}.json`))
                .default,
        },
    };
}
