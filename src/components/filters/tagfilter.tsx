import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, List, MenuProps, Tag, TagProps } from 'antd';
import React, { useState } from 'react';

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
 const [open, setOpen] = useState(false) 
  return <div className="">
        {(type == FilterTagType.DIALOG) ? <div className="relative">
            <Dropdown open={open} onVisibleChange={setOpen} menu={{ items: [] }} trigger={['click']} placement="bottomLeft" dropdownRender={() => (<>
                <Card title="Platform" size="small" className="shadow w-48 !border" extra={<Button className="border-0" onClick={()=>{
                    setOpen(false)
                }} icon={<CloseOutlined />} size="small"></Button>} classNames={{
                    header: "!p-1",
                }} styles={{
                    header: {
                        minHeight: 0
                    },
                    title: {
                        fontSize: 14,
                        fontWeight: 300,
                    },
                    body: {
                        padding: 0
                    },
                    actions: {
                        margin: 0
                    },
                    extra: {
                        fontSize: 5
                    }
                }}>
                    <List
                        size="small"
                        dataSource={[
                            'Racing car sprays burning fuel into crowd.',
                            'Japanese princess to wed commoner.',
                            'Australian walks 100km after outback crash.',
                            'Man charged over missing wedding girl.',
                            'Los Angeles battles huge wildfires.',
                        ]}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                    <div className="pt-1 pb-1 px-2 flex justify-end border-t">
                        <Button type="primary" shape="round" onClick={()=>{
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
