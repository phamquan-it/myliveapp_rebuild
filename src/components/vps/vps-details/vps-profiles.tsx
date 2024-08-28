import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Card, List, Table } from 'antd';
import React from 'react';
interface VpsProfileProps {
    vpsProvider:any
}

const VpsProfile: React.FC<VpsProfileProps> = ({vpsProvider}) => {
    const { data, isFetching } = useQuery({
        queryKey: ['Profile'],
        queryFn: ()=> axiosInstance.get('/vps-provider/get-info-from-profile', {
            params: {
                language:"en",
                profile: vpsProvider.profile
            }
        })
    });

     const columns = [
            {
               title: 'No.',
                dataIndex: 'key',
                key: 'key',
                render: (text: string, record: any, index: number)=> index+1
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
            },
        ];
    return <>
             
       
        
        
        <Table dataSource={data?.data} className="border rounded overflow-hidden" columns={columns} pagination={false} />
            </>
}

export default VpsProfile
