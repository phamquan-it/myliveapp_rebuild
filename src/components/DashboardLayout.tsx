import React, { ReactNode, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import { Button, ConfigProvider, Flex, Layout, Menu, MenuProps, Image, Avatar, Table, Dropdown, Input, Select, List, Card, Radio, DatePicker } from 'antd';
import { AppstoreOutlined, CloseOutlined, FilterFilled, FundOutlined, HistoryOutlined, HomeFilled, MailOutlined, PlusOutlined, SettingOutlined, SignalFilled, UserOutlined, WindowsFilled } from '@ant-design/icons';
import { FaBuyNLarge, FaListUl, FaMoneyBill, FaServer, FaSubscript, FaUbuntu } from 'react-icons/fa';
import { DashboardRouter } from '@/enums/router/dashboard';
import { useTranslations } from 'next-intl';
import Link from "next/link";
import { GetStaticPropsContext } from 'next';
import { VscSettings } from 'react-icons/vsc';
import Title from 'antd/lib/typography/Title';
import UserTable from '@/components/newui/UserTable';
import { ColumnsType } from 'antd/es/table';
import SearchInput from '@/components/filters/SearchInput';
import CashflowTable from '@/components/cashflowTable';
import ServiceList from '@/components/service';
import VpsTable from '@/components/admin/vps/VpsTable';
import AutoLiveTable from '@/components/autolive/AutoLiveTable';
import LocaleSwitcher from '@/LocaleSwitcher';
const { Header, Footer, Sider, Content } = Layout;
interface DashBoardLayoutProps {
    children: ReactNode
}
const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({ children }) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const t = useTranslations("DashboardMenu");

    const items: MenuItem[] = [
        {
            key: DashboardRouter.HOME,
            icon: <HomeFilled className="!text-lg" />,
            label: <Link href={DashboardRouter.HOME}>{('Home')}</Link>,
        },
        {
            key: DashboardRouter.SERVICE,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.SERVICE}>{('Services')}</Link>,
        },
        {
            key: DashboardRouter.MYAUTOLIVE,
            icon: <SignalFilled />,
            label: <Link href={DashboardRouter.MYAUTOLIVE}>{('My autolive')}</Link>,
        },
        {
            key: DashboardRouter.PLATFORM,
            icon: <WindowsFilled />,
            label: <Link href={DashboardRouter.PLATFORM}>{('Platforms')}</Link>,
        },

        {
            type: 'divider',
        },
        {
            key: DashboardRouter.ORDER,
            icon: <FaBuyNLarge />,
            label: <Link href={DashboardRouter.ORDER}>{('Orders')}</Link>,
        },
        {
            key: DashboardRouter.PAYMENT_HISTORY,
            icon: <HistoryOutlined />,
            label: <Link href={DashboardRouter.PAYMENT_HISTORY}>{('Payment history')}</Link>,
        },
        {
            key: DashboardRouter.CASHFLOW,
            icon: <FaMoneyBill />,
            label: <Link href={DashboardRouter.CASHFLOW}>{('Cashflows')}</Link>,
        },
        {
            key: DashboardRouter.REFUND,
            icon: <FundOutlined />,
            label: <Link href={DashboardRouter.REFUND}>{('Refunds')}</Link>,
        },
        {
            key: DashboardRouter.LIVESTREAM,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.LIVESTREAM}>{('Live streams')}</Link>,
        },
        {
            key: DashboardRouter.USER,
            icon: <UserOutlined />,
            label: <Link href={DashboardRouter.USER}>{('Users')}</Link>,
        },
        {
            type: 'divider',
        },
        {
            key: DashboardRouter.SETTING,
            label: <Link href={DashboardRouter.SETTING}>{('Settings')}</Link>,
            icon: <SettingOutlined />,
        },

        {
            key: DashboardRouter.ADVANDED_CONFIG,
            icon: <VscSettings />,
            label: <Link href={DashboardRouter.ADVANDED_CONFIG}>{('AdvancedConfig')}</Link>,
        },

        {
            key: 'grp',
            label: 'Vps',
            type: 'group',
            children: [
                {
                    key: 'sub4',
                    label: <Link href={DashboardRouter.VPS}>{('Vps')}</Link>,
                    icon: <FaServer />,
                },
                {
                    key: 'scrip',
                    label: <Link href={DashboardRouter.SCRIPT_SETUP}>{('Script setup')}</Link>,
                    icon: <FaUbuntu />,
                },

            ]
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const [newOrderText, setNewOrderText] = useState("New order")

    const [filterOpen, setFilterOpen] = useState(true)
    return <>
        <ConfigProvider theme={{
            components: {
                Layout: {
                    headerBg: "#FFF",
                    headerPadding: 17
                }
            }

        }}>
            <Layout className="h-screen " >
                <Header className="border-b">
                    <div className="flex justify-between items-center h-full">

                        <div className="h-full flex items-center">
                            <Image height={40} alt="" src="/assets/livestreams.webp" />
                            <div className="h-full">
                                <Title className="h-full !text-sky-500" level={3}>LiveStreams</Title>
                            </div>
                        </div>
                        <div className="p-3 flex justify-center gap-2 items-center">
                            <LocaleSwitcher/>
                            <Dropdown trigger={['click']} dropdownRender={() => <>
                                <div className="border bg-white py-3 rounded w-64">
                                    <div className="px-3 pb-3">
                                        <Title level={5} className="!mb-0">Pham Quan</Title>
                                        <p className="text-slate-600">c2202lm.pmquan@aptech.vn</p>
                                    </div>
                                    <ConfigProvider theme={{
                                        components: {
                                            Table: {
                                                cellPaddingBlock: 5
                                            }
                                        }
                                    }}>
                                        <Table dataSource={dataSource} columns={columns} showHeader={false} pagination={false} />
                                        <div className="px-2 pt-3 flex justify-end gap-2">
                                            <Button type="primary" size="small">Deposit</Button>
                                            <Button type="default" size="small" >Logout</Button>

                                        </div>
                                    </ConfigProvider>
                                </div>
                            </>} placement="bottomLeft">
                                <Avatar size={40} icon={<UserOutlined />} />
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider theme="light"
                        onChange={(e) => {
                            console.log(e)
                        }} onCollapse={(collaped) => {
                            setNewOrderText(collaped ? "" : "New order")
                        }}
                        style={{
                            overflowY: 'auto',
                            scrollbarWidth: "thin"
                        }}
                        collapsible
                    >
                        <div className="p-3">
                            <Button type="default"
                                icon={<PlusOutlined />}
                                className="w-50 shadow " block size="large">
                                <span className="!text-semibold !font-sans">
                                    {newOrderText}
                                </span>
                            </Button>
                        </div>
                        <Menu
                            onClick={onClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items} className="font-sans"
                        />
                    </Sider>
                    <Content>

                        <Layout className="h-full">
                            <Header className='border-b border-s'>
                                <div className="h-full flex items-center justify-between">
                                    <Button type="default" icon={<BsFilterLeft />} size="large" onClick={() => {
                                        setFilterOpen(!filterOpen)
                                    }}></Button>
                                    <div>
                                        <SearchInput />
                                    </div>
                                </div>
                            </Header>
                            <Layout>
                                <Content style={{
                                    padding: 10,
                                    overflow: "auto",
                                    scrollbarWidth: "thin"
                                }} className="font-serif ">
                                    {children}


                                </Content>
                                <Sider collapsedWidth={0} width="40%" collapsed={filterOpen} style={{
                                    backgroundColor: 'transparent'
                                }} >
                                    <div className="bg-white rounded m-3 p-3 shadow-md" style={{
                                        height: "95%"
                                    }}>

                                        <div className="flex justify-between">
                                            <Title level={5}><FilterFilled />Filters</Title>
                                            <Button type="default" className="border-none" icon={<CloseOutlined />} onClick={() => {
                                                setFilterOpen(true)
                                            }}>

                                            </Button>
                                        </div>
                                    </div>
                                </Sider>
                            </Layout>
                        </Layout>



                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    </>
}

export default DashBoardLayout

const dataSource = [
    {
        key: '1',
        name: 'Total',
        age: 32,
    },
    {
        key: '2',
        name: 'Remains',
        age: 42,
    },
];

const columns: ColumnsType<any> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: string) => (<div className="font-semibold">{text}</div>)
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        align: "right",
        render: (text) => (<span className="font-semibold">
            {text}$
        </span>)
    },
];

