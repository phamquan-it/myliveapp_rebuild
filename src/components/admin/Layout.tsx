import React, { ReactNode, useState } from 'react';
import {
  AppstoreOutlined,
  BellFilled,
  BellOutlined,
  CloudServerOutlined,
  CodeSandboxCircleFilled,
  ContainerOutlined,
  DesktopOutlined,
  HistoryOutlined,
  HomeTwoTone,
  KeyOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  OneToOneOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  SignalFilled,
  UserOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { Button, Dropdown, Image, Layout, Menu, MenuProps, Modal, theme, Tooltip } from 'antd';
import Head from 'next/head';
import { useTranslations } from 'next-intl';
import styles from '@/styles/app.module.css';
import { FaJs, FaSpaceShuttle } from 'react-icons/fa';
import { UserSetting } from '../UserSettings';
import LocaleSwitcher from '@/LocaleSwitcher';
import { useRouter } from 'next/router';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  { key: '/dashboard', icon: <PieChartOutlined />, label: 'Statistic' },
  { key: '/dashboard/my-service', icon: <DesktopOutlined />, label: 'My services' },
  { key: '/dashboard/order', icon: <ContainerOutlined />, label: 'Orders' },
  { key: '/dashboard/payment/history', icon: <HistoryOutlined />, label: 'Payment history' },
  { key: '/dashboard/cashflow', icon: <MoneyCollectOutlined />, label: 'Cashflow' },
  {
    key: 'sub1',
    label: 'Services',
    icon: <MailOutlined />,

    children: [
      { key: '/dashboard/platform', label: 'Platforms', icon:<WindowsFilled/> },
      { key: '/dashboard/category', label: 'Categories', icon:<AppstoreOutlined />},
      { key: '/dashboard/service', label: 'Services', icon:<OrderedListOutlined/> },
    ],
  },
  {
    key: 'vps',
    label: 'Vps',
    icon: <CloudServerOutlined />,
    children: [
      { key: '/dashboard/vps/autolive', label: 'Auto live', icon: <SignalFilled/> },
      { key: '/dashboard/vps/other', label: 'Other' , icon: <OneToOneOutlined/>},
      {
        key: '/dashboard/webdock',
        label: 'Webdock',
        icon: <CodeSandboxCircleFilled />,
        children: [
          { key: '11', label: 'Public key', icon: <KeyOutlined/> },
          { key: '12', label: 'Shell Terminal', icon: <>&gt;_ &nbsp;</> },
          { key: '13', label: 'Scripts library', icon: <FaJs/> },
          { key: '14', label: 'Option 14' },
        ],
      },
    ],
  },
];

const { Header, Sider, Content } = Layout;
interface AppProps {
  children: ReactNode
}
const AppLayout: React.FC<AppProps> = ({ children }) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [showModal,setShowModal] = useState(false)
  const t = useTranslations('PageLayout');
  return (
    <>
      <Head>
        <title>{[t('pageTitle')].join(' - ')}</title>
      </Head>
      <Layout className='max-h-screen h-screen'>

        <div
          style={{

            fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.5,

          }}
        ></div>
        <Sider trigger={null} collapsible collapsed={collapsed} className={`h-screen overflow-y-auto ${styles.customScrollbar}`} width={220}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[`${router.pathname}`]}
            items={items}
            defaultOpenKeys={['sub1','vps']}
            onClick={(e)=>{
              router.push(`${e.key}`)
            }}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} className='flex items-center justify-between'>
            <div className='flex items-center'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <Image width={100}
              preview={false}
              src="/assets/next.svg"
              alt=''
            />
            </div>
            <div className='flex items-center gap-2 justify-center'>
            <div className="w-full flex justify-between pe-10">
             
              <div className="flex items-center gap-2">
                <Modal title="" open={showModal} width={1000} footer={null} onCancel={()=>{
                  setShowModal(false)
                }} style={{
                  padding: 0
                }}>
                    <UserSetting/>
                </Modal>
                
                <Tooltip title="My account">
                <Button type="default" icon={<UserOutlined/>} onClick={()=>{
                setShowModal(true)
              }}></Button>
                </Tooltip>
                
                <LocaleSwitcher />
              </div>
            </div>
            </div>
          </Header>
          <Content
            style={{
              overflow: "auto",
              margin: '24px 16px',
              marginRight: 0,
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;