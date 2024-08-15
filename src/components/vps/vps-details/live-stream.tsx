import { Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
interface LiveStreamProps {

}

const LiveStream: React.FC<LiveStreamProps> = () => {
    const dataSource = [
        {
            key: '1',
            email: 'quanqqq11@gmail.com',
            name: 'qc1',
            platform: 'Youtube',
            source: 'driver.google.com'
        },
         {
            key: '1',
            email: 'c2202lm.pmquan@aptech.vn',
            name: 'qc2',
            platform: 'Youtube',
            source: 'driver.google.com'
        },
    ];

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text: string, record: any, index: number) => index + 1,
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
        },
        {
            title: 'Source',
            dataIndex: 'source',
            key: 'source',
        },
    ];

    return <>
        <Title level={5} className="text-center border-b">Live stream</Title>
        <Table dataSource={dataSource} columns={columns} className="border rounded" />

    </>
}

export default LiveStream
