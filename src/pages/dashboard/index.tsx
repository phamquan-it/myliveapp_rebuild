"use client";;
import "chart.js/auto";

import { GetStaticPropsContext } from "next";
import { Avatar, ConfigProvider, Input, List, Skeleton, Switch, Table } from "antd";
import { useTranslations } from "use-intl";
import DashBoardStatical from "@/components/admin/crudform/statistical/DashboardStatiticcal";
import Title from "antd/es/typography/Title";
import { customTokens } from "@/components/configProviders/customToken";
const Page = () => {

  const t = useTranslations("MyLanguage");
  const data = [
    {
      title: "Deposit from Bank",
      description: "5 march, 18:33 ",
    },
    {
      title: "Ant Design Title 2",
      description: "5 march, 18:33 ",
    },
    {
      title: "Ant Design Title 3",
      description: "5 march, 18:33 ",
    },
    {
      title: "Ant Design Title 4",
      description: "5 march, 18:33 ",
    },
  ];
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <div className="p-2">{text}</div>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <div>
        <DashBoardStatical />
      </div>
      <div className=" grid grid-cols-2 gap-3">
        <div className="Payment rounded-xl border overflow-hidden shadow">
          <div
            className="py-3 font-medium ps-3 border-b text-gray-600"
            style={{ fontSize: 16 }}
          >
            Payment history
          </div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <div key="" className="text-right pe-4">
                    <span className="font-medium text-gray-600 block text-lg">
                      +2000
                    </span>
                    <span>USD</span>
                  </div>,
                ]}
              >
                <List.Item.Meta
                  className="customavatar"
                  avatar={
                    <Avatar
                      size={"large"}
                      src={`https://demo.dashboardpack.com/marketing-html/img/Payment/3.png`}
                    />
                  }
                  title={<a className="font-normal text-lg">{item.title}</a>}
                  description={item.description}
                />
                <div></div>
              </List.Item>
            )}
          />
        </div>
      </div>
      <Title className="text-center !text-gray-600" level={3}>
        Recent orders
      </Title>
      <ConfigProvider theme={{ token: customTokens}}>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="border rounded-md overflow-hidden"
      />
      </ConfigProvider>
    </>
  );
};


export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
