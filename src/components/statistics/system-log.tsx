import axiosInstance from '@/apiClient/axiosConfig';
import { pagination } from '@/helpers/pagination';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
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




    const columns: ColumnsType<any> = [
        {
            title: t('entryno'),
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: t('email'),
            dataIndex: 'email',
            key: 'email',
            ellipsis: true

        },
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            ellipsis: true

        },
        {
            title: t('method'),
            dataIndex: 'method',
            key: 'id',
        },
        {
            title: t('action'),
            dataIndex: 'action',
            key: 'action',
        },
        {
            title: t('createAt'),
            dataIndex: 'create_at',
            key: 'create_at',
            render: (text: string) => dayjs(text).format("YYYY/MM/DD")
        },


    ];
    const syncObj = syncObjectToUrl(router)
    console.log(data?.data?.data)
    return <>
        <Table title={() => (
            <>
                <span className="font-semibold text-slate-700">
                    LOG
                </span>
            </>
        )} rowKey="id"
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
