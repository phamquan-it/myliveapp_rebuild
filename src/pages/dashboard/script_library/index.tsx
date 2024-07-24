import { useQuery } from "@tanstack/react-query";
import { Input, Table } from "antd";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import Title from "antd/es/typography/Title";
const columns = [
    {
        title: 'No.',
        dataIndex: 'key',
        key: 'key',
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Filename',
      dataIndex: 'filename',
      key: 'filename',
    },
    
  ];
  
const Page = ()=>{
    const { data, isFetching, isError } = useQuery({ queryKey: ['publicScript'], queryFn: ()=>
        axios.get('https://api.webdock.io/v1/scripts', webdockConfig)
     });
  
  return(
    <>
    
    <Title level={2} className="text-center">Public script</Title>
    <Table 
    pagination={{
        pageSize:20
    }}
    expandable={{
        expandedRowRender: (record: any) =><Input.TextArea placeholder="" allowClear value={record.content} readOnly autoSize/>,
        rowExpandable: (record) => record.content !== undefined,
      }}
    dataSource={data?.data.map((script:any, index:number)=>({...script,key:index }))} columns={columns} loading={isFetching} />
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
  