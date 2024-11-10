import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import AdminLayout from '@/components/admin-layout';
import CreateAdvandedConfig from '@/components/admin/advandedConfig/create-advande-config';
import { DeleteAdvandedConfig } from '@/components/admin/advandedConfig/delete-advanded-config';
import { UpdateAdvandedConfig } from '@/components/admin/advandedConfig/update-advanded-config';
import SearchInput from '@/components/filters/SearchInput';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { PlusCircleFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';
interface PageProps {

}

const Page: React.FC<PageProps> = () => {
    const columns: ColumnsType<AdvandedConfig> = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Resolution',
            dataIndex: 'resolution_key',
            key: 'resolution_key',
        },
        {
            title: 'Max stream',
            dataIndex: 'max_stream',
            key: 'max_stream',
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (id, advandedConfig) => (
                <div className="flex gap-2">
                    <UpdateAdvandedConfig advandedConfig={advandedConfig} />
                    <DeleteAdvandedConfig id={id} />
                </div>
            )
        },
    ];
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)

    const { data, isFetching, isError } = useQuery({
        queryKey: ["advanded-configuration", router],
        queryFn: () =>
            axiosInstance.get("advanded-configuration/list", {
                params: {
                    language: "en",
                    keyword: router.query.keyword ?? '',
                    offset,
                    limit
                },
            }),
        placeholderData: (previousData) => previousData,
    });
    const syncObj = syncObjectToUrl(router)
    const t = useTranslations('MyLanguage')
    const d = useTranslations('DashboardMenu')
    return <AdminLayout  selected={[]} breadcrumbItems={[]} >
        <div className="flex justify-between py-3">
            <SearchInput />
            <CreateAdvandedConfig />
        </div>
        <Table<AdvandedConfig>
            rowClassName="font-sans"
            loading={isFetching}
            scroll={{
                x: 300
            }}
            onChange={(pagination) => {
                syncObj({
                    pageIndex: pagination.current,
                })
            }}
            pagination={{
                total: data?.data?.total,
                pageSize: pageSize,
                current: pageIndex
            }}
            dataSource={data?.data?.data
                .map((platform: any, index: number) => ({
                    ...platform,
                    key: pageIndex * pageSize + (index + 1) - pageSize,
                }))}
            columns={columns}
        />
    </AdminLayout>
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
