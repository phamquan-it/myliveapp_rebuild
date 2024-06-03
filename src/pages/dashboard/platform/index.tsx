import { Image, Input, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState,AppDispatch } from  '@/libs/redux/store'
import { useEffect, useState } from "react";
import { fetchPlatform } from "@/libs/redux/slices/platformSlice";
import format from "@/hooks/dayjsformatter";
import { useRouter } from "next/router";
import DashBoardLayout from "@/components/admin/DashBoardLayout";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { Platform } from "@/@type";
import  lodash from "lodash"
const Page = ()=>{
    const dispatch = useDispatch();
    const router =  useRouter();
    const t = useTranslations("MyLanguage")
    const {platforms, isPending, isError, isSuccess} = useSelector((state:RootState)=>state.platformSlice)
    const [platformData,setPlatformData] = useState<Platform[]>([])
    const handleSearch = (e:any)=>{
      const results:Platform[] = [];
      platforms.map((i)=>{
        if(i.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())){
          results.push(i)
        }
      })
      setPlatformData(results)
    }
    useEffect(()=>{
        if(platformData?.length == 0){
          dispatch(fetchPlatform());
        setPlatformData(platforms)
        }
    }, [isPending])
      
      const columns = [
        {
          title: t('entryno'),
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: t('name'),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Icon',
          dataIndex: 'icon',
          key: 'icon',
          render:(text:string)=>{
            return (
              <>
              <Image  src={text}  width={25} alt=""/>
              </>
            )
          }
        },
        {
          title: t('createAt'),
          dataIndex: 'createdAt',
          key: 'createdAt',
          render:(text:string)=>(<>
          {format(text, router.locale||"en")}
          </>)
        }
      ];
  return(
    <>
    <DashBoardLayout>
      <div className="py-2">
      <Input placeholder="Search..." onChange={handleSearch} style={{width:200}}/>
      </div>
      
    <Table dataSource={platformData} columns={columns} loading={isPending}/>
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
