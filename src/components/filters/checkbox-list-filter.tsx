import { Button, Checkbox, Form, Image } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AppFilter } from './filter';
interface CheckboxListFilterProps {
    withIcon?: string,
    filterBy?: AppFilter
    name: string
    onFinish: (values: any) => void
    dataFilter?: any[]
    renderLabel: string
}

const CheckboxListFilter: React.FC<CheckboxListFilterProps> = ({
    onFinish,
    renderLabel,
    dataFilter,
    name,
    filterBy,
    withIcon
}) => {
    const router = useRouter();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const handleValuesChange = (_: any, allValues: { filterRender: any; }) => {
        // Check if any checkbox is selected
        const hasChecked = (allValues.filterRender || []).some((filter: { value: any; }) => filter?.value);
        setIsSubmitDisabled(!hasChecked);
    };

    const [form] = Form.useForm()
    useEffect(() => {
        const selectedPlatform = Array.isArray(router.query.platform)
            ? router.query.platform
            : router.query.platform
                ? [router.query.platform]
                : [];
        const selectedVps = Array.isArray(router.query.vps)
            ? router.query.vps
            : router.query.vps
                ? [router.query.vps]
                : [];
        const selectedUser = Array.isArray(router.query.user)
            ? router.query.user
            : router.query.user
                ? [router.query.user]
                : [];


        form.setFieldsValue({
            filterRender: (!dataFilter) ? [] : dataFilter.map((data) => {
                switch (filterBy) {
                    case AppFilter.PLATFORM:
                        data.value = selectedPlatform.indexOf(data.id + '') != -1
                        break;
                    case AppFilter.USER:
                        data.value = selectedUser.indexOf(data.id + '') != -1
                        break
                    case AppFilter.VPS:
                        data.value = selectedVps.indexOf(data.vps_vps_provider + '') != -1
                        break
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
            onValuesChange={handleValuesChange}
        >
            <Form.List name="filterRender">
                {(fields) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Form.Item key={key} className="px-2 not-magin-b"
                                name={[name, 'value']} valuePropName="checked"
                            >
                                <Checkbox>
                                    <div className={`flex items-center gap-1 ${withIcon!=undefined?'translate-y-1':''}`}>
                                        {withIcon!=undefined?
                                        <Image preview={false} width={25} src={form.getFieldValue(['filterRender', name, withIcon])} alt="" />
                                        :''}
                                        {form.getFieldValue(['filterRender', name, renderLabel])}
                                    </div>
                                </Checkbox>
                            </Form.Item>
                        ))}
                    </>
                )}
            </Form.List>
            <Form.Item className="!flex !justify-end pt-2 border-t px-2">
                <Button type="primary" disabled={isSubmitDisabled} htmlType="submit">
                    Apply
                </Button>
            </Form.Item>
        </Form>
    </>

}

export default CheckboxListFilter
