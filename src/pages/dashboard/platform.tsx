import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
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
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },

    ];


    return <>

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
