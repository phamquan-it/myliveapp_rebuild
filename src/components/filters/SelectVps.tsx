import axiosInstance from '@/apiClient/axiosConfig';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React from 'react';
interface SelectVpsProps {

}

const SelectVps: React.FC<SelectVpsProps> = () => {
    const token = getCookie('token')
    const { data, isFetching } = useQuery({
        queryKey: ['vps'],
        queryFn: () => axiosInstance.get('/list', {
            params: {
                "language": 'en'
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }),
    })
    const router = useRouter()
    const syncObj = syncObjectToUrl(router)
    return <>
        <Select options={data?.data?.data.map((vps: any) => ({ ...vps, label: vps.hostname, value: vps.hostname }))}
            placeholder='Select vps'
            style={{
                width: 200
            }}
            onChange={(e)=>{
                syncObj({vps: e??''})
            }}
            allowClear
        />
    </>
}

export default SelectVps
