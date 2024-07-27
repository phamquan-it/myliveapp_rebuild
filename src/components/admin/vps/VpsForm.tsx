import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import { useTranslations } from "use-intl";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import axios from "axios";
import { useState } from "react";

const VpsForm = ()=>{
  const t = useTranslations("MyLanguage")
  const depentVpsdata = useQuery({ queryKey: ['depent'], queryFn: ()=> axios.get("https://api.golive365.top/vps-provider/get-depens-vps-data")});

  const [location,setLocation] = useState()
  const profilesSlug = useQuery({ queryKey: ['ProfileSlug', location], queryFn: ()=> axios.get(
    "https://api.golive365.top/vps-provider/get-profile-for-create-vps?locationId=dk") 
  });
  const createVpsMutation = useMutation({

    mutationFn: (vpsdata)=>axios.post("https://api.webdock.io/v1/servers",vpsdata , webdockConfig),
    onSuccess:()=>{
     message.success("Create vps success")
    },
    onError(error, variables, context) {
     message.error("Create vps error")
    },
 });
 const onFinish = (values: any) => {
   console.log("Form values:", values);
   // Handle form submission logic here
   createVpsMutation.mutate({...values, snapshotId:0})
 };

  return(
    <>
    <Form onFinish={onFinish} layout="vertical">
          
          <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label={t('name')}
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={"Slug"}
            name="slug"
            rules={[{ required: true, message: "Please enter a slug" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t('location')}
            name="locationId"
            rules={[{ required: true, message: "Please select an location" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={depentVpsdata?.data?.data.locations.map((value:any)=>({
                  value: value.id,
                  label: value.name
                }))}
                value={location}
                onChange={(location:any)=>{
                  setLocation(location.id)
                }}
              />
              
          </Form.Item>
          
          <Form.Item
            label={t('virtualization')}
            name="virtualization"
            initialValue={"container"}
            rules={[{ required: true, message: "Please select an virtualization" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={[
                  {
                  label:"container",
                  value:"container"
                  },
                  {
                    label:"kvm",
                    value:"kvm"
                  }
                ]}
              />
              
          </Form.Item>
          </div>
          <Form.Item
            label={('Image slug')}
            name="imageSlug"
            rules={[{ required: true, message: "Please select an image slug" }]}
          >
              <Select
                showSearch
                placeholder="Select ImageSlug"
                options={depentVpsdata?.data?.data.images.map((value:any)=>({
                  value: value.slug,
                  label: value.name
                }))}
              />
              
          </Form.Item>
          <Form.Item
            label={'Profile slug'}
            name="profileSlug"
            rules={[{ required: true, message: "Select profileSlug" }]}
          >
              <Select
                showSearch
                placeholder="Select location"
                options={profilesSlug.data?.data?.profiles?.map((val:any)=>({value: val.slug, label: val.name}))}
              />
              
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add vps
            </Button>
          </Form.Item>
        </Form>
    </>
);
} 
 export default VpsForm