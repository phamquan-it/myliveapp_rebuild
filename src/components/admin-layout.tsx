import { Inter } from "next/font/google";
import { Button, Checkbox, DatePicker, Divider, Input, Menu, MenuProps, Modal, Radio, Select, Table, TableProps, Image, Breadcrumb, BreadcrumbProps } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { Flex, Layout } from 'antd';
import Title from "antd/es/typography/Title";
import { BsFilterLeft } from "react-icons/bs";
const { Header, Footer, Sider, Content } = Layout;

const inter = Inter({ subsets: ["latin"] });

interface AdminLayoutProps {
    staticAction?: ReactNode,
    actions?: ReactNode,
    children: ReactNode,
    selected: any[],
    breadcrumbItems: any[]
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ actions, children, selected, staticAction, breadcrumbItems }) => {


    const label = {
        className: "text-sm text-slate-500 mt-1",
        style: { fontSize: "12px" }
    }
    const [filter, setFilter] = useState(true)
    return (
            <Layout className="bg-yellow-500 h-full">
                <Header className="border-b">
                    <div className="flex justify-between h-full item-center">
                        <div className="flex items-center gap-2">
                            <Button type="default" icon={<BsFilterLeft />} onClick={() => {
                                setFilter(!filter)
                            }}></Button>
                            <div>
                                <Input placeholder="Search..." />
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
                        <Content className="p-2 overflow-auto" style={{
                            height: "calc(100vh - 130px)"
                            }}>
                            <Breadcrumb items={breadcrumbItems} />
                            <div className="pt-3">
                                {children}
                            </div>
                        </Content>
                        <Sider
                            collapsed={filter} collapsedWidth={0}
                            className="min-w-fit !bg-transparent p-2 !h-full !overflow-auto" width="350"
                            style={{ overflow: 'hidden' }} // hides overflow content
                        >
                            <div className="w-full bg-white shadow rounded py-3 pb-5 px-2 font-sans">
                                <div className="grid gap-1 overflow-hidden">
                                    <Title level={5} className="!mb-0 !pb-0">Filters</Title>
                                    <span {...label}>Search</span>
                                    <Input placeholder="Search" />
                                    <span {...label} >Platform</span>
                                    <Select placeholder="Select platform" allowClear options={[{
                                        value: 'sample', label: <div className="flex items-center gap-2">
                                            <Image height={20} alt="" src="https:/picsum.photos/200/200" />
                                            <span>Youtube</span>
                                        </div>
                                    }]} />

                                    <span {...label}>Status</span>
                                    <Select placeholder="Select status" options={[{ value: 'sample', label: <span>Scheduling</span> }]} />
                                    <span {...label}>Loop</span>
                                    <Checkbox >Only</Checkbox>
                                    <Checkbox >Infinity</Checkbox>
                                    <div className="border-b"></div>
                                    <span {...label} ></span>
                                    <DatePicker placeholder="Start date" />
                                    <DatePicker placeholder="End date" />
                                </div>
                            </div>
                        </Sider>


                    </Layout>

                </Content>

            </Layout>
    );
}

export default AdminLayout
