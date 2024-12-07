import { Vps } from '@/@type/api_object';
import { Card, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useTranslations } from 'next-intl';
import React from 'react';
interface VpsStatisticProps {

}

const VpsStatistic: React.FC<VpsStatisticProps> = () => {
    const t = useTranslations("MyLanguage")
    const columns: ColumnsType<Vps> = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: ('Logo'),
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: t('price'),
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: ('No. Streams'),
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: ('Downloading'),
            dataIndex: 'slug',
            key: 'slug',
        }
    ];


    return <>

        <Table<Vps> title={() => (
            <div className="font-semibold text-slate-700 flex gap-5">
                <div>Total: </div>
                <div>Idle: </div>
               <div></div>
            </div>
        )} dataSource={[]} columns={columns} />
    </>
}

export default VpsStatistic
