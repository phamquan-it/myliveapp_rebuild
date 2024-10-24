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
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
    Form,
    Input,
    Modal,
    Select,
    Switch,
    Table,
    TablePaginationConfig,
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
const { Option } = Select;
const Page = () => {
    const token = getCookie("token");
    const router = useRouter();
    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const columns: ColumnsType<any> = [
        {
            align: "center",
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
        },
        {
            title: t("name"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("isactive"),
            dataIndex: "isActive",
            key: "isActive",
            render: (text: string, record: any) => (
                <Switch
                    defaultChecked={record?.isActive == "1" ? true : false}
                    onChange={(value) => {
                    }}
                />
            ),
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
            dataIndex: "funds",
            key: "funds",
            align: "right",
        },
        {
            title: t("totalmoney"),
            dataIndex: "total_money",
            key: "total_money",
            align: "right",
        },
        {
            align: "center",
            title: t("role"),
            dataIndex: "role",
            key: "role",
            render: (text: string, record: any) => record?.role?.name,
        },
        {
            title: t("action"),
            dataIndex: "id",
            key: "id",
            align: "center",
            width: 200,
            render: () => {
                return <UserAction />
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
                limit
            }
        })
    })
    const syncObj = syncObjectToUrl(router)
    return (
        <>
            <div className="flex py-3 gap-2">
                <SearchInput />
                <Select className="w-48" options={[
                    { value: 1, label: <span>User</span> },
                    { value: 2, label: <span>Manager</span> },
                    { value: 3, label: <span>Admin</span> },
                ]}
                    onChange={(e) => {
                        syncObj({ role: e })
                    }}
                    placeholder="Select role"
                />
                <Select className="w-48" options={[
                    { value: 1, label: <span>Active</span> },
                    { value: 0, label: <span>In active</span> },
                ]
                }
                    onChange={(e) => {
                        syncObj({ active: e })
                    }}
                    placeholder="Is active"
                />

            </div>
            <Table
                dataSource={data?.data?.data?.map((item: any, index: number) => ({
                    ...item,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
                onChange={(pagination) => {
                    syncObj({
                        pageIndex: pagination.current,
                    })
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
        </>
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
