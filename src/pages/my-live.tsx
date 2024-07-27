import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Image, message, Select, Table } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { webdockConfig } from "../../WEBDOCK_PROVIDER/APIRequest/config";
interface PageProps{
  
} 
 const Page:React.FC<PageProps> = ({})=>{
  //init ref for handle form
  const selectRef = useRef(null);
  const [serverSlug,setServerSlug] = useState("")
  const [openState,setOpenState] = useState()
  const [shellUserValue,setShellUserValue] = useState(null)
  //get list public key
  const { data } = useQuery({ 
    queryKey: ['queryKey', openState], 
    queryFn: ()=>axios.get("https://api.webdock.io/v1/account/publicKeys", 
    webdockConfig) 
  });
  //get list server
  const serversQuery = useQuery({ 
    queryKey: ['servers', openState], 
    queryFn: ()=>axios.get("https://api.webdock.io/v1/servers", 
    webdockConfig) 
  });
  //get list shellUser when server value has changed
  const shellUserMutation = useMutation({ 
    mutationKey: ['shellUsers', serverSlug], 
    mutationFn: ()=>axios.get(`https://api.webdock.io/v1/servers/${serverSlug}/shellUsers`, 
    webdockConfig), 
    onSuccess(data, variables, context) {
      console.log(data);
    },
  },

);
  const updateServerKeyMutation = useMutation({
    mutationKey:['PatchServerKey'],
    mutationFn: (data:any) => axios
    .patch(`https://api.webdock.io/v1/servers/${serverSlug}/shellUsers/${shellUserValue}`, {
      publicKeys: data
    }, webdockConfig),
    onSuccess:(data)=>{
      message.success("Success")
    },
    onError:()=>{
      message.error("Error")
    }
  })



  const onFinish = (values: any) => {
    // console.log('Success:', values);
    updateServerKeyMutation.mutate(values.publicKey)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(()=>{
    
    shellUserMutation.mutate()
  }, [serverSlug])

  const [form] = Form.useForm();
  return(
    
    <div className="bg-slate-100 h-screen">
        <Form form={form}
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="Server" name="server" rules={[
                {required: true}
              ]}>
                  <Select
                    showSearch
                    style={{
                      minWidth: 200,
                      maxWidth: 250
                    }}
                    placeholder="Select server"
                    options={serversQuery.data?.data?.map((server:any)=>({
                      label: server.name,
                      value: server.slug
                    }))}
                    onChange={(value)=>{
                      setServerSlug(value)
                      setShellUserValue(null)
                      form.resetFields(['shellUser']);
                    }}
                  />
              </Form.Item>
              <Form.Item label="Shell users" name="shellUser" rules={[
                {required: true}
              ]}>
                  <Select
                    showSearch
                    style={{
                      minWidth: 200,
                      maxWidth: 250
                    }}
                    placeholder="Select server"
                    options={shellUserMutation.data?.data.map((data: any)=>({
                      label: data.username,
                      value: data.id
                    }))}
                    onChange={(value)=>{
                      setShellUserValue(value)
                    }}
                    value={shellUserValue}
                  />
              </Form.Item>
              <Form.Item
                label="Public key"
                name="publickey"
                rules={[{ required: true, message: 'Select least a publickey!' }]}
              >
                <Select
                  ref={selectRef}
                  allowClear
                  showSearch
                  mode="multiple"
                  style={{
                    minWidth:200,
                    maxWidth: 250,
                    paddingBottom: 0
                  }}
                  placeholder="PublicKey"
                  options={data?.data.map((publlickey: any)=>({
                    label: publlickey.name,
                    value: publlickey.id
                  }))}
                />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
    </div>
);
} 
 export default Page