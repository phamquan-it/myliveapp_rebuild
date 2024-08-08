import axios from "axios";
import { GetStaticPropsContext } from "next";
import { WEBDOCK_TOKEN } from "../../../../WEBDOCK_PROVIDER/constant/Token";
import { Button, Form, Input, message, Modal, Table } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import Title from "antd/es/typography/Title";
import { PlusCircleFilled } from "@ant-design/icons";
import TableAction from "@/components/admin/TableAction";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { headers } from "next/headers";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";

const Page = ()=>{
    const [openState,setOpenState] = useState(false)
    const { data, isFetching, isError } = useQuery({ queryKey: ['queryKey', openState], queryFn: ()=>axios.get("https://api.webdock.io/v1/account/publicKeys", webdockConfig) });
      const columns = [
        {
          title: 'No.',
          dataIndex: 'entryno',

        },
        {
          title: 'Name',
          dataIndex: 'name',
  
        },
        {
            title: 'Created',
            dataIndex: 'created',
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (text:any, record: any)=><>
                <TableAction deleteForm={<>
                    <div className="flex justify-end gap-1">
                        <Button type="primary">Cancel</Button>
                        <Button type="primary" danger onClick={()=>{
                            deletePublicKeyMutation.mutate(text)
                        }}>
                            Accept
                        </Button>
                        
                    </div>
                    </>} openState={openState}/>
            </>
        }
      ];
      const [openModal,setOpenModal] = useState(false) 
      const showModal = ()=>{ 
        //show create modal
       setOpenModal(true)
      }
      const hideModal = ()=>{ 
        //hide create modal
       setOpenModal(false)
      }
      const deletePublicKeyMutation = useMutation({
        mutationFn:(id)=>{
          return axios.delete(`https://api.webdock.io/v1/account/publicKeys/${id}`, webdockConfig)
        },
        onSuccess: ()=>{
          message.success('Delete ok')
          setOpenState(!openState)
        },
        onError:()=>{
          setOpenState(!openState)
          message.error('Delete no ok')
        }
      })
      const createPublickeyMutation = useMutation({
        mutationFn: (newPublickey) => {
          return axios.post(
            'https://api.webdock.io/v1/account/publicKeys',
            newPublickey, webdockConfig
          )
        },
        onSuccess:()=>{
          setOpenState(!openState)
          message.success("Create publickey ok");
        },
        onError: (e)=>{
          setOpenState(!openState)
          message.error("Create publickey no ok");
        }
      })

      const onFinish = async (values: any) => {
        console.log(values);
        createPublickeyMutation.mutate(values)
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
  return(
    <>
    <ToastContainer/>
    <Modal title="Create" open={openModal} footer={null} onCancel={hideModal}>
        
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
                rules={[{ required: true, message: 'Please input key name!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Key"
                name="publicKey"
                rules={[{ required: true, message: 'Please input your public key!' }]}
              >
                <Input.TextArea placeholder="" allowClear />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Create
                </Button>
              </Form.Item>
            </Form>
    </Modal>
    
    <Title level={2} className="text-center pb-3">Public key</Title>
    <div className=" flex py-3 justify-between">
        <div className="filter"><Input placeholder="Search..." />
        </div>
        <Button type="primary" icon={<PlusCircleFilled/>} iconPosition="end" onClick={showModal}>
            Create
        </Button>
    </div>
    
    <Table dataSource={
      data?.data.map((pkey: any, index: number)=>({...pkey, entryno: index+1}))} 
      columns={columns} 
      className="border rounded overflow-hidden" 
      loading={isFetching}
      expandable={{
        expandedRowRender: (record) => <Input.TextArea placeholder="" value={record.key} autoSize />,
        rowExpandable: (record) => record.key !== undefined,
      }}
    />
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
