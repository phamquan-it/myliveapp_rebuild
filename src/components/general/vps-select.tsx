import axiosInstance from '@/apiClient/axiosConfig';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import React from 'react';
interface VpsSelectProps {

}

const VpsSelect: React.FC<VpsSelectProps> = () => {
    const router = useRouter()
    const syncObj = syncObjectToUrl(router)
    const { data } = useQuery({
        queryKey: ['vps'],
        queryFn: ()=> axiosInstance.get("/")
    });
    return <>
        <Select placeholder="Select vps" style={{
            width: 200
        }} options={[{ value: 'alive1', label: <span>alive1</span> }]} defaultValue={router.query.vpsId ?? null}
            onChange={
                (e) => {
                    syncObj({
                        vpsId: e
                    })
                }
            }
        />
    </>
}

export default VpsSelect



