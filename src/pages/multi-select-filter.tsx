import React, { ReactNode, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Image, FormInstance } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useRouter } from 'next/router';
interface FilterSelectProps {
    dataFilters: any[],
    onMultiSelectFilterly: (values: any) => void
    useFormFilter: FormInstance<any>,
    renderElement?: ReactNode
}
const MultiSelectFilter: React.FC<FilterSelectProps> = ({ onMultiSelectFilterly, useFormFilter, dataFilters, renderElement }) => {
     // Set default values after the component mounts
    const [filtersData, setFiltersData] = useState(dataFilters)
    useEffect(() => {
        useFormFilter.setFieldsValue({
            filterRender: dataFilters,
        });
    }, [useFormFilter, dataFilters]);
    const syncObj = syncObjectToUrl(useRouter())
    return (
        <Form
            form={useFormFilter}
            name="dynamic_form_nest_item"
            onFinish={onMultiSelectFilterly}
        >
            <Form.List name="filterRender">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Form.Item key={key}
                                {...restField}
                                name={[name, 'value']} valuePropName="checked"
                            >
                                <Checkbox>
                                    <div className="flex items-center gap-1 translate-y-1">
                                        <Image width={25} alt="" src={useFormFilter.getFieldValue(['filterRender', name, 'image'])} />
                                        {useFormFilter.getFieldValue(['filterRender', name, 'name'])}
                                    </div>
                                </Checkbox>
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
        </Form>
    );
};

export default MultiSelectFilter;

