import axiosInstance from '@/apiClient/axiosConfig';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';

const SystemLog = () => {

    const router = useRouter()
    const { limit, offset, pageIndex, pageSize } = pagination(router)
    const t = useTranslations("MyLanguage")
    const { data } = useQuery({
        queryKey: ['log'],
        queryFn: () => axiosInstance.get('/log/list', {
            params: {
                language: "en",
                keyword: router.query.keyword ?? '',
                offset,
                limit
            },
        })
    })




    const columns:ColumnsType<any> = [
        {
            title: t('entryno'),
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('name'),
            dataIndex: 'user_id',
            key: 'name',
            render: (text: string)=>(text== null)?"System": text,
            ellipsis: true
            
        },
        {
            title: t('desc'),
            dataIndex: 'description',
            key: 'description',
        },
    ];
    const syncObj = syncObjectToUrl(router)
    console.log(data?.data?.data)
    return <>
        <Table
            onChange={(pagination) => {
                syncObj({
                    pageIndex: pagination.current,
                })
            }}
            pagination={false}
            columns={columns}
            dataSource={data?.data?.data}
        />
    </>
}

export default SystemLog
