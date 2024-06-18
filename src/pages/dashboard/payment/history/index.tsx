import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import DeleteForm from "@/components/admin/DeleteForm";
import TableAction from "@/components/admin/TableAction";
import EditCategory from "@/components/admin/crudform/edit/EditCategory";
import HistoryStatitical from "@/components/admin/crudform/statistical/HistoryStatitical";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Table,
  TablePaginationConfig,
  Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Select } from "antd/lib";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import filterOptionByLabel from "@/hooks/filterOptionByLabel";

const Page = () => {
  const router = useRouter();
  const token = getCookie("token");
  const t = useTranslations("MyLanguage");
  const d = useTranslations("DashboardMenu");
  const columns: any = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("account"),
      dataIndex: "account",
      key: "account",
      render: (text: string, record: any) => record?.user?.email,
    },
    {
      title: t("creator"),
      dataIndex: "userCreate",
      key: "userCreate",
      render: (text: string, record: any) => record?.userCreate?.email,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: t("paymethod"),
      dataIndex: "card_type",
      key: "card_type",
    },
    {
      title: t("date"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: t("content"),
      dataIndex: "order_info",
      key: "order_info",
    },
    {
      align: "center",
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <div className="flex justify-center">
          <Tag
            color={
              text == "-1"
                ? "red"
                : text == "1"
                ? "green"
                : text == "3"
                ? "orange"
                : "cyan"
            }
          >
            {text == "-1"
              ? "Deny"
              : text == "1"
              ? "Completed"
              : text == "3"
              ? "Pending"
              : "In Progress"}
          </Tag>
        </div>
      ),
    },
    {
      title: t("amountusd"),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: t("rate"),
      dataIndex: "exchange_rate",
      key: "exchange_rate",
    },
    {
      align: "right",
      title: t("amountvnd"),
      dataIndex: "amount_vi",
      key: "amount_vi",
    },

    {
      witdth: 200,
      align: "center",
      title: t("action"),
      dataIndex: "id",
      key: "id",
      render: (text: string, record: any) => {
        return (
          <div className="flex justify-center">
            <TableAction
              openState={openState}
              // viewDetail={<>view detail</>}
              // syncFunc={() => {
              //   //synchonized data here
              // }}
              editForm={
                <>
                  <Form
                    layout="vertical"
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </>
              }
              // deleteForm={
              //   <DeleteForm
              //     onCancel={() => {
              //       setOpenState(!openState);
              //     }}
              //     onDelete={() => {
              //       setOpenState(!openState);
              //     }}
              //   />
              // }
            />
          </div>
        );
      },
    },
  ];
  const [status, setStatus] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.status))
      ? parseInt(getObjecFormUrlParameters(router)?.status)
      : null
  );
  const [openState, setOpenState] = useState(false);
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    const pageSize = pagination.pageSize || 10;
    setPageSize(pageSize);
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: ["paymentHistory", router.asPath],
    queryFn: () =>
      axiosClient.get(`/payment/history?language=${router.locale}`, {
        params: {
          keyword: keyword,
          status: status,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });
  const handleSearch = _.debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const handleStatus = (value: any) => {
    setStatus(value);
  };
  useEffect(() => {
    if (
      status == null &&
      keyword == null &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/payment/history"
    )
      return;
    router.push(router, {
      query: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword,
        status: status,
      },
    });
  }, [pageIndex, pageSize, keyword, status]);
  const p = useTranslations("Placeholder");
  return (
    <>
      <Title level={2} className="text-center">
        {d("paymenthistory")}
      </Title>
      <div className="flex gap-1 my-3" id="filter">
        <Input
          defaultValue={keyword}
          placeholder={p("search")}
          style={{ width: 200 }}
          onChange={handleSearch}
        />
        <Select
          style={{ width: 200 }}
          placeholder={p("select status")}
          defaultValue={status}
          showSearch
          filterOption={filterOptionByLabel}
          allowClear
          onChange={handleStatus}
          options={[
            { value: -1, label: "Deny" },
            { value: 2, label: "In progess" },
            { value: 3, label: "Pending" },
            { value: 1, label: "Completed" },
          ]}
        />
      </div>
      <div className="my-3 gap-3 grid grid-cols-5">
        <HistoryStatitical
          color="rgb(10, 143, 220)"
          monney={0.207}
          info="Current Viral SMM balance"
        />
        <HistoryStatitical
          color="rgb(23, 182, 221)"
          monney={0.207}
          info="Current Viral SMM balance"
        />
        <HistoryStatitical
          color="rgb(73, 189, 101)"
          monney={0.207}
          info="Current Viral SMM balance"
        />
        <HistoryStatitical
          color="rgb(244, 152, 32)"
          monney={0.207}
          info="Current Viral SMM balance"
        />
        <HistoryStatitical
          color="rgb(158, 73, 230)"
          monney={0.207}
          info="Current Viral SMM balance"
        />
      </div>
      <Table
        loading={isFetching}
        onChange={handleTableChange}
        dataSource={data?.data?.data?.map((item: any, index: number) => ({
          ...item,
          key: index + 1,
        }))}
        pagination={{
          total: data?.data?.total,
          pageSize: pageSize,
          current: pageIndex,
          showSizeChanger: true,
        }}
        columns={columns}
        className="border rounded-md shadow-md"
      />
    </>
  );
};
export default Page;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../../messages/${locale}.json`))
        .default,
    },
  };
}
