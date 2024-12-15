import { Button, Radio, Form, Image, Space } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AppFilter } from './filter';
import { useTranslations } from 'next-intl';
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
    dataFilter = [],
    name,
    filterBy
}) => {
    const t = useTranslations("MyLanguage")
    const router = useRouter();
    const [form] = Form.useForm()
    useEffect(() => {
        const status = Array.isArray(router.query.status)
            ? router.query.status.join(',') // Handle array case
            : router.query.status || dataFilter[0]?.id || ''; // Handle string or undefined case

        form.setFieldsValue({
            filter: status
        });
    }, [form, dataFilter, router.query, filterBy]);

    return <>
        <Form
            form={form}
            name={name}
            onFinish={onFinish}
            autoComplete="off"
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
                    {t("apply")}
                </Button>
            </Form.Item>
        </Form>
    </>

}

export default RadioListFilter
