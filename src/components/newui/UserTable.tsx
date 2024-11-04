import { User } from '@/@type/api_object';
import { ConfigProvider, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
interface UserTableProps {

}

const UserTable: React.FC<UserTableProps> = () => {


    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
            status: true
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (<>
                <div className="font-semibold">{text}</div>
                <span className="text-slate-500" style={{
                    fontSize: 12
                }}>admin</span>
            </>)
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => (<>
                {value ?
                    <Tag color="blue" className="font-semibold">Active</Tag> :
                    <Tag color="red" className="font-semibold">In active</Tag>
                }
            </>)
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
            <Table<User> dataSource={dataSource} columns={columns} />
        </ConfigProvider>
    </>
}

export default UserTable
