import React from 'react';
import { IoIosLogOut } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import { Button, ConfigProvider, Flex, Layout, Menu, MenuProps, Image, Avatar, Table, Dropdown, Input } from 'antd';
import { AppstoreOutlined, FundOutlined, HistoryOutlined, HomeFilled, MailOutlined, PlusOutlined, SettingOutlined, SignalFilled, UserOutlined, WindowsFilled } from '@ant-design/icons';
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
const { Header, Footer, Sider, Content } = Layout;

const DashBoardLayout = () => {
    type MenuItem = Required<MenuProps>['items'][number];
    const t = useTranslations("DashboardMenu");

    const items: MenuItem[] = [
        {
            key: 'sub1',
            label: <Link className="">Home</Link>,
            icon: <HomeFilled className="!text-lg" />,
        },
        {
            key: 'sub2',
            label: <Link className="">Services</Link>,
            icon: <FaListUl />,
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
                                            <Button type="default" size="small" icon={<IoIosLogOut />}>Logout</Button>

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
                        <Layout >
                            <Header className='border-b border-s'>
                                <div className="h-full flex items-center justify-between">
                                    <Button type="default" icon={<BsFilterLeft />} size="large"></Button>
                                    <div>
                                        <SearchInput/>
                                    </div>
                                </div>
                            </Header>
                            <Content style={{
                                padding: 10
                            }}>
                                <UserTable />
                            </Content>
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

