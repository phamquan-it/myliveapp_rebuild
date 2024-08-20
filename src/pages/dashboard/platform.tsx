import axiosInstance from '@/apiClient/axiosConfig';
import TableAction from '@/components/admin/TableAction';
import CreatePlatform from '@/components/general/create-platform';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import dayjs from 'dayjs';
import { GetStaticPropsContext } from 'next';
import router from 'next/router';
import React from 'react';

const Page = () => {


    const { data, isFetching, isError } = useQuery({
        queryKey: ["category"],
        queryFn: () =>
            axiosInstance.get("/platform/list", {
                params: {
                    language: "en"
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
            render: (text: string) => dayjs(text).format('YYYY/MM/DD HH:mm:ss')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: string, record: any, index: number) => (<TableAction openState={false} editForm={<Button />} />)
        },

    ];


    return <>
        <Title level={2} className="text-center">Platform</Title>
        <div className="flex justify-between py-3">
            <div>
                <Input placeholder="Search..." />
            </div>
            <CreatePlatform />
        </div>
        <Table loading={isFetching} dataSource={data?.data?.platforms.map((platform: any, index: number) => ({ ...platform, key: index + 1 }))} columns={columns} />;
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
