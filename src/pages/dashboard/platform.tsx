import axiosInstance from '@/apiClient/axiosConfig';
import { useProfile } from '@/apiClient/providers/useProfile';
import AdminLayout from '@/components/admin-layout';
import TableAction from '@/components/admin/TableAction';
import EditPlatform from '@/components/admin/crudform/edit/EditPlatform';
import DeletePlatform from '@/components/admin/platform/DeletePlatform';
import SearchInput from '@/components/filters/SearchInput';
import CreatePlatform from '@/components/general/create-platform';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { isUser } from '@/user_access/checkrole';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Spin, Table, Image, ConfigProvider } from 'antd';
import Title from 'antd/es/typography/Title';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter()
    const token = getCookie("token");
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const { data, isFetching, isError } = useQuery({
        queryKey: ["platform", router],
        queryFn: () =>
            axiosInstance.get("/platform/list", {
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
    const columns = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: <div className="py-2">{t('name')}</div>,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => {
                return (
                    <Image alt='icon' width={30} src={text} preview={false} />
                )
            }

        },
        {
            title: 'Rmtp',
            dataIndex: 'rmtp',
            key: 'rmtp',
        },
        {
            title: t('createat'),
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD')
        },

    ];

    const action = {
        title: t('action'),
        dataIndex: 'id',
        key: 'id',
        width: 140,
        render: (id: number, record: any, index: number) => (
            <div className="flex gap-2">
                <EditPlatform platform={record} />
                <DeletePlatform id={id} />
            </div>
        )
    }

    return <AdminLayout selected={[]} breadcrumbItems={[
        {
            title: <Link href="/dashboard">{d('home')}</Link>
        },
        {
            title: d('platform'),
        },
    ]} staticAction={(
        !isUser(useProfile()?.data) ?
            <CreatePlatform />
            : <></>
    )}>
        <div style={{
            margin: "auto"
        }}>

            <ConfigProvider theme={{
                components: {
                    Table: {
                        cellPaddingBlock: 5,
                        cellPaddingInline: 30
                    }
                }
            }}>
                <Table rowClassName="font-sans" loading={isFetching}
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
                    dataSource={data?.data?.platforms
                        .map((platform: any, index: number) => ({
                            ...platform,
                            key: pageIndex * pageSize + (index + 1) - pageSize,
                        }))}
                    columns={isUser(useProfile()?.data) ? columns : [...columns, action]} />
            </ConfigProvider>
        </div>
    </AdminLayout >
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
