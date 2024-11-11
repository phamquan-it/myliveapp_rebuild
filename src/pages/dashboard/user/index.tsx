import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditUser from "@/components/admin/crudform/edit/EditUser";
import format from "@/hooks/dayjsformatter";
import {
    CheckOutlined,
    CloseOutlined,
    PlusCircleFilled,
    UserOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Avatar,
    ConfigProvider,
    Form,
    Input,
    Modal,
    Select,
    Switch,
    Table,
    TablePaginationConfig,
    Tag,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
    ColumnsType,
    FilterValue,
    SorterResult,
    TableCurrentDataSource,
} from "antd/es/table/interface";
import Title from "antd/es/typography/Title";
import { Button } from "antd/lib";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import { error } from "console";
import { useUserData } from "@/components/live-streams/CreateStreamByAdmin";
import SearchInput from "@/components/filters/SearchInput";
import { pagination } from "@/helpers/pagination";
import axiosInstance from "@/apiClient/axiosConfig";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import UserAction from "@/components/admin/user/UserAction";
import AdminLayout from "@/components/admin-layout";
import Link from "next/link";
const { Option } = Select;
const Page = () => {
    const token = getCookie("token");
    const router = useRouter();
    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const columns: ColumnsType<any> = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            width: 70
        },
        {
            title: <div className="py-2">
                {t("name")}
            </div>,
            dataIndex: "name",
            key: "name",
            render: (text, record) => (<>
                <div className="font-semibold">{text}</div>
                <span className="text-slate-500" style={{
                    fontSize: 12
                }}>{record?.email}</span>
            </>)
        },
        {
            title: "Avatar",
            dataIndex: "avatar",
            key: "avatar",
            render: (text, record) => <>
                <Avatar size={40} icon={<UserOutlined />} />
            </>
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            render: (text, record) => record?.role?.name
        },
        {
            title: t("isactive"),
            dataIndex: "isActive",
            key: "isActive",

            render: (value) => (<>
                {value ?
                    <Tag color="blue" className="font-semibold">Active</Tag> :
                    <Tag color="red" className="font-semibold">In active</Tag>
                }
            </>)
        },
        {
            title: t("createat"),
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (text: string) => format(text, router.locale || "en"),
        },
        {
            title: t("fund"),
            dataIndex: "remains",
            key: "remains",
            align: "right",
            render: (text) => <span className="font-semibold">{text}$</span>
        },
        {
            title: t("totalmoney"),
            dataIndex: "total",
            key: "total",
            align: "right",
            render: (text) => <span className="font-semibold">{text}$</span>
        },
        {
            title: t("action"),
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 200,
            render: (text, record) => {
                return <UserAction user={record} />
            }
        },
    ];

    const { limit, offset, pageIndex, pageSize } = pagination(router, 1, 20)
    const { data, isFetching } = useQuery({
        queryKey: ['user', router],
        queryFn: (data) => axiosInstance.get('/users', {
            params: {
                language: 'en',
                keyword: router.query?.keyword ?? '',
                offset,
                limit,
                ...router.query
            }
        })
    })
    const syncObj = syncObjectToUrl(router)
    return (
        <AdminLayout selected={[]} breadcrumbItems={
            [
                {
                    title: <Link href="/dashboard">{d('home')}</Link>
                },

                {
                    title: d('user'),
                },
            ]

        } filterOption={(
            <div className="flex gap-2 items-center">
                <Select className="w-48" options={[
                    { value: 1, label: <span>User</span> },
                    { value: 2, label: <span>Manager</span> },
                    { value: 3, label: <span>Admin</span> },
                ]}
                    onChange={(e) => {
                        syncObj({ role: e ?? '' })
                    }}
                    placeholder="Select role"
                    allowClear
                />
                <Select className="w-48" options={[
                    { value: 1, label: <span>Active</span> },
                    { value: 0, label: <span>In active</span> },
                ]
                }
                    allowClear
                    onChange={(e) => {
                        syncObj({ is_active: e ?? '' })
                    }}
                    placeholder="Is active"
                />

            </div>
        )}>
            <ConfigProvider theme={{
                components: {
                    Table: {
                        cellPaddingBlock: 5
                    }
                }
            }}>
                <Table rowClassName="font-sans"
                    dataSource={data?.data?.data?.map((item: any, index: number) => ({
                        ...item,
                        key: pageIndex * pageSize + (index + 1) - pageSize,
                    }))}
                    onChange={(pagination) => {
                        syncObj({
                            pageIndex: pagination.current,
                        })
                    }}
                    rowSelection={{
                        type: "checkbox"
                    }}
                    columns={columns}
                    loading={isFetching}
                    scroll={{ x: 900 }}
                    pagination={{
                        total: data?.data.total,
                        pageSize: pageSize,
                        current: pageIndex,
                    }}
                />
            </ConfigProvider>
        </AdminLayout>
    );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../../messages/${locale}.json`)).default,
        },
    };
}
