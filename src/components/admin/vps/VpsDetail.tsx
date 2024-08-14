import { DeleteFilled, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Modal, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import { text } from "stream/consumers";
import ViewQueuesProcess from "@/components/app/View.queues.component";
import XtermUI from "@/components/app/Xterm.component";
import ViewQueuesComponent from "@/components/app/View.queues.component";
interface VpsDetailProps {
  slug: any,
  closeModal: Function
}
const VpsDetail: React.FC<VpsDetailProps> = ({ slug, closeModal }) => {
  const [isModalOpen,setIsModalOpen] = useState(false)
  const handleOpenModal = ()=>{ 
   setIsModalOpen(true)
  }
  const handleCloseModal = ()=>{ 
   setIsModalOpen(false)
  }


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'key',
    },
    {
      title: 'Mission',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (<>
        {record?.mission.name}
      </>)
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (id: string) => (
        <div className="flex gap-1">
          <Tooltip title="View detail">
            <Button type="default" size="small" icon={<EyeFilled />} onClick={handleOpenModal}></Button>
          </Tooltip>
          <Tooltip title="Remove from queue">
            <Button type="default" size="small" icon={<DeleteFilled />} danger></Button>
          </Tooltip>

        </div>
      )
    },
  ];
  const systeminfo = useQuery({
    queryKey: ['vps_detail', slug], queryFn: () => axios.get("https://api.golive365.top/vps-provider/get-profile-for-create-vps?locationId=dk", webdockConfig)
  });

  const { data, isFetching, isError } = useQuery({
    queryKey: ['Queues'], queryFn: () => axios.get('https://api.golive365.top/queue/get-queue-from-vps/', {
      params: {
        slug: slug.slug
      }
    })
  });
  const [vpsData,setVpsData] = useState<any>()
  useEffect(() => {
    console.log();
    systeminfo.data?.data.profiles?.map((profile:any)=>{
      if(profile.slug == slug.profile)
        setVpsData(profile)
      
        
    })
  }, [slug])


  return (
    <>
      <Title level={4} className="text-center">Vps infomation</Title>
      <Table dataSource={systeminfo.data?.data.profiles} columns={[
        {
          title: "",
          dataIndex: 'id',
          key:'id',
          align: "center",
          render: (text: string, record:any, index: number)=>(
            <>
                  <Checkbox
                    defaultChecked={record.slug == slug.profile}
                    
                  />
            </>
          )
        },
        {
          title: "Name",
          dataIndex: 'name',
          key:'name'
        },
        {
          title: "Disk",
          dataIndex: 'disk',
          key:'disk',
          render:(text)=>(text/1024).toFixed(1) + "GB"
        },
        {
          title: "Ram",
          dataIndex: 'ram',
          key:'ram',
          render:(text)=>(text/1024).toFixed(1) + "GB"
        },
        {
          title: "Cores",
          dataIndex: 'cpu',
          key:'cpu',
          render: (text, record)=> record.cpu.cores
        },
        {
          title: "Threads",
          dataIndex: 'cpu',
          key:'cpu',
          render: (text, record)=> record.cpu.threads
        }
      ]} pagination={false} />
      <Title level={4} className="text-center">Queue</Title>
      <Table dataSource={data?.data} loading={isFetching} columns={columns} />
      <Input.TextArea placeholder="" readOnly rows={5} style={{
        backgroundColor: "black",
        display: (false) ? "block" : "none"
      }} />
      <ViewQueuesComponent />
    </>
  );
}
export default VpsDetail
