import axiosInstance from "@/apiClient/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { Input, Select, Table, TablePaginationConfig } from "antd";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const { Option } = Select;
const Page = () => {
    const router = useRouter();
    const { query } = router
    const { keyword, pageIndex, pageSize } = query
    useEffect(() => {
        console.log(query)
    }, [query])

    const t = useTranslations("MyLanguage");
    const d = useTranslations("DashboardMenu");
    const columns: any[] = [
        {
            title: t("entryno"),
            dataIndex: "key",
            key: "key",
            width: "6%",
            align: "center",

        },
        {
            title: t("email"),
            dataIndex: "email",
            key: "email",
        },
        {
            title: t("action"),
            dataIndex: "action",
            key: "action",
            width: "13%",
            align: "center",
        },
        {
            title: t("amount"),
            dataIndex: "amount",
            key: "amount",
            width: "10%",
            align: "center",
        },
        {
            title: t("fund"),
            dataIndex: "fund",
            key: "fund",
            width: "10%",
            align: "right",
            render: (text: string, record: any) => record?.finance_transaction?.funds
        },
        {
            title: t("createat"),
            dataIndex: "createdAt",
            key: "createdAt",
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
        queryKey: ["category", router.asPath],
        queryFn: () => axiosInstance.get('/cashflow/list', {
            params: {
                languague: 'en'
            }
        }),
        placeholderData: (previousData) => previousData,
    });
    const handleTableChange = (
        pagination: TablePaginationConfig,
    ) => {
        const current = pagination.current || 1;
        const pageSize = pagination.pageSize || 20;
    };

    const p = useTranslations("Placeholder");
    return (
        <>
            <div className="flex justify-between mt-10">
                <div className="flex justify-start gap-1 " id="filter">
                    <Input
                        style={{ width: 200 }}
                        placeholder={p("search")}
                        defaultValue={keyword as string}
                    />
                </div>
            </div>

            <Table
                className="border shadow-md rounded-md mt-4"
                dataSource={data?.data.data.map((item: any, index: number) => ({
                    ...item,
                    key: 1 * 10 + (index + 1) - 10,
                }))}
                scroll={{ x: 700 }}
                columns={columns}
                loading={isFetching}
                onChange={handleTableChange}
                pagination={{
                    total: data?.data.total,
                    //       current: pageIndex,
                    //    pageSize: pageSize,
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
