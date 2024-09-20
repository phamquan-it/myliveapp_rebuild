import { Card } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useTranslations } from 'next-intl';
import React from 'react';
import StatisticStatus from './statistic-status';
interface StatisticProps {

}

const Statistic: React.FC<StatisticProps> = () => {
    const t = useTranslations('MyLanguage')
    const s = useTranslations('OrderStatus')
    return <>
        <Card title={t('all_order')}>
            <div className="grid grid-cols-6">
                <StatisticStatus value={0} order_status={s('completed')} />
                <StatisticStatus value={0} order_status={s('partidal')} />
                <StatisticStatus value={0} order_status={s('inprogress')} />
                <StatisticStatus value={0} order_status={s('processing')} />
                <StatisticStatus value={0} order_status={s('pending')} />
                <StatisticStatus value={0} order_status={s('canceled')} />
            </div>
        </Card>
    </>
}

export default Statistic
