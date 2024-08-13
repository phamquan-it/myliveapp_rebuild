import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
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
            key: "/dashboard",
            icon: <HomeFilled className="!text-lg" />,
            label: t("home"),
            role: "admin",
        },

        {
            key: "/dashboard/service",
            icon: <FaListUl />,
            label: t("services"),
            role: "user",
        },
        {
            key: "/dashboard/category",
            icon: <TbCategoryFilled />,
            label: t("category"),
            role: "admin",
        },
        {
            key: "/dashboard/refund",
            icon: <FundOutlined />,
            role: "admin",
            label: t("refund"),
        },
        {
            key: "/dashboard/cashflow",
            icon: <FaMoneyBill />,
            label: t("cashflow"),
            role: "admin",
        },
        {
            key: "/dashboard/myautolive",
            icon: <SignalFilled />,
            label: t('myautolive'),
            role: "user",
        },
        {
            key: "/dashboard/payment/history",
            icon: <HistoryOutlined />,
            role: "admin",
            label: t("paymenthistory"),
        },
        {
            key: "/dashboard/platform",
            icon: <WindowsFilled />,
            role: "admin",
            label: t("platform"),
        },
        {
            key: "/dashboard/crond",
            icon: <CalendarFilled />,
            label: t("cron"),
        },
        {
            key: "/dashboard/order",
            icon: <FaBuyNLarge />,
            label: t("order"),
            role: "user",
        },
        {
            key: "/dashboard/user",
            icon: <TeamOutlined />,
            label: t("user"),
            role: "user",
        },


        {
            key: "16",
            icon: <CloudServerOutlined />,
            label: "Vps",
            role: "admin",
            children: [
               
                {
                    key: "/dashboard/vps",
                    icon: <CloudServerOutlined />,
                    label: "Vps",
                    role: "admin",
                },
                {
                    key: "/dashboard/publickey",
                    icon: <KeyOutlined />,
                    label: "Public key",
                    role: "admin",
                },
                {
                    key: "/dashboard/account-script",
                    icon: <JavaScriptOutlined />,
                    label: "Account script",
                    role: "admin",
                },
                {
                    key: "/dashboard/script_library",
                    icon: <>&gt;_&nbsp; &nbsp;</>,
                    label: " Script library",
                    role: "admin",
                },

            ]

        },
        {
            key: "/dashboard/user/info",
            icon: <UserOutlined />,
            label: t("userprofile"),
            role: "user"
        },

        {
            key: "/dashboard/settings",
            icon: <SettingOutlined />,
            role: "admin",
            label: t("Settings"),
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
                            onClick={(e) => {
                                router.push(e.key)
                            }}
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
                                <Modal title="Create stream" open={isCreateStreamOpen} footer={[]} onCancel={hideCreateStream}>
                                    <CreateAutolive/>   
                                </Modal>
                                <Tooltip title="Create new stream">
                                    <Button type="primary" icon={<PlusCircleFilled />} onClick={showCreateStream}></Button>
                                </Tooltip>


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
