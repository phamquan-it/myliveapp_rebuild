import { Button, Radio, Form, Image, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AppFilter } from './filter';
interface RadioListFilterProps {
    withIcon?: string,
    filterBy?: AppFilter
    name: string
    onFinish: (values: any) => void
    dataFilter?: any[]
    renderLabel: string
}

const RadioListFilter: React.FC<RadioListFilterProps> = ({
    onFinish,
    renderLabel,
    dataFilter,
    name,
    filterBy
}) => {
    const router = useRouter();

    const [form] = Form.useForm()
    useEffect(() => {
        const selectedPlatform = Array.isArray(router.query.platform)
            ? router.query.platform
            : router.query.platform
                ? [router.query.platform]
                : [];


        form.setFieldsValue({
            filterRender: (!dataFilter) ? [] : dataFilter.map((data) => {
                switch (filterBy) {
                    case AppFilter.STREAM_STATUS:
                        data.value = selectedPlatform.indexOf(data.id + '') != -1
                        break;
                }
                return data
            })
        });
    }, [form, dataFilter, router.query, filterBy]);

    return <>
        <Form
            form={form}
            name={name}
            onFinish={onFinish}
            autoComplete="off"
            initialValues={{ filter: dataFilter?.[0]?.id }}
        >
            <Form.Item className="px-2 pt-2"
                name="filter"
                valuePropName="value"
            >
                <Radio.Group >
                    <Space direction="vertical">
                        {dataFilter?.map((item: any, index: number) => (
                            <Radio value={item.id} key={index}>{item.name}</Radio>
                        ))}
                    </Space>
                </Radio.Group>
            </Form.Item>
            <Form.Item className="!flex !justify-end pt-2 border-t px-2">
                <Button type="primary" htmlType="submit">
                    Apply
                </Button>
            </Form.Item>
        </Form>
    </>

}

export default RadioListFilter
