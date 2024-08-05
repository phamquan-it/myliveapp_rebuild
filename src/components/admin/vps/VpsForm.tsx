import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message, Select } from "antd";
import { useTranslations } from "use-intl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/apiClient/axiosConfig";
import SelectProfile from "./select-profile";
interface VpsFormProps{
  closeModal: any,
  setSlug: Function
}
const VpsForm:React.FC<VpsFormProps> = ({closeModal, setSlug})=>{
  const t = useTranslations("MyLanguage")
  const depentVpsdata = useQuery({ queryKey: ['depent'], queryFn: ()=> axiosInstance.get("/vps-provider/get-depens-vps-data")});

  const [location,setLocation] = useState()
  //get list profile to create vps
  const profilesSlug = useQuery({ queryKey: ['ProfileSlug', location], queryFn: ()=> axiosInstance.get(
    "/vps-provider/get-profile-for-create-vps", {params: {
      locationId: 'dk'
    }}) 
  });
  //function create vps
  const createVpsMutation = useMutation({
    mutationFn: (vpsdata)=>axios.post("https://api.golive365.top/vps-provider/create-vps",vpsdata),
    onSuccess:(data)=>{
     message.success("Create vps success")
     console.log(data.data.vps.slug);
     setSlug(data.data.vps.slug)
     closeModal()
    },
    onError(error, variables, context) {
     message.error("Create vps error")
    },
 });

 const [profile,setProfile] = useState()

 const onFinish = (values: any) => {
 // console.log();
   console.log("Form values:", {...values, profileSlug: profile, locationId:"dk"});
   // console.log(profile);
   createVpsMutation.mutate(
    {
      ...values,
     profileSlug: profile?? profilesSlug?.data?.data?.profiles[0].slug, 
     locationId:"dk"
    })
 };

  return(
    <>
    <Form onFinish={onFinish} layout="vertical">
          
          <div className="grid grid-cols-2 gap-2">
          
         
          
          <Form.Item
            label={'Virtualization'}
            name="virtualization"
            initialValue={"container"}
            rules={[{ required: true, message: "Please select an virtualization" }]}
          >
              <Select
                showSearch
                placeholder="Select location" defaultValue={'container'}
                options={[
                  {
                  label:"Container",
                  value:"container"
                  },
                  {
                    label:"KVM",
                    value:"kvm"
                  }
                ]}
              />
              
          </Form.Item>
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
          </div>
         <SelectProfile profiles={profilesSlug?.data?.data?.profiles} onSelectProfileChange={(value:any)=>{
            setProfile(value)
         }}/>
         
          <div className="grid grid-cols-2 gap-2 my-3">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter vps name" }]}
          >
            <Input placeholder="Enter vps name"/>
          </Form.Item>
          <Form.Item
            name="slug"
            rules={[{ required: true, message: "Please enter slug name" }]}
          >
            <Input placeholder="Enter slug name"/>
          </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={createVpsMutation.isPending}>
              Add vps
            </Button>
          </Form.Item>
        </Form>
    </>
);
} 
 export default VpsForm
