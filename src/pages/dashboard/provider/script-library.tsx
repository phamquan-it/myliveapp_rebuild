import GenericTable from "@/components/app/GenericTable";
import { useGetPublicScriptListQuery } from "@/libs/redux/api/script-library.api";
import { Input, Table } from "antd";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import { handleCopyToClipboard } from "./publickey";

const Page = ()=>{
  const t = useTranslations("MyLanguage")
  const {data, isFetching ,isError} = useGetPublicScriptListQuery()
  console.log(data);
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'File name',
      dataIndex: 'filename',
      key: 'filename',
    },
  ];
  
  return <GenericTable rowKey="id" dataSource={data?.map((value:any, index: number)=>({...value, key: index+1}))} columns={columns} expandable={{
    expandedRowRender: (record) => <Input.TextArea placeholder="" allowClear value={record.content} autoSize={true} readOnly onClick={()=> handleCopyToClipboard(record.content)}/>,
    rowExpandable: (record) => record.content !== undefined,
  }}/>

} 
 export default Page

 export async function getStaticProps({ locale }: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../../../messages/${locale}.json`)).default,
      },
    };
  }
  