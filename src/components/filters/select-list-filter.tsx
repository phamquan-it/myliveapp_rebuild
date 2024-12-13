import { Button, Checkbox, Form, FormProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import CheckboxListFilter from './checkbox-list-filter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import RadioListFilter from './radio-list-filter';
import { useTranslations } from 'next-intl';
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

    const router = useRouter()
    const syncObj = syncObjectToUrl(router)
    const s = useTranslations("StreamStatus")
    switch (filterBy) {
        case 'platform':
            return <CheckboxListFilter
                withIcon="image"
                name="platformFilter"
                renderLabel="name"
                dataFilter={platformData?.data?.data?.platforms}
                onFinish={(values) => {
                    const platform = values.filterRender
                        .filter((platform: any) => (platform.value))
                        .map((pl: any) => pl.id)
                    closePopup()
                    syncObj({ platform })
                }} />
        case 'vps':
            return <CheckboxListFilter name="vpsFilter" renderLabel="name" dataFilter={vpsData?.data?.data} onFinish={(values) => {
                const vps = values.filterRender.filter((platform: any) => (platform.value)).map((vp: any) => vp.vps_vps_provider)
                closePopup()
                syncObj({ vps })
            }} />
        case 'user':
            return <CheckboxListFilter name="userFilter" renderLabel="email" dataFilter={userData?.data?.data?.data} onFinish={(values) => {
                const user = values
                    .filterRender
                    .filter((user: any) => (user.value))
                    .map((user: any) => user.id)
                closePopup()
                syncObj({ user })
            }} />
        case 'date':
            return <>{filterBy} date</>
        case 'status':
            return <RadioListFilter name="userFilter"
                renderLabel="name"
                dataFilter={[
                    { id: 'initalize', name: s("initalize") },
                    { id: 'scheduling', name: s("scheduling") },
                    { id: 'running', name: s("running") },
                    { id: 'stopped', name: s("stopped") },
                    { id: 'error', name: s("error") },
                ]}
                onFinish={(values) => {
                    closePopup()
                    syncObj({ status: values.filter })

                }} />
        default:
            return <p className="p-2">Invalid options</p>
    }
}

export default SelectListFilter
