import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import PlatformSelect from '@/components/admin/PlatformSelect';
import PlatformSelectForFilter from '@/components/admin/PlatformSelectForFilter';
import DeleteStream from '@/components/autolive/DeleteStream';
import ViewAutoliveDetail from '@/components/autolive/ViewAutoliveDetail';
import UserSelect from '@/components/general/user-select';
import VpsSelect from '@/components/general/vps-select';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import { StringifiableRecord } from 'query-string';
import React from 'react';


const Page = () => {


    const { data, isFetching } = useQuery({
        queryKey: ['ActivityStream'],
        queryFn: () => axiosInstance.get("/activity-stream?language=en")

    })

    const columns: ColumnType<ActivityStream>[] = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => index + 1
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: string, record, index) => record?.user?.email
        },

        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            render: (text: string, record, index) => record?.platform?.name
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },

        {
            title: 'createAt',
            dataIndex: 'createAt',
            key: 'createAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD HH:mm:ss')
        },
        {
            title: 'UpdateAt',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (text: string) => dayjs(text).format('YYYY/MM/DD HH:mm:ss')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => (
                <>
                    <div className="flex gap-1">
                        <ViewAutoliveDetail activityStream={record} />
                        <DeleteStream id={0} />
                    </div>
                </>
            )
        }

    ];



    return <>
        <Title level={2} className="text-center">LiveStreams</Title>
        <div className="flex py-3 gap-2">
            <div>
                <Input placeholder="Search..." />
            </div>
            <PlatformSelectForFilter />
            <VpsSelect />
            <UserSelect />
            <SelectDateForFilter />
        </div>
        <Table dataSource={data?.data?.data} loading={isFetching} columns={columns} />;
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
