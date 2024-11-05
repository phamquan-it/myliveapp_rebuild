import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Divider, List, Rate } from 'antd';
import React from 'react';

const ServiceList = () => {
    const data = [
        {
            title: 'LiveStream1',
        },
        {
            title: 'LiveStream2',
        },
        {
            title: 'LiveStream3',
        },
        {
            title: 'ProLiveStream1',
        },
        {
            title: 'ProLiveStream2',
        },
        {
            title: 'ProLiveStream3',
        },
    ];
    return <>
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 6,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <Card hoverable>
                        <h1 className="text-green-700 text-lg font-semibold text-center mb-4">
                            {item.title}
                        </h1>
                        <ul className="font-semibold px-3">
                            <li >Price: 100$</li>
                            <li>Stable: yes</li>
                            <li>Support: 24/24</li>
                        </ul>
                        <div className="px-2 pt-1">
                        </div>
                        <Divider className="my-2"></Divider>
                        <Button type="primary" block icon={<PlusOutlined />}>Order</Button>
                    </Card>
                </List.Item>
            )}
        />
    </>
}

export default ServiceList
