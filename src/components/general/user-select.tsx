import axiosInstance from '@/apiClient/axiosConfig';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useQuery } from '@tanstack/react-query';
import { Select } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
interface UserSelectProps{
    
}

const UserSelect:React.FC<UserSelectProps> = () => {
    const { data, isPending } = useQuery({
        queryKey: ['user'],
        queryFn: ()=> axiosInstance.get('/users?language=en&offset=0&limit=2000')
    })
    const syncObj = syncObjectToUrl(useRouter())
    return <>

        <Select placeholder="Select user" style={{
            width: 200
            }} options={data?.data?.data.map((user:any)=>({...user, label: user.email, value: user.id}))}
            onChange={(e)=>{
                syncObj({userId: e?? ''})
            }}
            allowClear={true}
        />
    </>

}

export default UserSelect
