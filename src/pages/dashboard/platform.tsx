import axiosInstance from '@/apiClient/axiosConfig';
import TableAction from '@/components/admin/TableAction';
import SearchInput from '@/components/filters/SearchInput';
import CreatePlatform from '@/components/general/create-platform';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Spin, Table, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
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
                headers: {
                    "Authorization": `Bearer ${token}`
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
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => {
                return (
                    <Image alt='icon' width={30} height={30} src={text} preview={false} />
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
        {
            title: t('action'),
            dataIndex: 'action',
            key: 'action',
            width: 130,
            render: (text: string, record: any, index: number) => (<TableAction openState={false} editForm={<Button />} />)
        },

    ];
    return <>
        <Title level={2} className="text-center">{ d('platform') }</Title>
        <div className="flex justify-between py-3">
            <div>
                <SearchInput />
            </div>
            <CreatePlatform />
        </div>
        <Table
            loading={isFetching}
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
            columns={columns} />
    </>
}

export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
