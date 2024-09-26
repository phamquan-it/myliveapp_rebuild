import axiosInstance from '@/apiClient/axiosConfig';
import { EditFilled } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Input, Table } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import SelectProfile from './vps/select-profile';
import EditLiveConfig from './setting/EditLiveConfig';
interface VpsConfigProps {

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
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
            width: 50
        },
        {
            title: 'Resolution',
            dataIndex: 'resolution',
            key: 'resolution',
        },
        {
            title: 'Max',
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
            title: 'Storage',
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

    return <>
        <SelectProfile profiles={profilesSlug?.data?.data.profiles} onSelectProfileChange={(value: string) => {
            console.log(value)
        }} />
        <Table className='border rounded overflow-hidden my-3'
            pagination={false}
            dataSource={data?.data.map((config: any, index: number) => ({ ...config, key: index + 1 }))}
            columns={columns} />
    </>

}

export default VpsConfig
