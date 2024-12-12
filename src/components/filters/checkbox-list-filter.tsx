import { Button, Checkbox, Form, Image } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
interface CheckboxListFilterProps {
    onFinish: (values: any) => void
    dataFilter?: any[]
    renderLabel: string
}

const CheckboxListFilter: React.FC<CheckboxListFilterProps> = ({ onFinish, renderLabel, dataFilter }) => {
    const router = useRouter();
    const [form] = Form.useForm()
    useEffect(() => {
        form.setFieldsValue({
            filterRender: dataFilter,
        });
    }, [form, dataFilter]);

    return <>
        <Form
            form={form}
            name="filter"
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.List name="filterRender">
                {(fields) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Form.Item key={key} className="px-2 not-magin-b"
                                name={[name, 'value']} valuePropName="checked"
                            >
                                <Checkbox>
                                    <div className="flex items-center gap-1">
                                        {form.getFieldValue(['filterRender', name, renderLabel])}
                                    </div>
                                </Checkbox>
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
            <Form.Item className="!flex !justify-end pt-2 border-t px-2">
                <Button type="primary" htmlType="submit">
                    Apply
                </Button>
            </Form.Item>
        </Form>
    </>

}

export default CheckboxListFilter
