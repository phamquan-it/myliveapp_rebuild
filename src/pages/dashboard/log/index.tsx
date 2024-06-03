import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { useQuery } from "@tanstack/react-query";
import { Table, TablePaginationConfig, Tag } from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useState } from "react";

const columns = [
  {
    title: "No.",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Name.",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    render: (text: string) => (
      <Tag color={text == "POST" ? "orange" : "purple"}>{text}</Tag>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Create At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (text: string) => <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>,
  },
];
const Page = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const token = getCookie("token");
  const [params, setParams] = useState({ offset: 0, limit: 10 });
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", params],
    queryFn: () =>
      axiosClient.get("/log/list?language=en", {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AnyObject> | SorterResult<AnyObject>[],
    extra: TableCurrentDataSource<AnyObject>
  ) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    const offset = (current - 1) * pageSize;
    const limit = current * pageSize;
    setParams({ ...params, limit: limit, offset: offset });
  };
  return (
    <>
      <DashBoardLayout>
        <Table
          loading={isFetching}
          onChange={handleTableChange}
          dataSource={data?.data.data.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * 10 + (index + 1) - 10,
          }))}
          columns={columns}
          pagination={{
            total: data?.data.total,
          }}
        />
      </DashBoardLayout>
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
