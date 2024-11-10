import { FacebookFilled, LinkedinFilled, TwitterCircleFilled, XFilled, YoutubeFilled, YoutubeOutlined } from '@ant-design/icons';
import { Card, ConfigProvider, Select, Table, Tag, Image, TabsProps, Tabs } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
interface PageProps {

}
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
    {
        title: 'Status',
        dataIndex: 'age',
        key: 'age',
        render: () => (<>
            <Tag color="blue">Scheduling</Tag>
        </>)
    },

];
const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
     {
        key: '',
        label: 'All',
        children: '',
    },
    {
        key: 'running',
        label: 'Running',
        children: '',
    },
    {
        key: 'scheduling',
        label: 'Scheduling',
        children: '',
    },
    {
        key: 'initalize',
        label: 'Initalize',
        children: '',
    },
];


const Page: React.FC<PageProps> = () => {
    return <>
        <div className="p-3 livestream text-white">
            <Title level={5}>Dashboard</Title>
            <Card title="" extra={<Select className="!w-36" options={[{
                label: 'This year',
                value: new Date().getFullYear()
            }]} />}>
                <p></p>
                <div className="grid grid-cols-4 rounded gap-1 bg-white shadown">
                    <Card className="!bg-sky-500">
                        <Title level={5} className="!text-white !mb-0">
                            <FacebookFilled /> &nbsp;
                            Facebook</Title>
                        <span className="text-white" style={{ fontSize: 12 }}>Income: $100</span>

                    </Card>
                    <Card className="!bg-teal-500">
                        <Title level={5} className="!text-white !mb-0">
                            <LinkedinFilled /> &nbsp;
                            Linkedin</Title>
                        <span className="text-white" style={{ fontSize: 12 }}>Income: $100</span>
                    </Card>
                    <Card className="!bg-red-500">
                        <Title level={5} className="!text-white !mb-0">
                            <YoutubeFilled /> &nbsp;
                            Youtube</Title>
                        <span className="text-white" style={{ fontSize: 12 }}>Income: $100</span>
                    </Card>
                    <Card className="!bg-slate-500">
                        <Title level={5} className="!text-white !mb-0">
                            <TwitterCircleFilled /> &nbsp;
                            Twitter</Title>
                        <span className="text-white" style={{ fontSize: 12 }}>Income: $100</span>
                    </Card>
                </div>
            </Card>

        </div>

        <div className="p-3 pt-0 livestream grid grid-cols-3 gap-3">
            <Card title={
                <span style={{
                    fontWeight: '400'
                }} className="font-sans">Platforms  statistic</span>
            } >
                <p></p>
            </Card>
            <Card  title={
                <span style={{
                    fontWeight: '400'
                }} className="font-sans">Recent orders</span>
            }  className="col-span-2" extra={<a href="#">More</a>}>



                <Tabs type="card" defaultActiveKey="1" items={items} onChange={onChange} />
                <ConfigProvider theme={{
                    components: {
                        Table: {
                            headerBg: 'rgb(248 250 252)',
                            cellPaddingBlock: 10
                        }

                    }
                }} >

                    <Table dataSource={dataSource} columns={columns} pagination={false} />
                </ConfigProvider>
            </Card>
        </div>
        <div className="p-3 pt-0 livestream grid grid-cols-3 gap-3">
            <Card title={
                <span className="font-sans" style={{
                    fontWeight: '200'
                }}>Top livestreams</span>
            } className="col-span-2">
                <ConfigProvider theme={{
                    components: {
                        Table: {
                            headerBg: 'rgb(248 250 252)',
                            cellPaddingBlock: 10
                        }

                    }
                }} >

                </ConfigProvider>
            </Card>
            <Card title={
                <span className="font-sans" style={{
                    fontWeight: '200'
                }}>Deposit</span>
            } >

                <Table dataSource={dataSource} columns={columns} showHeader={false} pagination={false} />
            </Card>
        </div>

    </>
}

export default Page
