import { Inter } from "next/font/google";
import { Button, Checkbox, DatePicker, Divider, Input, Menu, MenuProps, Modal, Radio, Select, Table, TableProps, Image, Breadcrumb, BreadcrumbProps } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { Flex, Layout } from 'antd';
import Title from "antd/es/typography/Title";
import { BsFilterLeft } from "react-icons/bs";
import SearchInput from "./filters/SearchInput";
const { Header, Footer, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

interface AdminLayoutProps {
    rightFilter?: ReactNode
    filterOption?: ReactNode
    staticAction?: ReactNode,
    actions?: ReactNode,
    children: ReactNode,
    selected: any[],
    breadcrumbItems: any[]
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ actions, children, selected, staticAction, breadcrumbItems, filterOption, rightFilter }) => {


    const label = {
        className: "text-sm text-slate-500 mt-1",
        style: { fontSize: "12px" }
    }
    const [filter, setFilter] = useState(true)
    return (
        <Layout className="bg-yellow-500 h-full">
            <Header className="border-b overflow-hidden">
                <div className="flex justify-between h-full item-center">
                    <div className="flex items-center gap-2">
                        <Button type="default" icon={<BsFilterLeft />} onClick={() => {
                            setFilter(!filter)
                        }}></Button>
                        <div className="flex gap-2">
                            <div>
                                <SearchInput />
                            </div>
                            <div className="flex gap-2">{filterOption ?? <></>}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className={`flex gap-1 items-center duration-150 overflow-hidden ${(selected.length == 0) ? 'opacity-0 -translate-y-12' : ''}`}>
                            {(selected.length != 0) ?
                                <>
                                    {actions ?? <></>}
                                </> :
                                <></>
                            }
                        </div>
                        {staticAction ?? <></>}
                    </div>
                </div>
            </Header>
            <Content className="bg-red-500">
                <Layout className="h-full">
                    <Content className={`p-2 ${filter?'overflow-auto':'overflow-hidden' }`} style={{
                        height: "calc(100vh - 130px)"
                    }}>
                        <Breadcrumb items={breadcrumbItems} />
                        <div className="pt-3 ">
                            {children}
                        </div>
                    </Content>
                    <Sider
                        collapsed={filter} collapsedWidth={0}
                        className="min-w-fit !bg-transparent py-2 !h-full !overflow-auto" width="260"
                        style={{ overflow: 'hidden' }} // hides overflow content
                    >
                        <div className="w-full bg-white shadow rounded py-3 pb-5 px-2 font-sans">
                            <div className="grid gap-1 overflow-hidden">
                                <Title level={5} className="!mb-0 !pb-0">Filters</Title>
                                { rightFilter??''}    
                            </div>
                        </div>
                    </Sider>


                </Layout>

            </Content>

        </Layout>
    );
}

export default AdminLayout
