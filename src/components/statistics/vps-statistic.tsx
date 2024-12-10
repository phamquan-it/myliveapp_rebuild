import { Vps } from '@/@type/api_object';
import { Card, Table, Image, Button } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React from 'react';
import VpsStatus from '../vps/status';
import Network from '../vps/network';
import VpsPrice from '../admin/vps/vps-price';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import { DashboardRouter } from '@/enums/router/dashboard';
interface VpsStatisticProps {

}

const VpsStatistic: React.FC<VpsStatisticProps> = () => {
    const t = useTranslations("MyLanguage")
    const profilesSlug = useQuery({
        queryKey: ['ProfileSlug', location], queryFn: () => axiosInstance.get(
            "/vps-provider/get-profile-for-create-vps", {
            params: {
                locationId: 'dk'
            }
        })
    });

    const columns: ColumnsType<any> = [
        {
            title: <div className="py-2">No.</div>,
            dataIndex: "key",
            key: 'key',
            width: 35,
            render: (text, record, index) => index + 1
        },

        {
            title: t('name'),
            dataIndex: "name",
            key: 'name',
        },
        {
            title: t('platform'),
            dataIndex: 'platform',
            key: 'platform',
            render: () => (
                <Image className="mt-1" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJVI5SCDlnpFcgofZJAAQuIzHeBdlPO1n6Yw&s" width={30} alt="" preview={false} />
            )
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: 'brand',
            render: (text: string, record: any) => record?.vps?.brand
        },
        {
            title: t('price'),
            dataIndex: 'profile',
            key: 'profile',
            width: 150,
            align: "right",
            render: (text) => (<VpsPrice profile={text} profiles={profilesSlug?.data} />)
        },

        {
            title: "Network",
            dataIndex: "slug",
            key: 'slug',
            render: (text: string) => <>
                <Network slug={text} />
            </>
        },
    ]

    const { data, isFetching, isError } = useQuery({
        queryKey: ['vpsData'],
        queryFn: () => axiosInstance.get<any>('/vps-provider/getvps', {
            params: {
                language: "en"
            }
        })
    });

    return <>

        <Table<Vps> pagination={false} title={() => (
            <div className="font-semibold text-slate-700 flex gap-5 justify-between">
                <div className="flex gap-4">
                    <div>Total: </div>
                    <div>Idle: </div>
                </div>
                <Button href={DashboardRouter.VPS} type="link" className="!px-0 !font-semibold !text-slate-700">Manage</Button> 
            </div>
        )} dataSource={data?.data} columns={columns} />
    </>
}

export default VpsStatistic
