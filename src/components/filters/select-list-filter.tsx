import { Button, Checkbox, Form, FormProps } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useReducer } from 'react';
import CheckboxListFilter from './checkbox-list-filter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import RadioListFilter from './radio-list-filter';
import { useTranslations } from 'next-intl';
import { AppFilter } from './filter';
import { filterReducer, initialState } from './reducer/filter-params-reducer';
interface SelectListFilterProps {
    filterBy: string;
    closePopup: () => void
}

const SelectListFilter: React.FC<SelectListFilterProps> = ({ closePopup, filterBy }) => {
    const [state, dispatch] = useReducer(filterReducer, initialState)

    const platformData = usePlatformData()
    const vpsData = useQuery({
        queryKey: ['queryKey'],
        queryFn: () => axiosInstance.get<any>('vps-provider/getvps', { params: { language: "en" } })
    });
    const userData = useQuery({
        queryKey: ['user', state],
        queryFn: () => axiosInstance.get('/users', { params: { language: 'en', ...state } })
    })

    const router = useRouter()
    const syncObj = syncObjectToUrl(router)
    const s = useTranslations("StreamStatus")
    const o = useTranslations("OrderStatus")
    useEffect(() => {
        if (filterBy == AppFilter.NONE) {
            dispatch({ type: "handleKeyword", keyword: "" })
        }
    }, [filterBy])
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
            return <CheckboxListFilter loading={userData.isFetching} name="userFilter"
                withSearch={(keyword) => {
                    dispatch({ type: 'handleKeyword', keyword })
                }}
                renderLabel="email"
                dataFilter={userData?.data?.data?.data}
                onFinish={(values) => {
                    const user = values
                        .filterRender
                        .filter((user: any) => (user.value))
                        .map((user: any) => user.id)
                    closePopup()
                    syncObj({ user })
                }} />
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
        case AppFilter.PAYMENT_STATUS:
            return <RadioListFilter name="paymentFilter"
                renderLabel="name"
                dataFilter={[
                    { id: 'inprogress', name: o("inprogress") },
                    { id: 'processing', name: o("processing") },
                    { id: 'compeleted', name: o("completed") },
                ]}
                onFinish={(values) => {
                    closePopup()
                    syncObj({ payment_status: values.filter })

                }} />
        default:
            return <p className="p-2">Invalid options</p>
    }
}

export default SelectListFilter
