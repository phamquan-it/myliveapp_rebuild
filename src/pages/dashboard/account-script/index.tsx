import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Modal, Table } from "antd";
import axios from "axios";
import { GetStaticPropsContext } from "next";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import Title from "antd/es/typography/Title";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
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
        axios.get('https://api.webdock.io/v1/account/scripts', webdockConfig)
     });
  const [openModal,setOpenModal] = useState(false)

  const showCreatePopup = ()=>{
    setOpenModal(true)
}

const onFinish = (values: any) => {
    console.log('Success:', values);
    createAccountScriptMutaion.mutate(values)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const createAccountScriptMutaion = useMutation({
     mutationFn:()=> axios.post("https://api.webdock.io/v1/account/scripts", webdockConfig),
    onSuccess:()=>{
        message.success("Create account script ok")
    },
    onError:()=>{
        message.error("Create account script no ok")
    }
  });
  return(
    <>
   
    <Title level={2} className="text-center">Account script</Title>

    <div className="flex justify-between my-2">
        <div>
            <Input placeholder="Search..." />
        </div>
        <Button type="primary" icon={<PlusCircleFilled/>} iconPosition="end" onClick={showCreatePopup}>
            Create
        </Button>
    </div>
    <Modal title="Create" open={openModal} footer={null} onCancel={()=>{
        setOpenModal(false)
    }}>
        
        <Form
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Filename"
                name="filename"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Content"
                name="content"
                rules={[{ required: true }]}
              >
                <Input.TextArea placeholder="" allowClear autoSize/>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>
            </Form>
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
  