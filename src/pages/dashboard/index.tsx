"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});
import DashBoardLayout from "@/components/admin/DashBoardLayout";
const data = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Revenue",
      data: [65000, 59000, 80000, 81000, 56000, 75000, 60000],
      fill: false,
      borderColor: "rgb(75, 192, 192)",
      tension: 0.1,
    },
  ],
};

import { GetStaticPropsContext } from "next";
import { Pie } from "react-chartjs-2";
import FastInfo from "@/components/admin/FastInfo";
import { FilterFilled, YoutubeFilled } from "@ant-design/icons";
import FastInfoList from "@/components/admin/FastInfoList";
import { Input, Switch, Table } from "antd";
import { useTranslations } from "use-intl";
import PlatformSelectForFilter from "@/components/admin/PlatformSelectForFilter";
import Title from "antd/es/typography/Title";
import CategorySelect from "@/components/admin/CategorySelect";
import DashBoardStatical from "@/components/admin/crudform/statistical/DashboardStatiticcal";

const Page = () => {
  const t = useTranslations("MyLanguage");
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
    {
      key: "3",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
    {
      key: "4",
      name: "John",
      age: 42,
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
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("account"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("service"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("amount"),
      dataIndex: "age",
      key: "age",
    },
    {
      title: t("status"),
      dataIndex: "key",
      key: "key",
      render: (text: any, record: any) => <Switch defaultChecked={text == 1} />,
    },
    {
      title: t("createAt"),
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <>
      <div>
        <DashBoardStatical />
        <div className=" hidden">
          <div className="w-2/3">
            <Line
              data={data}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
          <div className="w-80">
            <Pie
              data={dataPie}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "right",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Title level={3} className="text-center">
          Orders
        </Title>
      </div>
      <div className="border shadow-sm rounded-md overflow-hidden my-2 hidden">
        <div className="bg-gray-100  px-2 py-1 pt-2 ">
          <Title level={5} className="!font-semibold">
            <FilterFilled /> Filter
          </Title>
        </div>
        <div className="p-3  flex gap-2">
          <Input
            placeholder={t("searchplh")}
            style={{
              width: 200,
            }}
          />

          <PlatformSelectForFilter />
          <PlatformSelectForFilter />
        </div>
      </div>
      <Table
        className="border rounded-md"
        pagination={false}
        scroll={{ y: 150 }}
        dataSource={dataSource}
        columns={columns}
      />
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

const dataPie = {
  labels: ["Youtube", "Facebook", "Slack", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};
