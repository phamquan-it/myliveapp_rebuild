import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Input, Modal, Table } from "antd";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import Title from "antd/es/typography/Title";
import { PlusCircleFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TableProps } from "antd/lib";
import { useTranslations } from "next-intl";

  
const Page = ()=>{
    const { data, isFetching, isError } = useQuery({ queryKey: ['publicScript'], queryFn: ()=>
        axios.get('https://api.webdock.io/v1/scripts', webdockConfig)
     });

  const [scriptId,setScriptId] = useState(0)
  const [isModalOpen,setIsModalOpen] = useState(false)


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
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render: (id: number)=>(<>
      <Button type="primary" icon={<PlusCircleFilled/>} onClick={()=>{
        setScriptId(id);
      }}></Button>
      
      </>)
    },
  ];
  const handleCancel = ()=>{ 
    setScriptId(0)
   setIsModalOpen(false)
  }


  type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
  useEffect(()=>{
    if(scriptId != 0)
      setIsModalOpen(true)
  }, [scriptId])

  

  
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [loading,setLoading] = useState(false)
  const hasSelected = selectedRowKeys.length > 0;
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const vpsList = useQuery({ queryKey: ['queryKey', isModalOpen], queryFn: ()=>axios.get("https://api.webdock.io/v1/servers", webdockConfig) });
  const t = useTranslations("MyLanguage")
  return(
    <>
    
    <Title level={2} className="text-center">Public script</Title>
    <Modal title="Public script" open={isModalOpen} onCancel={handleCancel} width={800} footer={[]}>
    <Flex gap="middle" vertical>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
      </Flex>
      <Table rowSelection={rowSelection} columns={[
    {
      title: t('entryno'),
      dataIndex: "id",
      key:"id"
    },
   
    {
      title: t('name'),
      dataIndex:"name",
      key:"id"
    },
    {
      title: "Slug",
      dataIndex:"slug",
      key:"id"
    },
    {
      title: t('location'),
      dataIndex:"location",
      key:"id"
    },
    {
      title: t('ipv4'),
      dataIndex:"ipv4",
      key:"id"
    },
    {
      title: "ipv6",
      dataIndex:"ipv6",
      key:"id"
    },
    
    
  ]} dataSource={vpsList.data?.data} />
    </Flex>
    </Modal>
    
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
  