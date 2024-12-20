import { User } from "@/@type/api_object";
import axiosInstance from "@/apiClient/axiosConfig";
import DateFilter from "@/components/DateFilter";
import AdminLayout from "@/components/admin-layout";
import SearchInput from "@/components/filters/SearchInput";
import { pagination } from "@/helpers/pagination";
import syncObjectToUrl from "@/helpers/syncObjectToUrl";
import { useQuery } from "@tanstack/react-query";
import { Input, Select, Table, TablePaginationConfig } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
enum DataType {
    OR = 'or',
    COR = 'cor',
    DEP = 'dep',
    REF = 'ref',
}
const { Option } = Select;
const Page = () => {
    const router = useRouter();
    const { query } = router
    const { keyword } = query
    const { offset, limit, pageIndex, pageSize } = pagination(router)
    useEffect(() => {
        console.log(query)
    }, [query])

    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const cf = useTranslations("CashflowAction")
    const columns: ColumnsType<any> = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            width: "6%",
            align: "center",
            render: (value, record, index) => pageIndex * pageSize + (index + 1) - pageSize

        },
        {
            title: t("email"),
            dataIndex: "user",
            key: "user",
            ellipsis: true,
            render: (user: User) => user?.email
        },
        {
            title: t("desc"),
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action",
            width: "13%",
            align: "center",
            render: (text: DataType) => cf(text)
        },
        {
            title: t("balance"),
            dataIndex: "balance",
            key: "balance",
            width: "13%",
            align: "center",
            render: (text: string) => <span className="">{text}</span>
        },
        {
            title: t("fluctuation"),
            dataIndex: "amount",
            key: "amount",
            width: "10%",
            align: "right",
            render: (text, record) => (record.action == DataType.OR) ?
                <span className="text-red-600">-{text}</span> :
                <span className="text-green-500">+{text}</span>
        },
        {
            title: t("createat"),
            dataIndex: "create_at",
            key: "create_at",
            width: "15%",
            align: "center",
            render: (text: string) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
        },
    ];
    const onFinish = (values: any) => {
        console.log(values);
    };
    const [openState, setOpenState] = useState(false);

    const { data, isFetching, isError } = useQuery({
        queryKey: ["cashflow", router.asPath],
        queryFn: () => axiosInstance.get('/cashflow/list', {
            params: {
                language: "en",
                keyword: router.query?.keyword ?? '',
                offset,
                limit
            }
        }),
        placeholderData: (previousData) => previousData,
    });
    const syncObj = syncObjectToUrl(router)
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        const current = pagination.current || 1;
        syncObj({ pageIndex: current })
    };

    const p = useTranslations("Placeholder");
    return (
        <AdminLayout selected={[]} breadcrumbItems={
            [

                {
                    title: <Link href="/dashboard">{d('home')}</Link>
                },
                {
                    title: d('cashflow'),
                },
            ]
        } staticAction={<>
            <DateFilter />
        </>}>
            <Table
                rowKey="id"
                dataSource={data?.data.data}
                scroll={{ x: 700 }}
                columns={columns}
                loading={isFetching}
                onChange={handleTableChange}
                pagination={{
                    total: data?.data.total,
                    current: pageIndex,
                    pageSize: pageSize,
                }}
            />
        </AdminLayout>
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
