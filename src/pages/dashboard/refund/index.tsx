import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Image, Switch, Table, TablePaginationConfig } from "antd";
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
      title: t("createat"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text:string) => format(text,  router.locale||"en")
    },
  ]
  const [params, setParams] = useState({ offset: 0, limit: 10})


  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders", params],
    queryFn: () => axiosClient.get("/refund-money/list?language=en", {
      params: params,
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }),
    placeholderData: (previousData) => previousData,
  });
  console.log(data);
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
