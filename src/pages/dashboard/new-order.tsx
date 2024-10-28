import PlatformSelect from '@/components/admin/PlatformSelect';
import { Button, Checkbox, Form, FormProps, Input, Select, Space, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import { GetStaticPropsContext } from 'next';
import React from 'react';
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


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


const Page = () => {
    type FieldType = {
        source_link?: string,
        key?: string,
        name?: string,
        platformId?: number,
        vpsId?: number,
        resolution?: string,
        duration?: string,
        startTime?: string,
        endTime?: string,
        loop?: string,
        download_on?: string
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return <div className="h-full">

        <Title level={5} className='col-span-3'>New order</Title>
        <div className="grid grid-cols-3 grid-rows-2 h-full">
            <div className="col-span-2 row-span-2">
                <Form
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 1000 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    labelAlign="left"
                >
                    <Form.Item<FieldType>
                        label="Vps"
                        name="vpsId"
                        rules={[{ required: true }]}
                    >
                        <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Source link"
                        name="source_link"
                        rules={[{ required: true }]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item<FieldType>
                                name="platformId"
                                rules={[{ required: true }]}
                            >
                                <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
                            </Form.Item>
                            <Form.Item<FieldType>
                                name="name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="Stream name" />
                            </Form.Item>
                        </div>
                    </Form.Item>

                    <Form.Item<FieldType>
                        wrapperCol={{ offset: 4, span: 20 }}
                        name="loop"
                    >
                        <Checkbox checked>Loop</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="h-1/2">
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        </div>
    </div>
}
export default Page
export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
        props: {
            messages: (await import(`../../../messages/${locale}.json`)).default,
        },
    };
}
