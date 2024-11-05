import { ConfigProvider, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';

const CashflowTable = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            amount: 32,
            remmains: 0.35,
        },
        {
            key: '2',
            name: 'John',
            amount: 42,
            remmains: 5,
        },
    ];

    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (<span className="font-semibold">{text}</span>)
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            align: 'right',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            align: 'right',
            render: (text: number) => (
                <div className="font-semibold text-green-500">+{text}$</div>
            )

        },
        {
            title: 'Remains',
            dataIndex: 'remmains',
            key: 'remains',
            align: 'right',
            render: (text: number) => (
                <div className="font-semibold">{text}$</div>
            )
        },
    ];
    return <>
        <div className="grid grid-cols-3">
            <ConfigProvider theme={{
                components: {
                    Table: {
                        headerBg: 'white'
                    }
                }
            }}>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </ConfigProvider>
        </div>
    </>
}

export default CashflowTable
