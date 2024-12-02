import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, List, MenuProps, Tag, TagProps, Image, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePlatformData } from '../live-streams/CreateStreamByAdmin';
import MultiSelectFilter from '@/pages/multi-select-filter';
import syncObjectToUrl from '@/helpers/syncObjectToUrl';
import { useRouter } from 'next/router';
import KeywordFilter from '@/pages/keyword-filter';

export enum FilterTagType {
    DEFAULT,
    DIALOG,
    SEARCH
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
    const platformArr = Array.isArray(router.query.platform)
        ? router.query.platform
        : router.query.platform
            ? [router.query.platform]
            : [];

    const filtersArr = Array.isArray(router.query.filters)
        ? router.query.filters
        : router.query.filters
            ? [router.query.filters]
            : [];
    const data = [
        { id: 1, name: 'Youtube', image: 'https://cdn-icons-png.flaticon.com/128/174/174883.png', value: false },
        { id: 2, name: 'Facebook', image: 'https://cdn-icons-png.flaticon.com/128/733/733547.png', value: false },
        { id: 3, name: 'Tiktok', image: 'https://cdn-icons-png.flaticon.com/128/3046/3046120.png', value: false },
        { id: 5, name: 'Twitch', image: 'https://cdn-icons-png.flaticon.com/128/2111/2111668.png', value: false },
    ]
    const syncObj = syncObjectToUrl(router)
    useEffect(() => {

        if (router.isReady && router.query.platform == undefined) {
            setOpen(true)
        }
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
                        dataFilters={data}
                        onMultiSelectFilterly={(values) => {
                            let filters = filtersArr;
                            if (values.length == 0) {
                                filters = filtersArr.filter(item => item !== 'platform');
                            }
                            syncObj({
                                platform: values.filterRender.filter((item: any) => item.value).map((item: any) => item.id),
                                filters
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
                <Tag className="py-1" {...tagProps}>
                    {tagProps.label}:{data.filter(item => platformArr.includes(item.id + '')).map((item, index) => {
                        if (index < 2)
                            return (<>
                                {item.name},
                            </>)
                    })}
                    {(platformArr.length > 2) ? `+ ${platformArr.length - 2} ...` : ''}
                </Tag>
            </Dropdown>
        </div> : (type == FilterTagType.SEARCH) ?
            <Dropdown open={open} onVisibleChange={setOpen} menu={{ items: [] }} trigger={['click']} placement="bottomLeft" dropdownRender={() => (<>
                <Card title="Platform" size="small" className="shadow w-48 !border" extra={<Button className="border-0" onClick={() => {
                    setOpen(false)
                }} icon={<CloseOutlined />} size="small"></Button>} classNames={{
                    header: "!p-1",
                }} styles={popupStyle}>
                    <KeywordFilter/>
                    <div className="pt-1 pb-1 px-2 flex justify-end border-t">
                        <Button type="primary" shape="round" onClick={() => {
                            form.submit()
                            setOpen(false)
                        }}>Apply</Button>
                    </div>
                </Card>
            </>)}>
                <Tag className="py-1" {...tagProps}>
                    {tagProps.label}:{data.filter(item => platformArr.includes(item.id + '')).map((item, index) => {
                        if (index < 2)
                            return (<>
                                {item.name},
                            </>)
                    })}
                    {(platformArr.length > 2) ? `+ ${platformArr.length - 2} ...` : ''}
                </Tag>
            </Dropdown>

            : <Tag className="py-1" {...tagProps}>{
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
