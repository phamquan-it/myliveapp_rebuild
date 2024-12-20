import { Button, Checkbox, Form, Image, Input, Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { AppFilter } from './filter';
import { useTranslations } from 'next-intl';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
interface CheckboxListFilterProps {
    withSearch?: (keyword: string) => void
    withIcon?: string
    filterBy?: AppFilter
    name: string
    onFinish: (values: any) => void
    dataFilter?: any[]
    renderLabel: string
    loading?: boolean
}

const CheckboxListFilter: React.FC<CheckboxListFilterProps> = ({
    onFinish,
    renderLabel,
    dataFilter,
    name,
    filterBy,
    withIcon,
    withSearch,
    loading = false
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
    const t = useTranslations("MyLanguage")
    const handleSearchInput = debounce(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (withSearch != undefined) withSearch(e.target.value)
        }, 300)
    return <div>
        <div className={`p-2 border-b ${withSearch == undefined ? "hidden" : ''}`}>
            <Input prefix={<SearchOutlined />} onChange={handleSearchInput} />
        </div>
        <>
            <Form
                form={form}
                name={name}
                onFinish={onFinish}
                autoComplete="off"
                onValuesChange={handleValuesChange}
            >
                {loading ?
                    <div className="flex justify-center py-2">
                        <Spin />
                    </div>
                    :

                    <Form.List name="filterRender">
                        {(fields) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <Form.Item key={key} className="px-2 not-magin-b"
                                        name={[name, 'value']} valuePropName="checked"
                                    >
                                        <Checkbox>
                                            <div className={`flex items-center gap-1 ${withIcon != undefined ? 'translate-y-1' : ''}`}>
                                                {withIcon != undefined ?
                                                    <Image preview={false} width={20} src={form.getFieldValue(['filterRender', name, withIcon])} alt="" />
                                                    : ''}
                                                {form.getFieldValue(['filterRender', name, renderLabel])}
                                            </div>
                                        </Checkbox>
                                    </Form.Item>
                                ))}
                            </>
                        )}
                    </Form.List>
                }

                <Form.Item className="!flex !justify-end pt-2 border-t px-2">
                    <Button type="primary" disabled={isSubmitDisabled} htmlType="submit">
                        {t("apply")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    </div>

}

export default CheckboxListFilter
