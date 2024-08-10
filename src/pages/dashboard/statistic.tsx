import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { Table } from "antd";
import { GetStaticPropsContext } from "next";
const dataSource = [
  {
    key: "1",
    id: "1",
    services: "Service A",
    category: "Category 1",
    provider: "Provider X",
    unDiscountedPrice: "$100",
    ratePer1000Original: "5%",
    ratio: "2:1",
    level: "High",
    status: "Active",
    quantity: 100,
    usage: 500,
    revenue: "$1000",
  },
  {
    key: "2",
    id: "2",
    services: "Service B",
    category: "Category 2",
    provider: "Provider Y",
    unDiscountedPrice: "$200",
    ratePer1000Original: "10%",
    ratio: "3:1",
    level: "Medium",
    status: "Inactive",
    quantity: 200,
    usage: 300,
    revenue: "$1500",
  },
  // Add more rows as needed
];

const Page = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
    },
    {
      title: "Un discounted price",
      dataIndex: "unDiscountedPrice",
      key: "unDiscountedPrice",
    },
    {
      title: "Rate per 1000 original",
      dataIndex: "ratePer1000Original",
      key: "ratePer1000Original",
    },
    {
      title: "Ratio",
      dataIndex: "ratio",
      key: "ratio",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Usage",
      dataIndex: "usage",
      key: "usage",
    },
    {
      title: "Revenue",
      dataIndex: "revenue",
      key: "revenue",
    },
  ];
  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
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
