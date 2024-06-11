import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
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
import { useTranslations } from "use-intl";

const Page = () => {
  const t = useTranslations("MyLanguage");
  const columns: any = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("method"),
      dataIndex: "method",
      key: "method",
      render: (text: string) => (
        <Tag color={text == "POST" ? "orange" : "purple"}>{text}</Tag>
      ),
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: t("createAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => (
        <>{dayjs(text).format("DD/MM/YYYY hh:mm:ss")}</>
      ),
    },
    // {
    //   title: "",
    //   width: 200,
    //   dataIndex: "id",
    //   key: "id",
    //   render: (text: string, record: any) => {
    //     return (
    //       <TableAction
    //         openState={openState}
    //         viewDetail={<>view detail</>}
    //         syncFunc={() => {
    //           //synchonized data here
    //         }}
    //         deleteForm={
    //           <DeleteForm
    //             onCancel={() => {
    //               setOpenState(!openState);
    //             }}
    //             onDelete={() => {
    //               setOpenState(!openState);
    //             }}
    //           />
    //         }
    //       />
    //     );
    //   },
    // },
  ];
  const [openState, setOpenState] = useState(false);

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
  const [pageSize, setPageSize] = useState(10);
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<AnyObject> | SorterResult<AnyObject>[],
    extra: TableCurrentDataSource<AnyObject>
  ) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
    const offset = (current - 1) * pageSize;
    const limit = current * pageSize;
    setParams({ ...params, limit: limit, offset: offset });
  };
  return (
    <>
      <DashBoardLayout>
        <div className="my-3 flex gap-1">
          <Input placeholder="Search..." className="" style={{ width: 200 }} />
          <DatePicker placeholder="Start date" picker="date" />
          <DatePicker placeholder="End date" picker="date" />
        </div>
        <Table
          className="border rounded shadow-md"
          loading={isFetching}
          onChange={handleTableChange}
          dataSource={data?.data.data.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * pageSize + (index + 1) - pageSize,
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
