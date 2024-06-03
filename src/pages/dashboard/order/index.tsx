import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Switch, Table, TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState } from "react";

const Page = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const token = getCookie("token")
  const router = useRouter();
  const t = useTranslations("MyLanguage")
  const columns: any[] = [
    {
      title: t('entryno'),
      dataIndex: "key",
      key: "key"
    },
    {
      title: t("link"),
      dataIndex: "link",
      key: "link",
    },
    {
      title: t("quantity"),
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: string) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={text != "Canceled"}
            />
          </>
        );
      },
    },
    {
      title: t("remains"),
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: "OrderID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "ServiceId",
      dataIndex: "serviceId",
      key: "serviceId",
    },
    {
      title: t("createat"),
      dataIndex: "create_date",
      key: "create_date",
      render: (text: string) => (
        <>
          {format(text, router.locale || "en")}
        </>
      ),
    },
    {
      title: t("updateat"),
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => (
        <>
          {format(text, router.locale || "en")}
        </>
      ),
    },
  ]
  const [params, setParams] = useState({ offset: 0, limit: 10})

  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", params],
    queryFn: () => axiosClient.get("/order/list?language=en", {
      params: params,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }),
    placeholderData: (previousData) => previousData,
  });

  const handleTableChange = (pagination: TablePaginationConfig,
     filters: Record<string, FilterValue | null>, 
     sorter: SorterResult<AnyObject> | SorterResult<AnyObject>[], 
     extra: TableCurrentDataSource<AnyObject>)=>{
    
    const current =pagination.current||1;
    setPageIndex(current)
    const pageSize = pagination.pageSize || 10;
    const offset =  (current-1)*pageSize;
    const limit = current *pageSize
    setParams({...params, limit:limit,offset:offset}, )
  }
  return (
    <>
      <DashBoardLayout>
        <Table  
          dataSource={data?.data.data.map((item: any, index: number) => ({ ...item, key: pageIndex * 10 + (index + 1) - 10 }))}
          columns={columns}
          loading={isFetching}
          onChange={handleTableChange}
          pagination={{
            total:data?.data.total
          }}
        />
      </DashBoardLayout>
    </>
  );
}
export default Page


export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  };
}
