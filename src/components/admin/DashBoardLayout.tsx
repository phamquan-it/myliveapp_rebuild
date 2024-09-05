import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
    BellOutlined,
    CalendarFilled,
    CameraFilled,
    CloudServerOutlined,
    DiffOutlined,
    FundOutlined,
    HistoryOutlined,
    HomeFilled,
    JavaScriptOutlined,
    KeyOutlined,
    MenuOutlined,
    PlusCircleFilled,
    SettingOutlined,
    SignalFilled,
    TeamOutlined,
    UserOutlined,
    WifiOutlined,
    WindowsFilled,
    WindowsOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, Modal, theme, Tooltip } from "antd";
import { useRouter } from "next/router";
import { TbCategoryFilled } from "react-icons/tb";
import {
    FaBuyNLarge,
    FaCamera,
    FaListUl,
    FaMoneyBill,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import Title from "antd/es/typography/Title";
import { deleteCookie, getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import LocaleSwitcher from "@/LocaleSwitcher";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";
import axiosInstance from "@/apiClient/axiosConfig";
import CreateAutolive from "../autolive/CreateAutolive";
import CreateStreamByAdmin from "../live-streams/CreateStreamByAdmin";
import Link from "next/link";
import { DashboardRouter } from "@/enums/router/dashboard";
import CreateStream from "@/pages/CreateStream";

const { Header, Sider, Content } = Layout;

interface DashBoardLayoutLayout {
    children?: ReactNode;
}
const DashBoardLayout: React.FC<DashBoardLayoutLayout> = ({ children }) => {
    const [role, setRole] = useState("user");
    useEffect(() => {
        try {
            const data: any = jwtDecode(getCookie("token") ?? "");
            setRole(data?.role);
        } catch (error) { }
    }, []);

    const t = useTranslations("DashboardMenu");

    const items_menu = [
        {
            key: DashboardRouter.HOME,
            icon: <HomeFilled className="!text-lg" />,
            label: <Link href={DashboardRouter.HOME}>{t('home')}</Link>,
            role: "admin",
        },

        {
            key: DashboardRouter.SERVICE,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.SERVICE}>{t('services')}</Link>,
            role: "user",
        },
        {
            key: DashboardRouter.REFUND,
            icon: <FundOutlined />,
            role: "admin",
            label: <Link href={DashboardRouter.REFUND}>{t('refund')}</Link>,
        },
        {
            key: DashboardRouter.CASHFLOW,
            icon: <FaMoneyBill />,
            label: <Link href={DashboardRouter.CASHFLOW}>{t('cashflow')}</Link>,
            role: "admin",
        },
        {
            key: DashboardRouter.MYAUTOLIVE,
            icon: <SignalFilled />,
            label: <Link href={DashboardRouter.MYAUTOLIVE}>{t('myautolive')}</Link>,
            role: "user",
        },
        {
            key: DashboardRouter.PAYMENT_HISTORY,
            icon: <HistoryOutlined />,
            role: "admin",
            label: <Link href={DashboardRouter.PAYMENT_HISTORY}>{t('paymenthistory')}</Link>,
        },
        {
            key: DashboardRouter.PLATFORM,
            icon: <WindowsFilled />,
            role: "admin",
            label: <Link href={DashboardRouter.PLATFORM}>{t('platform')}</Link>,
        },
        {
            key: DashboardRouter.CRON,
            icon: <CalendarFilled />,
            label: <Link href={DashboardRouter.CRON}>{t('cron')}</Link>,
        },
        {
            key: DashboardRouter.ORDER,
            icon: <FaBuyNLarge />,
            label: <Link href={DashboardRouter.ORDER}>{t('order')}</Link>,
            role: "user",
        },
        {
            key: DashboardRouter.USER,
            icon: <TeamOutlined />,
            label: <Link href={DashboardRouter.USER}>{t('user')}</Link>,
            role: "user",
        },
        {
            key: DashboardRouter.LIVESTREAM,
            icon: <FaListUl />,
            label: <Link href={DashboardRouter.LIVESTREAM}>{('Live streams')}</Link>,
            role: "admin",
        },
        {
            key: "16",
            icon: <CloudServerOutlined />,
            label: "Vps",
            role: "admin",
            children: [
                {
                    key: DashboardRouter.VPS,
                    icon: <CloudServerOutlined />,
                    label: <Link href={DashboardRouter.VPS}>{('Vps')}</Link>,
                    role: "admin",
                },
                {
                    key: DashboardRouter.PUBLICKEY,
                    icon: <KeyOutlined />,
                    label: <Link href={DashboardRouter.PUBLICKEY}>{('Public key')}</Link>,
                    role: "admin",
                },
                {
                    key: DashboardRouter.ACCOUNT_SCRIPT,
                    icon: <JavaScriptOutlined />,
                    label: <Link href={DashboardRouter.ACCOUNT_SCRIPT}>{('Account script')}</Link>,
                    role: "admin",
                },
                {
                    key: DashboardRouter.SCRIPT_LIBRARY,
                    icon: <>&gt;_&nbsp; &nbsp;</>,
                    label: <Link href={DashboardRouter.SCRIPT_LIBRARY}>{('Script library')}</Link>,
                    role: "admin",
                },

            ]
        },
        {
            key: DashboardRouter.USER_PROFILE,
            icon: <UserOutlined />,
            label: <Link href={DashboardRouter.USER_PROFILE}>{t('userprofile')}</Link>,
            role: "user"
        },

        {
            key: DashboardRouter.SETTING,
            icon: <SettingOutlined />,
            role: "admin",
            label: <Link href={DashboardRouter.SETTING}>{t('Settings')}</Link>,
        },

    ];
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [defaultMenuActive, setDefaultMenuActive] = useState<string[]>([]);
    const [activeKey, setActiveKey] = useState(["1"]);
    const router = useRouter();
    const token = getCookie("token");

    const { data } = useQuery({
        queryKey: ["info"],
        queryFn: () =>
            axiosInstance.get(`/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
    });


    const [isCreateStreamOpen, setIsCreateStreamOpen] = useState(false)
    const hideCreateStream = () => {
        setIsCreateStreamOpen(false);
    }
    const showCreateStream = () => {
        setIsCreateStreamOpen(true);
    }
    return (
        <Layout style={{ height: "100vh" }} className="!bg-white">
            <ToastContainer />
            <div className="border-r">
                <div
                    style={{ width: 250 }}
                    className={`px-6 py-3 pt-5 text-gray-600 absolute z-30 bg-white ${collapsed ? "hidden" : "block"
                        }`}
                >
                    <Title level={3} className="!mb-0 !pb-0">
                        {data?.data.name}
                    </Title>
                    <p>{data?.data.email}</p>
                </div>
                <div
                    className={`bg-white h-full custom-scrollbar ${collapsed ? "overflow-y-hidden" : "overflow-y-scroll"
                        }  `}
                    style={collapsed ? {} : {}}
                >
                    <Sider
                        id="right_menu_border"
                        width={250}
                        theme="light"
                        trigger
                        collapsible={false}
                        collapsed={collapsed}
                        className="!py-0"
                    >
                        <div className="demo-logo-vertical" />
                        <div className={`${collapsed ? "hidden" : "block"}`}>
                            <div style={{ height: 100 }}></div>
                            <div className="my-2 border mx-3 rounded-md font-semibold">
                                <div
                                    className="bg-blue-100 flex justify-between p-3 "
                                    style={{ fontSize: "small" }}
                                >
                                    <span className="text-gray-700">{t("funds")}</span>
                                    <span className="text-blue-500">$0</span>
                                </div>
                                <div
                                    className=" flex justify-between p-3"
                                    style={{ fontSize: "small" }}
                                >
                                    <span className="text-gray-700">{t("inprogress")}</span>
                                    <span className="text-blue-900">0</span>
                                </div>
                            </div>
                            <div className="mx-3 grid gap-2">
                                <Button
                                    type="primary"
                                    className="!h-10"
                                    style={{ fontSize: "small" }}
                                    icon={<PlusCircleFilled />}
                                    onClick={() => {
                                        router.push("/dashboard/order/new-order");
                                    }}
                                >
                                    {t("neworder")}
                                </Button>
                                <Button
                                    style={{ fontSize: "small" }}
                                    onClick={() => {
                                        router.push("/dashboard/deposit");
                                    }}
                                    type="primary"
                                    className="!bg-green-600 !h-10"
                                    icon={<PlusCircleFilled />}
                                >
                                    {t("deposit")}
                                </Button>
                            </div>
                        </div>
                        <Menu
                            className="!text-sm !font-medium"
                            theme="light"
                            mode="inline"
                            defaultSelectedKeys={[router.pathname]}
                            items={items_menu.filter((item: any) => {
                                if (role != "admin") return role == item.role;
                                else return true;
                            })}
                        />
                    </Sider>
                    <div className={`grid pb-8 ${collapsed ? "!hidden" : "px-3"}`}>
                        <Button
                            onClick={() => {
                                deleteCookie("token");
                                router.push("/login");
                            }}
                        >
                            {t("logout")}
                        </Button>
                    </div>
                </div>
            </div>
            <Layout className="">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    className=" border"
                >
                    <div className="flex">
                        <Button
                            type="text"
                            icon=<MenuOutlined />
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div className="w-full flex justify-between pe-10">
                            <span style={{ color: "" }}>LiveLogo</span>
                            <div className="flex items-center gap-2">
                                <CreateStream />
                                <LocaleSwitcher />
                            </div>
                        </div>


                    </div>
                </Header>
                <Content
                    style={{
                        padding: "30px 20px",
                        overflowY: "scroll",
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};


export default DashBoardLayout;
