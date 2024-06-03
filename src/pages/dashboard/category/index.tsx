import { Category } from "@/@type/Category";
import axiosClient from "@/apiClient/axiosClient";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import format from "@/hooks/dayjsformatter";
import { useQuery } from "@tanstack/react-query";
import lodash, { values } from 'lodash'
import { Image, Input, Select, Switch, Table, TablePaginationConfig } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { getCookie } from "cookies-next";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Platform } from "@/@type";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import { RootState } from "@/libs/redux/store";

const Page = () => {
  const dispatch   = useDispatch()
  const {platforms, isPending, isSuccess} = useSelector((state:RootState)=>state.platformSlice)
  useEffect(()=>{
      dispatch(fetchPlatform());
  }, [dispatch])
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
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text:string, record:Category) => (
        <div className="flex items-center gap-2">
          <Image width={25} src={record.icon} alt="image" />
          {text}
        </div>
      ),
    },
    {
      title: t("createat"),
      dataIndex: "createdAt",
      width: "100px",
      key: "createdAt",
      render: (text:string)=>format(text,router.locale||"en")
    }
  ]
  const [keyword,setKeyword] = useState("")
  const [params, setParams] = useState({keyword:keyword, offset: 0, limit: 10})


  const { data, isFetching, isError } = useQuery({
    
    queryKey: ["orders", params],
    queryFn: () => axiosClient.get("/categories/list?language=en", {
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
  const [platformValue,setPlatformValue] = useState<number>(1)
  return (
    <>
      <DashBoardLayout>
        <div className="flex justify-start gap-1">
            <Input style={{width:200}} placeholder="Search..." onChange={(e)=>{
                setKeyword(e.target.value)
                const search = lodash.debounce(()=>{
                    setParams({
                        ...params,keyword
                    })
                },300)
                search()
            }}/>
            <Select
            showSearch
            options={platforms.map(platform => ({
              label: <>
                <div className="flex items-center gap-1">
                <Image src={platform.icon} alt="" width={25} preview={false}/>
                <span>{platform.name}</span>
                </div>
                </>, value: `${platform.id}#${platform.name}`
            }))}
            style={{ width: 200 }}
            placeholder="Select a platform"
            onChange={(value)=>{
              const regex = /(\d+)#/;
              const match = parseInt(value.match(regex));
              setPlatformValue(match||1)
            }}
          >
          </Select>
        </div>
          
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
