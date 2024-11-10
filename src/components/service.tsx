import { Service } from '@/@type/Service';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Divider, List, Rate, Table } from 'antd';
import React from 'react';
interface ServiceListProp {
    data: Service[]
}
const ServiceList: React.FC<ServiceListProp> = ({ data }) => {
    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
    ];
    return <>
        <Table dataSource={dataSource} columns={columns} />
    </>
}


export default ServiceList
