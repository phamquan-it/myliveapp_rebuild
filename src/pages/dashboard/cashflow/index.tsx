import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { useQuery } from "@tanstack/react-query";
import lodash, { values } from "lodash";
import {
  Image,
  Input,
  Select,
  Switch,
  Table,
  TablePaginationConfig,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import {
  FilterValue,
  SorterResult,
  TableCurrentDataSource,
} from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Platform } from "@/@type";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import { RootState } from "@/libs/redux/store";
import axios from "axios";

const Page = () => {
  const dispatch = useDispatch();
  const { platforms, isPending, isSuccess } = useSelector(
    (state: RootState) => state.platformSlice
  );
  useEffect(() => {
    dispatch(fetchPlatform());
  }, [dispatch]);
  const [pageIndex, setPageIndex] = useState(1);
  const token = getCookie("token");
  const router = useRouter();
  const t = useTranslations("MyLanguage");
  const columns: any[] = [
    {
      title: t("entryno"),
      dataIndex: "key",
      key: "key",
    },
    {
      title: t("email"),
      dataIndex: "email",
      key: "email",
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Amount of money",
      dataIndex: "monney",
      key: "monney",
    },
    {
      title: t("fund"),
      dataIndex: "fund",
      key: "fund",
    },
  ];
  const [keyword, setKeyword] = useState("");
  const [params, setParams] = useState({
    keyword: keyword,
    offset: 0,
    limit: 10,
  });

  // const { data, isFetching, isError } = useQuery({
  //   queryKey: ["orders", params],
  //   queryFn: () =>
  //     axios.get("http://localhost:3000/api/cashflow", {
  //       params: params,
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   placeholderData: (previousData) => previousData,
  // });
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
  const data = [
    {
      id: 1,
      email: "john@example.com",
      action: "deposit",
      money: 100,
      fund: "A",
    },
    {
      id: 2,
      email: "jane@example.com",
      action: "withdrawal",
      money: 200,
      fund: "B",
    },
    {
      id: 3,
      email: "sam@example.com",
      action: "transfer",
      money: 300,
      fund: "C",
    },
    {
      id: 4,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 5,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 6,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    {
      id: 4,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 5,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 6,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    {
      id: 7,
      email: "alice@example.com",
      action: "deposit",
      money: 400,
      fund: "D",
    },
    {
      id: 8,
      email: "bob@example.com",
      action: "withdrawal",
      money: 500,
      fund: "E",
    },
    {
      id: 9,
      email: "charlie@example.com",
      action: "transfer",
      money: 600,
      fund: "F",
    },
    // Add more data as needed
  ];

  return (
    <>
      <DashBoardLayout>
        <div className="flex justify-start gap-1">
          <Input
            style={{ width: 200 }}
            placeholder="Search..."
            onChange={(e) => {
              setKeyword(e.target.value);
              const search = lodash.debounce(() => {
                setParams({
                  ...params,
                  keyword,
                });
              }, 300);
              search();
            }}
          />
        </div>

        <Table
          dataSource={data.map((item: any, index: number) => ({
            ...item,
            key: pageIndex * 10 + (index + 1) - 10,
          }))}
          columns={columns}
          //   loading={isFetching}
          onChange={handleTableChange}
          pagination={{
            total: 20,
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
