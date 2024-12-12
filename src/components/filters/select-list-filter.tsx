import { Button, Checkbox, Form, FormProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import CheckboxListFilter from './checkbox-list-filter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
interface SelectListFilterProps {
    filterBy: string;
    closePopup: () => void
}

const SelectListFilter: React.FC<SelectListFilterProps> = ({ closePopup, filterBy }) => {
    const platformData = usePlatformData()
    const vpsData = useQuery({
        queryKey: ['queryKey'],
        queryFn: () => axiosInstance.get<any>('vps-provider/getvps', { params: { language: "en" } })
    });
    const userData = useQuery({
        queryKey: ['user'],
        queryFn: () => axiosInstance.get('/users', { params: { language: 'en' } })
    })

    console.log(userData?.data?.data?.data)



    const router = useRouter()
    const syncObj = syncObjectToUrl(router)
    switch (filterBy) {
        case 'platform':
            return <CheckboxListFilter renderLabel="name" dataFilter={platformData?.data?.data?.platforms} onFinish={(values) => {
                const platform = values.filterRender.filter((platform: any) => (platform.value)).map((pl: any) => pl.id)
                closePopup()
                syncObj({ platform })
            }} />
        case 'vps':
            return <CheckboxListFilter renderLabel="name" dataFilter={vpsData?.data?.data} onFinish={(values) => {
                const vps = values.filterRender.filter((platform: any) => (platform.value)).map((vp: any) => vp.vps_vps_provider)
                closePopup()
                syncObj({ vps })
            }} />
        case 'user':
            return <CheckboxListFilter renderLabel="email" dataFilter={userData?.data?.data?.data} onFinish={(values) => {
                const user = values.filterRender.filter((u: any) => (u.value)).map((u: any) => u.id)
                closePopup()
                syncObj({ user })
            }} />
        case 'date':
            return <>{filterBy} date</>
        case 'status':
            return <>{filterBy} status</>
        default:
            return <p className="p-2">Invalid options</p>
    }
}

export default SelectListFilter
