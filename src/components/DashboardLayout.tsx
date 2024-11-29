import React, { ReactNode, useState } from 'react';
import { IoIosLogOut } from "react-icons/io";
import { BsFilterLeft } from "react-icons/bs";
import { Button, ConfigProvider, Flex, Layout, Menu, MenuProps, Image, Avatar, Table, Dropdown, Input, Select, List, Card, Radio, DatePicker, Modal, Tooltip } from 'antd';
import { AppstoreOutlined, CloseOutlined, EditFilled, FilterFilled, FundOutlined, HistoryOutlined, HomeFilled, MailOutlined, PlusOutlined, SettingOutlined, SignalFilled, UserOutlined, WindowsFilled } from '@ant-design/icons';
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
import VpsTable from '@/components/admin/vps/VpsTable';
import AutoLiveTable from '@/components/autolive/AutoLiveTable';
import LocaleSwitcher from '@/LocaleSwitcher';
import NewOrder from './live-streams/new-order';
import { deleteCookie } from 'cookies-next';
import router from 'next/router';
import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { userPath } from '@/user_access/filterMenu';
import { isUser } from '@/user_access/checkrole';
import { useProfile } from '@/apiClient/providers/useProfile';
const { Header, Footer, Sider, Content } = Layout;
interface DashBoardLayoutProps {
    children: ReactNode
}
const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({ children }) => {


    const columns: ColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => (<div className="font-semibold">{text}</div>)
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            align: "right",
            render: (text) => (<span className="font-semibold">
                {text}$
            </span>)
        },
    ];

    type MenuItem = Required<MenuProps>['items'][number];
    const t = useTranslations("DashboardMenu");

    const items: MenuItem[] = [
        {
            key: DashboardRouter.HOME,
            icon: <HomeFilled className="!text-lg" />,
            label: <Link href={DashboardRouter.HOME}>{t('home')}</Link>,
        },
        {
            key: DashboardRouter.SERVICE,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.SERVICE}>{t('services')}</Link>,
        },
        {
            key: DashboardRouter.MYAUTOLIVE,
            icon: <SignalFilled />,
            label: <Link href={DashboardRouter.MYAUTOLIVE}>{t('myautolive')}</Link>,
        },

        {
            label: "Manage",
            type: "group",
            children: [
                {
                    type: 'divider',
                },
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
                {
                    key: DashboardRouter.SETTING,
                    label: <Link href={DashboardRouter.SETTING}>{t('Settings')}</Link>,
                    icon: <SettingOutlined />,
                },
                {
                    key: DashboardRouter.ADVANDED_CONFIG,
                    icon: <VscSettings />,
                    label: <Link href={DashboardRouter.ADVANDED_CONFIG}>{t('advancedConfig')}</Link>,
                },
            ]
        },

        {
            type: 'divider',
        },
        {
            key: DashboardRouter.PLATFORM,
            icon: <WindowsFilled />,
            label: <Link href={DashboardRouter.PLATFORM}>{t('platform')}</Link>,
        },
        {
            key: DashboardRouter.PAYMENT_HISTORY,
            icon: <HistoryOutlined />,
            label: <Link href={DashboardRouter.PAYMENT_HISTORY}>{t('paymenthistory')}</Link>,
        },
        {
            key: DashboardRouter.CASHFLOW,
            icon: <FaMoneyBill />,
            label: <Link href={DashboardRouter.CASHFLOW}>{t('cashflow')}</Link>,
        },
        {
            key: DashboardRouter.REFUND,
            icon: <FundOutlined />,
            label: <Link href={DashboardRouter.REFUND}>{t('refund')}</Link>,
        },
        {
            key: DashboardRouter.LIVESTREAM,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.LIVESTREAM}>{t('livestreams')}</Link>,
        },
        {
            key: DashboardRouter.USER,
            icon: <UserOutlined />,
            label: <Link href={DashboardRouter.USER}>{t('user')}</Link>,
        },
    ];

    const { data, isSuccess } = useProfile()
    console.log("user:", data?.data)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };
    const [newOrderText, setNewOrderText] = useState(t('neworder'))
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [filterOpen, setFilterOpen] = useState(true)

    const dataSource = [
        {
            key: '1',
            name: 'Total',
            value: data?.data?.total,
        },
        {
            key: '2',
            name: 'Remains',
            value: data?.data?.remains,
        },
    ];
    const m = useTranslations("MyLanguage")
    return <>
        <ConfigProvider theme={{
            components: {
                Layout: {
                    headerBg: "#FFF",
                    headerPadding: 17
                }
            }

        }}>
            <Layout className="h-screen" >
                <Header className="border-b">
                    <div className="flex justify-between items-center h-full">

                        <div className="h-full flex items-center">
                            <Image height={40} alt="" src="/assets/livestreams.webp" />
                            <div className="h-full">
                                <Title className="h-full !text-sky-500" level={3}>LiveStreams</Title>
                            </div>
                        </div>
                        <div className="p-3 flex justify-center gap-2 items-center">
                            <div className="hidden h-full sm:flex items-center">
                                <LocaleSwitcher />
                            </div>
                            <Dropdown trigger={['click']} dropdownRender={() => <>
                                <div className="border bg-white py-3 rounded w-64">
                                    <div className="px-2 sm:hidden">
                                        <LocaleSwitcher />
                                    </div>
                                    <div className="px-3 pb-3 font-sans">
                                        <div className="flex justify-between">
                                            <Title level={5} className="!mb-0 !font-sans">{data?.data?.name}</Title>
                                            <Tooltip title="Edit profile">
                                                <Button type="default" size="small" icon={<EditFilled />} shape="circle" onClick={() => {
                                                    router.push('/dashboard/user/info')
                                                }}></Button>
                                            </Tooltip>
                                        </div>
                                        <p className="text-slate-600">{data?.data?.email}</p>
                                    </div>
                                    <ConfigProvider theme={{
                                        components: {
                                            Table: {
                                                cellPaddingBlock: 5
                                            }
                                        }
                                    }}>
                                        <Table dataSource={dataSource} rowKey='name' columns={columns} showHeader={false} pagination={false} rowClassName="font-sans" />
                                        <div className="px-2 pt-3 flex justify-end gap-2">
                                            <Button type="primary" className="font-sans" size="small">Deposit</Button>
                                            <Button type="default" className="font-sans" size="small" onClick={() => {
                                                deleteCookie("token");
                                                router.push("/login");
                                            }}
                                            >Logout</Button>

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
                        breakpoint="lg"
                        collapsible
                        className="border-r"
                        onChange={(e) => {
                            console.log(e)
                        }} onCollapse={(collaped) => {
                            setNewOrderText(collaped ? "" : "New order")
                        }}
                        style={{
                            overflowY: 'auto',
                            scrollbarWidth: "thin"
                        }}
                    >
                        <div className="p-3">
                            <Button type="default"
                                icon={<PlusOutlined />}
                                className="w-50 shadow "
                                block
                                size="large"
                                onClick={() => {
                                    setIsModalOpen(true)
                                }}>
                                <span className="!text-semibold !font-sans">
                                    {newOrderText}
                                </span>
                            </Button>
                            <ul className="rounded border mt-3">
                                <li className="p-2 bg-sky-100">test</li>
                                <li className="p-2">dd</li>
                            </ul>
                        </div>

                        <Menu
                            onClick={onClick}
                            defaultSelectedKeys={[router.pathname]}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            items={(isUser(data)) ?
                                items.filter(item => item && userPath.includes(item.key as DashboardRouter)) : items
                            }
                            className="font-sans !border-r-0"
                        />
                    </Sider>
                    <Modal title={m('newOrder')} open={isModalOpen} onCancel={() => {
                        setIsModalOpen(false)
                    }} footer={[]} width={1000}>
                        <NewOrder role={data?.data?.role_id} />
                    </Modal>
                    <Content >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider>
    </>
}

export default DashBoardLayout


