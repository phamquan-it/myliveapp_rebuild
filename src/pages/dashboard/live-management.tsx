import { ActivityStream } from '@/@type/api_object';
import axiosInstance from '@/apiClient/axiosConfig';
import PlatformSelect from '@/components/admin/PlatformSelect';
import PlatformSelectForFilter from '@/components/admin/PlatformSelectForFilter';
import DeleteStream from '@/components/autolive/DeleteStream';
import ViewAutoliveDetail from '@/components/autolive/ViewAutoliveDetail';
import UserSelect from '@/components/general/user-select';
import VpsSelect from '@/components/general/vps-select';
import SelectDateForFilter from '@/components/live-streams/SelectDateForFilter';
import getObjecFormUrlParameters from '@/hooks/getObjectFormParameter';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import { ColumnType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { StringifiableRecord } from 'query-string';
import React, { useEffect, useState } from 'react';

interface PageProps {
    modal?: any;
}

const Page: NextPage<PageProps> = ({ modal }) => {

    const [openModal, setOpenModal, syncObjectToUrl, getObjectFromUrl] = modal;

    const router = useRouter()
    const { data, isFetching } = useQuery({
        queryKey: ['ActivityStream', router.asPath],
        queryFn: () => axiosInstance.get("/activity-stream?language=en", {
            params: getObjectFromUrl
        })

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


    const [keyword, setKeyword] = useState(getObjectFromUrl.keyword)
    const handlekeyword = debounce((e:any)=>{
        setKeyword(e.target.value);
         syncObjectToUrl({
             ...getObjectFromUrl,
             keyword: e.target.value
        })
    }, 300)
       return <>
        <Title level={2} className="text-center">LiveStreams</Title>
        <div className="flex py-3 gap-2">
            <div>
                <Input placeholder="Search..." onChange={handlekeyword} defaultValue={getObjectFromUrl.keyword || ''}/>
            </div>
            <PlatformSelectForFilter  onChange={(value)=>{
                syncObjectToUrl({
                    ...getObjectFromUrl, platform:value 
                })
            }}/>
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
