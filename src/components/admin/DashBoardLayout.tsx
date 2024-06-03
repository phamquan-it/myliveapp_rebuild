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
import { deleteCookie } from "cookies-next";
import { ToastContainer } from "react-toastify";
import LocaleSwitcher from "@/LocaleSwitcher";

const { Header, Sider, Content } = Layout;

interface DashBoardLayoutLayout {
  children: ReactNode;
}
const DashBoardLayout: React.FC<DashBoardLayoutLayout> = ({ children }) => {
  const t = useTranslations("DashboardMenu");
  const items_menu = [
    {
      key: "1",
      icon: <HomeFilled />,
      label: t("home"),
      page: "/dashboard",
    },

    {
      key: "3",
      icon: <FaListUl />,
      label: t("services"),
      page: "/dashboard/service",
    },
    {
      key: "4",
      icon: <FaMoneyBill />,
      label: "Cash flow",
      page: "/dashboard/cashflow",
    },
    {
      key: "5",
      icon: <TbCategoryFilled />,
      label: t("category"),
      page: "/dashboard/category",
    },
    {
      key: "6",
      icon: <FundOutlined />,
      label: t("refund"),
      page: "/dashboard/refund",
    },
    {
      key: "2",
      icon: <HistoryOutlined />,
      label: t("payment"),
      page: "/dashboard/payment",
    },
    {
      key: "7",
      icon: <HistoryOutlined />,
      label: t("paymenthistory"),
      page: "/dashboard/payment/history",
    },
    {
      key: "15",
      icon: <CalendarFilled />,
      label: t("platform"),
      page: "/dashboard/platform",
    },
    {
      key: "8",
      icon: <CalendarFilled />,
      label: "Crond",
      page: "/dashboard/crond",
    },
    {
      key: "9",
      icon: <FaBuyNLarge />,
      label: t("order"),
      page: "/dashboard/order",
    },
    {
      key: "10",
      icon: <TeamOutlined />,
      label: t("user"),
      page: "/dashboard/user",
    },
    {
      key: "11",
      icon: <UserOutlined />,
      label: t("userprofile"),
      page: "/dashboard/user/info",
    },

    {
      key: "12",
      icon: <SettingOutlined />,
      label: t("Settings"),
      page: "/dashboard/settings",
    },
    {
      key: "13",
      icon: <FaVolumeOff />,
      label: "Voucher",
      page: "/dashboard/voucher",
    },
    {
      key: "14",
      icon: <DiffOutlined />,
      label: "Log",
      page: "/dashboard/log",
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [defaultMenuActive, setDefaultMenuActive] = useState<string[]>([]);
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
    items_menu.map((item) => {
      if (item.page == router.asPath) setDefaultMenuActive([item.key]);
    });
  }, []);

  return (
    <Layout style={{ height: "100vh" }} className="!bg-white">
      <ToastContainer />
      <div className="">
        <div
          className={`px-3 py-3 pt-5 text-gray-600 absolute z-30 bg-white ${
            collapsed ? "hidden" : "block"
          }`}
        >
          <Title level={3} className="!mb-0 !pb-0">
            Pham Quan
          </Title>
          <p>quanqqq11@gmail.com</p>
        </div>
        <div
          className={`bg-white h-full custom-scrollbar ${
            collapsed ? "overflow-y-hidden" : "overflow-y-scroll"
          }  `}
        >
          <Sider
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
                <div className="bg-blue-100 flex justify-between p-3 ">
                  <span className="text-gray-700">Funds</span>
                  <span className="text-blue-500">$0</span>
                </div>
                <div className=" flex justify-between p-3">
                  <span className="text-gray-700">Inprogess</span>
                  <span className="text-blue-900">$0</span>
                </div>
              </div>
              <div className="mx-3 grid gap-2">
                <Button
                  type="primary"
                  icon={<PlusCircleFilled />}
                  onClick={() => {
                    router.push("/dashboard/order/new-order");
                  }}
                >
                  {t("neworder")}
                </Button>
                <Button
                  onClick={() => {
                    router.push("/dashboard/deposit");
                  }}
                  type="primary"
                  className="!bg-green-600"
                  icon={<PlusCircleFilled />}
                >
                  Deposit
                </Button>
              </div>
            </div>
            <Menu
              theme="light"
              mode="inline"
              selectedKeys={defaultMenuActive}
              // defaultSelectedKeys={defaultMenuActive}
              onClick={(e) => {
                items_menu.map((item: any) => {
                  if (e.key == item.key) {
                    router.push(item.page);
                  }
                });
              }}
              items={items_menu}
            />
          </Sider>
          <div className="grid pb-8">
            <Button
              className={`${!collapsed ? "!mx-3" : "!hidden"}`}
              onClick={() => {
                deleteCookie("token");
                router.push("/login");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      <Layout className="">
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="-ms-1"
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
              <span style={{ color: "purple" }}>LiveLogo</span>
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
