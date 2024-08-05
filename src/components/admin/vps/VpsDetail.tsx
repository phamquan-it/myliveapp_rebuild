import { DeleteFilled, DeleteOutlined, EyeFilled } from "@ant-design/icons";
import { Button, Form, Input, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
interface VpsDetailProps{
  slug: string,
  closeModal: Function
} 
 const VpsDetail:React.FC<VpsDetailProps> = ({slug, closeModal})=>{
    const dataSource = [
        {
          key: '1',
          name: 'Setup vps for live',
          status: 'initialize',
        },
      
      ];
      
      const columns = [
        {
          title: 'ID',
          dataIndex: 'key',
          key: 'key',
        },
        {
          title: 'Mission',
          dataIndex: 'name',
          key: 'name',
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
          render: (id: string)=>(
            <div className="flex gap-1">
            <Tooltip title="View detail">
              <Button type="default" size="small" icon={<EyeFilled/>}></Button>
            </Tooltip>
            <Tooltip title="Remove from queue">
              <Button type="default" size="small" icon={<DeleteFilled/>} danger></Button>
            </Tooltip>
            
            </div>
          )
        },
      ];
  return(
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
            title:"Id",
            dataIndex: 'id'
          },
          {
            title:"Name",
            dataIndex: 'name'
          },
          {
            title:"Value",
            dataIndex: 'value'
          }
        ]} pagination={false}/>
        <Title level={4} className="text-center">Queue</Title>
        <Table dataSource={dataSource} columns={columns} />
        <Input.TextArea placeholder="" readOnly rows={5} style={{
          backgroundColor: "black"
        }}/>
    </>
);
} 
 export default VpsDetail