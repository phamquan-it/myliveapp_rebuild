import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import ViewAutoliveDetail from '@/components/autolive/ViewAutoliveDetail';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnType } from 'antd/lib/table';
import { GetStaticPropsContext } from 'next';
import { StringifiableRecord } from 'query-string';
import React from 'react';


const Page = () => {


    const { data, isFetching } = useQuery({
        queryKey: ['ActivityStream'],
        queryFn: () => axiosInstance.get("/activity-stream?language=en")

    })

    console.log(data)

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
        },
        {
            title: 'UpdateAt',
            dataIndex: 'updateAt',
            key: 'updateAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => <ViewAutoliveDetail activityStream={record} />
        }

    ];



    return <>
        <Title level={2} className="text-center">Live management</Title>
        <div className="flex py-3">
            <div>
                <Input placeholder="Search..."/>
            </div>
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
