import axiosInstance from '@/apiClient/axiosConfig';
import TableAction from '@/components/admin/TableAction';
import CreatePlatform from '@/components/general/create-platform';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Spin, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const [isReady, setIsReady] = useState(false)
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
                },
            }),
        placeholderData: (previousData) => previousData,
    });

    const columns = [
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
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: 'CreateAt',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: any, index: number) => (<TableAction openState={false} editForm={<Button />} />)
        },

    ];
    const syncObj = syncObjectToUrl(router)
    const handleInput =  debounce((e)=>{
        syncObj({keyword: e.target.value})
    }, 300)

    useEffect(() => {
       setIsReady(router.isReady) 
    }, [router])
    return <>
        <Title level={2} className="text-center">Platform</Title>
        <div className="flex justify-between py-3">
            <div>
                <Input placeholder="Search..." onChange={handleInput} defaultValue={router.query.keyword ?? ''} />
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
