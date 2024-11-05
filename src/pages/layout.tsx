import React, { ReactNode, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import { Button, ConfigProvider, Flex, Layout, Menu, MenuProps, Image, Avatar, Table, Dropdown, Input, Select, List, Card, Radio, DatePicker } from 'antd';
import { AppstoreOutlined, CloseOutlined, FilterFilled, FundOutlined, HistoryOutlined, HomeFilled, MailOutlined, PlusOutlined, SettingOutlined, SignalFilled, UserOutlined, WindowsFilled } from '@ant-design/icons';
import Link from 'antd/es/typography/Link';
import { FaBuyNLarge, FaListUl, FaMoneyBill, FaServer, FaSubscript, FaUbuntu } from 'react-icons/fa';
import { DashboardRouter } from '@/enums/router/dashboard';
import { useTranslations } from 'next-intl';
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
const { Header, Footer, Sider, Content } = Layout;
interface DashBoardLayoutProps{
    children: ReactNode
}
const DashBoardLayout:React.FC<DashBoardLayoutProps> = ({children}) => {
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
            key: DashboardRouter.PLATFORM,
            label: <Link href={DashboardRouter.PLATFORM}>{('Settings')}</Link>,
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
                    label: 'Vps',
                    icon: <FaServer />,
                },
                {
                    key: 'scrip',
                    label: 'Script setup',
                    icon: <FaUbuntu />,
                },

            ]
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    const [filterOpen, setFilterOpen] = useState(false)
    return <>
        <ConfigProvider theme={{
            components: {
                Layout: {
                    headerBg: "#FFF",
                    headerPadding: 17
                }
            }

        }}>
            <Layout className="h-screen">
                <Header className="border-b">
                    <div className="flex justify-between items-center h-full">

                        <div className="h-full flex items-center">
                            <Image height={50} alt="" src="/assets/livestreams.webp" />
                            <div className="h-full">
                                <Title className="h-full !text-sky-500" level={3}>LiveStreams</Title>
                            </div>
                        </div>
                        <div className="p-3">
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
                                <Avatar size={50} icon={<UserOutlined />} />
                            </Dropdown>
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider theme="light" style={{
                        overflowY: 'auto',
                        scrollbarWidth: "thin"
                    }}>
                        <div className="p-3">
                            <Button type="default"
                                icon={<PlusOutlined />}
                                className="w-50 shadow " block size="large">
                                <span className="!text-semibold">
                                    New order
                                </span>
                            </Button>
                        </div>
                        <Menu
                            onClick={onClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={items}
                            className="font-semibold"
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
                                }}>
                                    {children}
                                    <AutoLiveTable/>
                                    <VpsTable/>
                                    <ServiceList />

                                    <div className="py-3">
                                        <CashflowTable />
                                    </div>
                                    <UserTable />

                                    <List
                                        grid={{
                                            gutter: 16,
                                            xs: 1,
                                            sm: 2,
                                            md: 4,
                                            lg: 4,
                                            xl: 6,
                                            xxl: 6,
                                        }}
                                        dataSource={[
                                            {
                                                title: 'Ubuntu',
                                                icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUXYtZGaSVpgszvcdic5jZKt2rhQZqPGEng&s'
                                            },
                                            {
                                                title: 'Debian',
                                                icon: 'https://www.svgrepo.com/show/353640/debian.svg'
                                            },
                                            {
                                                title: 'CentOS',
                                                icon: 'https://static-00.iconduck.com/assets.00/centos-icon-2048x2048-39pfdqnc.png'
                                            },
                                            {
                                                title: 'Ferora',
                                                icon: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Fedora_icon_%282021%29.svg'
                                            },
                                            {
                                                title: 'Pop!_OS',
                                                icon: 'https://static-00.iconduck.com/assets.00/pop-os-icon-2048x2048-mjad7yws.png'
                                            },
                                            {
                                                title: 'Arch Linux',
                                                icon: "https://img.icons8.com/?size=48&id=uIXgLv5iSlLJ&format=png"
                                            },
                                        ]}
                                        renderItem={(item: any) => (
                                            <List.Item>
                                                <Card className="flex" hoverable>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            <Image width={50} src={item.icon} alt="" />
                                                            <Title level={3}>{item.title}</Title>
                                                        </div>

                                                    </div>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />

                                </Content>
                                <Sider collapsedWidth={0} width="300" collapsed={filterOpen} style={{
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
                                        <h1 className="text-slate-700 text-md font-semibold mb-1">Platform</h1>
                                        <Select options={[{ value: 'sample', label: <span>sample</span> }]} className="w-full" placeholder="Select platform" />
                                        <h1 className="text-slate-700 text-md font-semibold my-2 mb-1">Status</h1>
                                        <Select className="w-full" options={[{ value: 'initalize', label: <span>Initalize</span> }]} placeholder="Select status" />
                                        <h1 className="text-slate-700 text-md font-semibold my-2 mb-1">Date</h1>
                                        <DatePicker.RangePicker />
                                        <h1 className="text-slate-700 text-md font-semibold my-2 mb-1">User</h1>
                                        <Select className="w-full" placeholder="Select user" options={[{ value: 'sample', label: <span>quanqqq11@gmail.com</span> }]} />
                                        <h1 className="text-slate-700 text-md font-semibold my-2 mb-1">Vps</h1>
                                        <Select className="w-full" placeholder="Select vps" options={[{ value: 'sample', label: <span>livestream1</span> }]} />
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

