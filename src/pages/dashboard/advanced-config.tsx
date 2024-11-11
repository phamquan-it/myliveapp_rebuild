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
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
interface PageProps {

}

const Page: React.FC<PageProps> = () => {

    const t = useTranslations('MyLanguage')
    const columns: ColumnsType<AdvandedConfig> = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('resolution'),
            dataIndex: 'resolution_key',
            key: 'resolution_key',
        },
        {
            title: t('max_streams'),
            dataIndex: 'max_stream',
            key: 'max_stream',
            align: 'center'
        },
        {
            title: t('action'),
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
    const d = useTranslations('DashboardMenu')
    return <AdminLayout selected={[]} breadcrumbItems={[
        {
            title: <Link href="/dashboard">{d('home')}</Link>
        },

        {
            title: d('advancedConfig'),
        },
    ]
    } staticAction={(
        <CreateAdvandedConfig />
    )} >
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
