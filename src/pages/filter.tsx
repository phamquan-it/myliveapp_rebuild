import TagFilter, { FilterTagType } from "@/components/filters/tagfilter";
import { FilterOutlined } from "@ant-design/icons";
import { Button, List, Select, SelectProps, Spin, Tag } from "antd";
import { Flex, Layout } from 'antd';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const { Header, Footer, Sider, Content } = Layout;



export default function Home() {

    const options = [
        {
            label: "Bản quyền",
            value: '1'
        },
        {
            label: "Nền tảng",
            value: 'platform'
        },

    ]

    const router = useRouter()
    const filters = Array.isArray(router?.query?.filters)
        ? router.query.filters
        : router?.query?.filters
            ? [router.query.filters]
            : [];
    const [open, setOpen] = useState(false)
    const selectProps: SelectProps = {
        open,
        mode: "tags",
        size: "small",
        style: {
            minWidth: 200
        },
        placeholder: "Filter",
        variant: "borderless",
        suffixIcon: <></>,
        options,
        onSearch: () => {
            setOpen(true)
        },
        onDropdownVisibleChange: () => {
            setOpen(false)
        },
        onChange: (value) => {
            setOpen(false)
            router.push({
                query: {
                    filters: value
                }
            })

        },
        popupClassName: "!w-48",
        placement: "bottomRight",
        dropdownRender: () => <div onClick={() => {
            setOpen(false)
        }}>
            <List
                size="small"
                split={false}
                dataSource={options.filter(option => !router.query.filters?.includes(option.value))}
                renderItem={(item) => <List.Item className="!p-0" onClick={() => {
                    router.push({
                        query: {
                            filters: [...filters, item.value]
                        }
                    })
                }}>
                    {item.label}
                </List.Item>}
            />
        </div>,
        value: filters,
        tagRender: (props) => (<>
            <TagFilter tagProps={props} type={(props.value == 1) ? FilterTagType.DEFAULT : FilterTagType.DIALOG} />
        </>)

    }
    const [isReady, setIsReady] = useState(false)
    useEffect(() => {
        setIsReady(router.isReady)
    }, [router.isReady])
    return (

        <Flex gap="middle" wrap>
            {(isReady) ?
                <Layout>
                    <Header >
                        <div className="flex h-full border-b items-center px-2">
                            <Button size="middle" type="default" icon={
                                <FilterOutlined />
                            } onClick={() => {
                                setOpen(true)
                            }}></Button>

                            <Select {...selectProps} />
                        </div>
                    </Header>
                </Layout>
                : <Spin />}
        </Flex>
    );
}
