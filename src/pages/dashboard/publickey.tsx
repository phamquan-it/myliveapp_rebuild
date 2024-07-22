import axios from "axios";
import { GetStaticPropsContext } from "next";
import { WEBDOCK_TOKEN } from "../../../WEBDOCK_PROVIDER/constant/Token";
import { Button, Form, Input, Modal, Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import Title from "antd/es/typography/Title";
import { PlusCircleFilled } from "@ant-design/icons";
import TableAction from "@/components/admin/TableAction";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Page = ()=>{
    const [openState,setOpenState] = useState(false)
    const { data, isFetching, isError } = useQuery({ queryKey: ['queryKey'], queryFn: ()=>axios.get("https://api.webdock.io/v1/account/publicKeys", {
        headers: {
          Authorization: `Bearer ${WEBDOCK_TOKEN}`,
        },
      }) });
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Created',
            dataIndex: 'created',
            key: 'create',
        },
        {
            title: "Action",
            dataIndex: "id",
            render: (text: string, record: any)=><>
                <TableAction deleteForm={<>
                    <div className="flex justify-end gap-1">
                        <Button type="primary">Cancel</Button>
                        <Button type="primary" danger onClick={()=>{
                            async function deleteServer() {
                                const url = 'https://api.webdock.io/v1/account/publicKeys/'+text;
                                const headers = {
                                    Authorization: 'Bearer '+WEBDOCK_TOKEN,
                                    Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
                                };
                            
                                try {
                                    await axios.delete(url, { headers });
                                    toast.success(data?.data.message)
                                } catch (error:any) {
                                    toast.error(error.message)
                                }
                                setOpenState(!openState)
                            }
                            
                            // Call the function to stop the server
                            deleteServer();
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

      const onFinish = async (values: any) => {
        console.log('Success:', values);
        const url = 'https://api.webdock.io/v1/account/publicKeys';
              const headers = {
                  Authorization: 'Bearer '+WEBDOCK_TOKEN,
                  Cookie: 'CONCRETE5=vsf9dgjlpvses6vojntcqhc4tr',
              };
          
              try {
                  const response = await axios.post(url, null, { headers });
                   alert('ok')
              } catch (error:any) {
                  alert('nook')
              }
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
    
    <Table dataSource={data?.data} columns={columns} className="border rounded overflow-hidden"/>
    </>
);
} 
 export default Page

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
