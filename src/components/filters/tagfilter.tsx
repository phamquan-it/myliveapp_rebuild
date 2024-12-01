import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, List, MenuProps, Tag, TagProps, Image, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import MultiSelectFilter from '@/pages/multi-select-filter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useRouter } from 'next/router';

export enum FilterTagType {
    DEFAULT,
    DIALOG
}
interface CustomTagProps extends TagProps {
    label?: any,
    value?: any
}
interface TagFilterProps {
    tagProps: CustomTagProps
    type: FilterTagType
}

const TagFilter: React.FC<TagFilterProps> = ({ type, tagProps }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const data = usePlatformData()
    const syncObj = syncObjectToUrl(router)
    useEffect(() => {

        if (router.isReady && router.query.platform == undefined) {
            console.log(
                "yes"
            )
            setOpen(true)
        } else { console.log("no") }
    }, [router.isReady, router.query.platform])
    return <div className="">
        {(type == FilterTagType.DIALOG) ? <div className="relative">
            <Dropdown open={open} onVisibleChange={setOpen} menu={{ items: [] }} trigger={['click']} placement="bottomLeft" dropdownRender={() => (<>
                <Card title="Platform" size="small" className="shadow w-48 !border" extra={<Button className="border-0" onClick={() => {
                    setOpen(false)
                }} icon={<CloseOutlined />} size="small"></Button>} classNames={{
                    header: "!p-1",
                }} styles={popupStyle}>

                    <MultiSelectFilter
                        dataFilters={data?.data?.data?.platforms}
                        onMultiSelectFilterly={(values) => {
                            syncObj({
                                platform: values.filterRender.filter((item: any) => item.value).map((item: any) => item.id)
                            })
                        }}
                        useFormFilter={form}
                    />
                    <div className="pt-1 pb-1 px-2 flex justify-end border-t">
                        <Button type="primary" shape="round" onClick={() => {
                            form.submit()
                            setOpen(false)
                        }}>Apply</Button>
                    </div>
                </Card>
            </>)}>
                <Tag className="py-1" {...tagProps}>{
                    tagProps.label
                }</Tag>
            </Dropdown>
        </div> : <Tag className="py-1" {...tagProps}>{
            tagProps.label
        }</Tag>}
    </div>
}

export default TagFilter

const popupStyle = {
    header: {
        minHeight: 0
    },
    title: {
        fontSize: 14,
        fontWeight: 300,
    },
    body: {
        padding: 0,
        paddingLeft: 10
    },
    actions: {
        margin: 0
    },
    extra: {
        fontSize: 5
    }
}
