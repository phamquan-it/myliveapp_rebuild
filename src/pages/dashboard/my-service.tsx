import axiosClient from "@/apiClient/axiosClient";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
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
import Title from "antd/es/typography/Title";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslations } from "use-intl";
import getObjecFormUrlParameters from "@/hooks/getObjectFormParameter";
import { CaretRightFilled, PlayCircleFilled, StopFilled, StopOutlined } from "@ant-design/icons";
import LiveState from "@/components/client/LiveState";

const Page = () => {
    const [liveActive,setLiveActive] = useState(false)
  const d = useTranslations("DashboardMenu");
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
      title: t("status"),
      dataIndex: "status",
      key: "method",
      render: (text: string) => (
        <LiveState liveKey="" platfornId={1} state={false}/>
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
  ];
  const [openState, setOpenState] = useState(false);
  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageIndex))
      ? parseInt(getObjecFormUrlParameters(router)?.pageIndex)
      : 1
  );
  const token = getCookie("token");
  const [keyword, setKeyword] = useState(
    getObjecFormUrlParameters(router)?.keyword
  );
  const [pageSize, setPageSize] = useState(
    !isNaN(parseInt(getObjecFormUrlParameters(router)?.pageSize))
      ? parseInt(getObjecFormUrlParameters(router)?.pageSize)
      : 10
  );
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", router.asPath],
    queryFn: () =>
      axiosClient.get("/log/list?language=" + router.locale, {
        params: {
          keyword: keyword,
          offset: (pageIndex - 1) * pageSize,
          limit: pageIndex * pageSize,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    placeholderData: (previousData) => previousData,
  });
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const current = pagination.current || 1;
    setPageIndex(current);
    setPageSize(pageSize);
  };
  const hanleKeyword = _.debounce((e: any) => {
    setKeyword(e.target.value);
  }, 300);
  const p = useTranslations("Placeholder");
  useEffect(() => {
    if (
      keyword == null &&
      pageSize == 10 &&
      pageIndex == 1 &&
      router.asPath == "/dashboard/log"
    )
      return;
    router.push(router, {
      query: {
        keyword: keyword,
        pageSize: pageSize,
        pageIndex: pageIndex,
      },
    });
  }, [keyword, pageIndex, pageSize]);
  return (
    <>
      <Title level={2} className="text-center">
        {'Autolive'}
      </Title>
      <div className="my-3 flex gap-1">
        <div id="filter">
          <Input
            defaultValue={keyword}
            placeholder={p("search")}
            className=""
            style={{ width: 200 }}
            onChange={hanleKeyword}
          />
        </div>
      </div>
      <Table
        className="border rounded shadow-md"
        loading={isFetching}
        onChange={handleTableChange}
        dataSource={data?.data.data.map((item: any, index: number) => ({
          ...item,
          key: pageIndex * pageSize + (index + 1) - pageSize,
        }))}
        scroll={{ x: 800 }}
        columns={columns}
        pagination={{
          total: data?.data.total,
          pageSize: pageSize,
          current: pageIndex,
          showSizeChanger: true,
          position: ["bottomCenter"],
        }}
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
