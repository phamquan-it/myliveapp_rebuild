import { DeleteFilled, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import axios from "axios";
import React, { useEffect } from "react";
interface VpsDetailProps {
  slug: string,
  closeModal: Function
}
const VpsDetail: React.FC<VpsDetailProps> = ({ slug, closeModal }) => {
  

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
      render: (text: string, record: any)=>(<>
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
            <Button type="default" size="small" icon={<EyeFilled />}></Button>
          </Tooltip>
          <Tooltip title="Remove from queue">
            <Button type="default" size="small" icon={<DeleteFilled />} danger></Button>
          </Tooltip>

        </div>
      )
    },
  ];
  const { data, isFetching, isError } = useQuery({
    queryKey: ['Queues'], queryFn: () => axios.get('https://api.golive365.top/queue/get-queue-from-vps/', {
      params: {
        slug: slug
      }
    })
  });
  useEffect(()=>{
   console.log(data);
   
  },[])
  
  
  return (
    <>

      <Title level={4} className="text-center">Vps infomation</Title>
      <Table dataSource={[{
        id: 1,
        name: 'RAM',
        value: '7.94GB'
      },
      {
        id: 2,
        name: 'Image',
        value: 'Ubuntu22.04 jammyflish'
      },
      {
        id: 3,
        name: 'CPU',
        value: 'Intel'
      }
      ]} columns={[
        {
          title: "Id",
          dataIndex: 'id'
        },
        {
          title: "Name",
          dataIndex: 'name'
        },
        {
          title: "Value",
          dataIndex: 'value'
        }
      ]} pagination={false} />
      <Title level={4} className="text-center">Queue</Title>
      <Table dataSource={data?.data} loading={isFetching} columns={columns} />
      <Input.TextArea placeholder="" readOnly rows={5} style={{
        backgroundColor: "black",
        display: (false)?"block":"none"
      }} />
    </>
  );
}
export default VpsDetail