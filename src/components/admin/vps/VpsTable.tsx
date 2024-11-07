import { Table, Image, Dropdown, Button, ConfigProvider, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { FiMoreVertical } from "react-icons/fi"; ``
interface VpsTableProps {

}

const VpsTable: React.FC<VpsTableProps> = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Livestream1',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'Livestream2',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns: ColumnsType<any> = [
        {
            title: <div className="py-2">No.</div>,
            dataIndex: 'key',
            key: 'key',
            width: 40
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
            render: () => (
                <Image src="https://img.icons8.com/?size=48&id=uIXgLv5iSlLJ&format=png" width={30} alt="" />
            )
        },
        {
            title: 'Branch',
            dataIndex: 'branch',
            key: 'branch',
        },
        {
            title: 'Amount',
            dataIndex: 'streamings',
            key: 'streammings',
            render: () => <>1</>,
            align: "center"
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: () => <>
                <div className="flex justify-center">
                    <Tooltip title="Running">
                        <FaPlay className="text-sky-600" />
                    </Tooltip>
                </div>
            </>,
            align: "center"
        },
        {
            title: 'Price',
            dataIndex: 'address',
            key: 'address',
            width: 150,
            align: "right",
            render: () => (<span className="font-semibold">
                10$
            </span>)
        },

        {
            dataIndex: 'id',
            key: 'id',
            render: () => (<>
                <Button shape="circle" type="link" className="border-none text-slate-700" icon={
                    <FiMoreVertical />
                }></Button>

            </>),
            width: 50
        },
    ];
    return <>
        <ConfigProvider theme={{
            components: {
                Table: {
                    cellPaddingBlock: 5
                }
            }
        }}>
            <Table dataSource={dataSource} columns={columns} />
        </ConfigProvider>
    </>
}

export default VpsTable
