import axiosClient from "@/apiClient/axiosClient";
import _ from "lodash";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    DatePicker,
    Form,
    Input,
    message,
    Modal,
    Select,
    Table,
    TablePaginationConfig,
    Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import { CaretRightFilled, PlayCircleFilled, PlusCircleFilled, StopFilled, StopOutlined } from "@ant-design/icons";
import LiveState from "@/components/client/LiveState";
import axiosInstance from "@/apiClient/axiosConfig";
import EditLiveStreams from "@/components/live-streams/EditLiveStreams";

const Page = () => {
    const d = useTranslations("DashboardMenu");
    const t = useTranslations("MyLanguage");
    const columns: any = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
            render: (text: string, record: any, index: number) => record?.user?.name
        },
        {
            title: t("email"),
            dataIndex: "email",
            key: "email",
            render: (text: string, record: any, index: number) => record?.user?.email
        },
        {
            title: t("status"),
            dataIndex: "status",
            key: "method",
            render: (text: string) => (
                <LiveState liveKey="" platfornId={1} state={false} />
            ),
        },
        {
            title: t("createAt"),
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) => (
                <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>
            ),

        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action",
            render: ()=> (<>
                <EditLiveStreams/>
                          </>)
        },

    ];
    const [openState, setOpenState] = useState(false);
    const router = useRouter();
    const [pageIndex, setPageIndex] = useState(
        !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
            ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
            : 1
    );
    const token = getCookie("token");
    const [keyword, setKeyword] = useState(
        getObjecFormUrlParameters(router)?.keyword
    );
    const [pageSize, setPageSize] = useState(
        !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
            ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
            : 10
    );


    const { data, isFetching, isError } = useQuery({
        queryKey: ["activity-stream", router.asPath],
        queryFn: () =>
            axiosInstance.get("/activity-stream?language=en", {
                params: {
                    keyword: keyword,
                    offset: (pageIndex - 1) * pageSize,
                    limit: pageIndex * pageSize,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        placeholderData: (previousData) => previousData,
    });
    const handleTableChange = (pagination: TablePaginationConfig) => {
        const current = pagination.current || 1;
        setPageIndex(current);
        setPageSize(pageSize);
    };
    const hanleKeyword = _.debounce((e: any) => {
        setKeyword(e.target.value);
    }, 300);
    const p = useTranslations("Placeholder");
    useEffect(() => {
        if (
            keyword == null &&
            pageSize == 10 &&
            pageIndex == 1 &&
            router.asPath == "/dashboard/log"
        )
            return;
        router.push(router, {
            query: {
                keyword: keyword,
                pageSize: pageSize,
                pageIndex: pageIndex,
            },
        });
    }, [keyword, pageIndex, pageSize]);

    const createNewStreamMutation = useMutation({
        mutationFn: (data: any) => axiosInstance.post("/autolive-control/create-new-stream",
            {
                user_id: '1',
                link: data.link
            }
        ),
        onError: (error) => {
            message.error("Error")
        },
        onSuccess: (res) => {
            message.success("success")
            hideModal();
        }
    });
    const onFinish = (values: any) => {
        console.log('Success:',);
        const streamlink = values.platform + "/" + values.streamkey
        createNewStreamMutation.mutate({
            link: streamlink
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const [openModal, setOpenModal] = useState(false);
    const showModal = () => {
        setOpenModal(true)
    }
    const hideModal = () => {
        setOpenModal(false)
    }
    const platforms = useQuery({
        queryKey: ['platform'], queryFn: () => axiosInstance.get("/platform/list", {
            params: {
                language: "en"
            }
        })
    });

    return (
        <>
            <Title level={2} className="text-center">
                {'Autolive'}
            </Title>
            <Modal title="Create new stream" open={openModal} footer={[]} onCancel={hideModal}>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Platform"
                        name="platform"
                        rules={[{ required: true, message: 'Please select platform!' }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select platform" options={platforms.data?.data?.platforms?.map((value: any, index: number) => ({
                                label: value.name,
                                value: value.rmtp
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Stream key"
                        name="streamkey" initialValue={'k1wk-bjka-9ht6-yvtt-17s5'}
                        rules={[{ required: true, message: 'Please input your stream key!' }]}
                    >
                        <Input placeholder="Stream key" />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={createNewStreamMutation.isPending}>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>


            <div className="my-3 flex gap-1 justify-between">
                <div id="filter">
                    <Input
                        defaultValue={keyword}
                        placeholder={p("search")}
                        className=""
                        style={{ width: 200 }}
                        onChange={hanleKeyword}
                    />
                </div>
                <Button type="primary" icon={<PlusCircleFilled />} iconPosition="end" onClick={showModal}>Create</Button>
            </div>
            <Table
                className="border rounded shadow-md"
                loading={isFetching}
                onChange={handleTableChange}
                dataSource={data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
                scroll={{ x: 800 }}
                columns={columns}
                pagination={{
                    total: data?.data.total,
                    pageSize: pageSize,
                    current: pageIndex,
                    showSizeChanger: true,
                    position: ["bottomCenter"],
                }}
            />
        </>
    );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
