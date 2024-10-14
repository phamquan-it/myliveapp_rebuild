import axiosInstance from '@/apiClient/axiosConfig';
import { EditFilled, PlusCircleFilled, PlusCircleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import SelectProfile from './vps/select-profile';
import EditLiveConfig from './setting/EditLiveConfig';
import EditConversion from './vps/EditConversion';
import CreateConversion from './vps/CreateConversion';
interface VpsConfigProps {

}
export interface ConversionType {
    id?: number;
    from?: string;
    to?: string;
    amount?: number;
}


const VpsConfig: React.FC<VpsConfigProps> = () => {

    const profilesSlug = useQuery({
        queryKey: ['ProfileSlug', location], queryFn: () => axiosInstance.get(
            "/vps-provider/get-profile-for-create-vps", {
            params: {
                locationId: 'dk'
            }
        })
    });

    const t = useTranslations('MyLanguage')

    const columns = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
            width: 50
        },
        {
            title: t('resolution'),
            dataIndex: 'resolution_key',
            key: 'resolution_key',
        },
        {
            title: t('max_streams'),
            dataIndex: 'max',
            key: 'max',
            render: (max: string) => <Input readOnly className='border-0' style={{
                width: 100
            }} value={`${max} streams`} />

        },
        {
            title: 'CPU',
            dataIndex: 'cpu',
            key: 'cpu',
            render: (cpu: string) => <Input readOnly style={{
                width: 100
            }} value={`${cpu} cores`} />
        },
        {
            title: 'RAM',
            dataIndex: 'ram',
            key: 'ram',
            render: (max: string) => <Input readOnly style={{
                width: 100
            }} value={`${max} GB`} />


        },
        {
            title: t('storage'),
            dataIndex: 'storage',
            key: 'storage',
            render: (max: string) => <Input readOnly style={{
                width: 100
            }} value={`${max} GB`} />
        },
        {
            title: '',
            dataIndex: 'storage',
            key: 'storage',
            render: (max: string, record: any) => (<>
                <EditLiveConfig config={record} />
            </>)
        }
    ];
    const { data, isFetching, isError } = useQuery({
        queryKey: ['vps_config'],
        queryFn: () => axiosInstance.get("/vps-config/list")
    })


    const conversion_columns = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
        },
        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
        },
        {
            title: t('amount'),
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: t('action'),
            dataIndex: 'id',
            key: 'id',
            render: (id: number, record: ConversionType) => (<EditConversion conversion={record} />)
        },


    ];

    const conversion = useQuery({
        queryKey: ['conversion'],
        queryFn: () => axiosInstance.get("/conversion/list")
    })

    return <>
        <SelectProfile profiles={profilesSlug?.data?.data.profiles} onSelectProfileChange={(value: string) => {
            console.log(value)
        }} />

        <div className="grid grid-cols-2">

        </div>
        <Table className='border rounded overflow-hidden my-3' title={() => "Vps config"}
            scroll={{ x: 300 }}
            pagination={false}
            loading={isFetching}
            dataSource={data?.data.map((config: any, index: number) => ({ ...config, key: index + 1 }))}
            columns={columns} />


        <Table bordered
            loading={conversion.isFetching}
            dataSource={conversion?.data?.data.map((
                conv: any,
                index: number) => ({
                    ...conv,
                    key: index + 1
                }))}
            title={() => <div className="flex justify-between items-center">
                <div>
                Conversion
                </div>
                <div> 
                    <CreateConversion/>
                                    </div>    
        </div>}
            className=' overfow-hidden'
            columns={conversion_columns} />
    </>

}

export default VpsConfig
