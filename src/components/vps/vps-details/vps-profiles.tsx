import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Card, List } from 'antd';
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
    return <>
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
            }}
            dataSource={data?.data}
            renderItem={(item: any) => (
                <List.Item>
                    <Card className="shadow" title={item.name}>{(typeof item.value != 'string')?(item.value/1024).toFixed(2)+"GB":item.value }</Card>
                </List.Item>
            )}
        />
    </>
}

export default VpsProfile
