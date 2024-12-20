import { Inter } from "next/font/google";
import { Button, Checkbox, DatePicker, Divider, Input, Menu, MenuProps, Modal, Radio, Select, Table, TableProps, Image, Breadcrumb, BreadcrumbProps, Dropdown, SelectProps, ConfigProvider } from "antd";
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
    const [filter, setFilter] = useState(false)

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            label: i.toString(36) + i,
            value: i.toString(36) + i,
        });
    }

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const handleDropdownVisibleChange = (visible: boolean) => {
        setFilter(visible); // Sync the visibility state with dropdown behavior
    };
    const selectProps: SelectProps = {
        style: {
            minWidth: 300
        },
        dropdownClassName: "!border-transparent",
      //  dropdownRender: (menu) => {
      //      console.log(menu)
      //      return (<>
      //          <div className="w-48 bg-white border rounded p-3">
      //              test
      //          </div>
      //      </>)
      //  },
        mode: "multiple",
        size: "large",
        open: filter,
        variant: "borderless",
        placeholder: "Filter",
        defaultValue: ['a10', 'c12'],
        onChange: handleChange,
        options,
        allowClear: true,
        popupClassName: " !w-64",
        onDropdownVisibleChange: handleDropdownVisibleChange,
    }
    return (
        <Layout className="bg-yellow-500 h-full" >
            <Header className="border-b overflow-hidden">
                <div className="flex justify-between h-full item-center">
                    <div className="flex items-center gap-2">

                        <Button type="default" icon={<BsFilterLeft />} size="large" onClick={() => {
                            setFilter(true)
                        }}></Button>
                        <div className="flex gap-2 !border-none">
                            <Select {...selectProps} />
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
                    <Content className={`p-2 ${filter ? 'overflow-auto' : 'overflow-hidden'}`} style={{
                        height: "calc(100vh - 130px)"
                    }}>
                        <Breadcrumb items={breadcrumbItems} />
                        <div className="pt-3 ">
                            {children}
                        </div>
                    </Content>
                </Layout>

            </Content>

        </Layout >
    );
}

export default AdminLayout
