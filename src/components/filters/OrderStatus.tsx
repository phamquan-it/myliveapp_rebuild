import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { Select } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import React from 'react';
interface OrderStatusProps {

}

const OrderStatus: React.FC<OrderStatusProps> = () => {

    const t = useTranslations('OrderStatus')
    const statusOptions = [
        { value: "inprogress", label: t('inprogress') },
        { value: "completed", label: t('completed') },
        { value: "partial", label: t('partidal') },
        { value: "canceled", label: t('canceled') },
        { value: "processing", label: t('processing') },
        { value: "pending", label: t('pending') },
    ];
    const p = useTranslations('Placeholder')
    const syncObj = syncObjectToUrl(useRouter())
    return <>
        <Select options={statusOptions} style={{ width: 200 }} onChange={(e)=>{
            syncObj({
                status: e ?? ''
            })
        }} allowClear={true} placeholder={p('select_status')} />
    </>
}

export default OrderStatus
