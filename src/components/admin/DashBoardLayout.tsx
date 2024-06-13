import React, { ReactNode, useEffect, useState } from "react";
import {
  CalendarFilled,
  DiffOutlined,
  FundOutlined,
  HistoryOutlined,
  HomeFilled,
  MenuOutlined,
  PlusCircleFilled,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, theme } from "antd";
import { useRouter } from "next/router";
import { TbCategoryFilled } from "react-icons/tb";
import {
  FaBuyNLarge,
  FaListUl,
  FaMoneyBill,
  FaVolumeOff,
} from "react-icons/fa";
import { useTranslations } from "next-intl";
import Title from "antd/es/typography/Title";
import { deleteCookie, getCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import LocaleSwitcher from "@/LocaleSwitcher";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/apiClient/axiosClient";

const { Header, Sider, Content } = Layout;

interface DashBoardLayoutLayout {
  children: ReactNode;
}
const DashBoardLayout: React.FC<DashBoardLayoutLayout> = ({ children }) => {
  console.log("re-render");
  const [role, setRole] = useState("user");
  useEffect(() => {
    try {
      const data: any = jwtDecode(getCookie("token") ?? "");
      setRole(data?.role);
    } catch (error) {}
  }, []);
  console.log(role);

  const t = useTranslations("DashboardMenu");
  const items_menu = [
    {
      key: "1",
      icon: <HomeFilled className="!text-lg" />,
      label: t("home"),
      role: "admin",
      page: "/dashboard",
    },

    {
      key: "3",
      icon: <FaListUl />,
      label: t("services"),
      role: "user",
      page: "/dashboard/service",
    },
    {
      key: "5",
      icon: <TbCategoryFilled />,
      label: t("category"),
      role: "admin",
      page: "/dashboard/category",
    },
    {
      key: "6",
      icon: <FundOutlined />,
      role: "admin",
      label: t("refund"),
      page: "/dashboard/refund",
    },
    {
      key: "4",
      icon: <FaMoneyBill />,
      label: t("cashflow"),
      role: "admin",
      page: "/dashboard/cashflow",
    },
    {
      key: "2",
      icon: <HistoryOutlined />,
      label: t("payment"),
      role: "admin",
      page: "/dashboard/payment",
    },
    {
      key: "7",
      icon: <HistoryOutlined />,
      role: "admin",
      label: t("paymenthistory"),
      page: "/dashboard/payment/history",
    },
    {
      key: "15",
      icon: <CalendarFilled />,
      role: "admin",
      label: t("platform"),
      page: "/dashboard/platform",
    },
    {
      key: "8",
      icon: <CalendarFilled />,
      label: t("cron"),
      page: "/dashboard/crond",
    },
    {
      key: "9",
      icon: <FaBuyNLarge />,
      label: t("order"),
      role: "user",
      page: "/dashboard/order",
    },
    {
      key: "10",
      icon: <TeamOutlined />,
      label: t("user"),
      role: "user",
      page: "/dashboard/user",
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: t("userprofile"),
      role: "user",
      page: "/dashboard/user/info",
    },

    {
      key: "12",
      icon: <SettingOutlined />,
      role: "admin",
      label: t("Settings"),
      page: "/dashboard/settings",
    },
    {
      key: "13",
      icon: <FaVolumeOff />,
      label: t("voucher"),
      role: "admin",
      page: "/dashboard/voucher",
    },
    {
      key: "14",
      icon: <DiffOutlined />,
      label: t("log"),
      role: "admin",
      page: "/dashboard/log",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [defaultMenuActive, setDefaultMenuActive] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState();
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
    items_menu.map((item) => {
      if (item.page == router.asPath) setDefaultMenuActive([item.key]);
    });
  }, []);
  const token = getCookie("token");

  const { data } = useQuery({
    queryKey: ["info"],
    queryFn: () =>
      axiosClient.get(`/user/info?language=${router.locale}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  useEffect(() => {
    console.log(collapsed);
  }, [collapsed]);
  return (
    <Layout style={{ height: "100vh" }} className="!bg-white">
      <ToastContainer />
      <div className="">
        <div
          style={{ width: 250 }}
          className={`px-6 py-3 pt-5 text-gray-600 absolute z-30 bg-white ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <Title level={3} className="!mb-0 !pb-0">
            {data?.data.data.name}
          </Title>
          <p>{data?.data.data.email}</p>
        </div>
        <div
          className={`bg-white h-full custom-scrollbar ${
            collapsed ? "overflow-y-hidden" : "overflow-y-scroll"
          }  `}
          style={collapsed ? {} : {}}
        >
          <Sider
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
                  className="!bg-green-600"
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
              selectedKeys={activeKey}
              // defaultSelectedKeys={defaultMenuActive}
              onClick={(e) => {
                items_menu.map((item: any) => {
                  if (e.key == item.key) {
                    setActiveKey(item.key);
                    router.push(item.page);
                  }
                });
              }}
              // data?.data.data.map((item: any, index: number) => ({
              //   ...item,
              //   key: pageIndex * 10 + (index + 1) - 10,
              // }))}
              items={items_menu.filter((item: any) => {
                if (role != "admin") return role == item.role;
                else return true;
              })}
            />
          </Sider>
          <div className={`grid pb-8 ${collapsed ? "!hidden" : "px-3"}`}>
            <Button
              className="!text-sm"
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
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 0px 16px 10px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
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
