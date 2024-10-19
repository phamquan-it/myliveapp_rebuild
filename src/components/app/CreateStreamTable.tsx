import { CloseOutlined } from '@ant-design/icons';
import { Button, Table, Image } from 'antd';
import moment from 'moment';
import React from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import { useTranslations } from 'next-intl';
import { ColumnsType } from 'antd/es/table';

interface CreateStreamTableProps {
    dataSource: any
}

const CreateStreamTable: React.FC<CreateStreamTableProps> = ({ dataSource }) => {
    const d = useTranslations('DashboardMenu')
    const t = useTranslations('MyLanguage')

    const { data } = usePlatformData();
    const columns:ColumnsType<any> = [
        {
            title: t('entryno'),
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: t('name'),
            dataIndex: 'stream_name',
            key: 'name',
        },
        {
            title: t('resolution'),
            dataIndex: 'resolution',
            key: 'resolution',
            ellipsis: true 
        },
        {
            title: d('platform'),
            dataIndex: 'platforms',
            key: 'platforms',
            render: (platformId: [], record: any) => {
                return (<div className='flex gap-1'>{
                    platformId.map((platform: any) => {
                        const icon = data?.data?.platforms.find((item: any) => {
                            return item.id === platform.platform
                        })
                        return (
                            <>
                                <Image width={20} src={icon.image} alt='' />
                            </>
                        )
                    })
                } </div>)
            }
        },
        {
            title: t('start_time'),
            dataIndex: 'start_at',
            key: 'start_at',
            render: (text: any, record: any) => {
                const dateString = (record.live_time && record.live_time.length === 2 && record.live_time[0]?.$d)
                    ? moment(record.live_time[0].$d).format('YYYY-MM-DD HH:mm')
                    : '';
                return <>{dateString}</>
            }
        },
        {
            title: t('endtime'),
            dataIndex: 'start_at',
            key: 'start_at',
            render: (text: any, record: any) => {
                const dateString = (record.live_time && record.live_time.length === 2 && record.live_time[1]?.$d)
                    ? moment(record.live_time[1].$d).format('YYYY-MM-DD HH:mm')
                    : '';
                return <>{dateString}</>
            }

        },
        {
            title: '',
            dataIndex: 'start_at',
            key: 'start_at',
            width: 50,
            render: () => (
                <Button size="small" className={'border-none shadow-none'} icon={<CloseOutlined style={{ color: "red" }} />}></Button>
            )
        },


    ];

    return <>
        <Table dataSource={dataSource
            .map((newstream: any, index: number) => ({
                ...newstream,
                key: index + 1
            }))}
            className='border'
            columns={columns}
            pagination={false}
            scroll={{ y: 100 }} />

    </>
}

export default CreateStreamTable
