import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Table, Tag, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
interface VpsDetailProps{
  
} 
 const VpsDetail:React.FC<VpsDetailProps> = ({})=>{
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
            <>
            <Tooltip title="Remove from queue">
              <Button type="default" size="small" icon={<DeleteFilled/>} danger></Button>
            </Tooltip>
            
            </>
          )
        },
      ];
  return(
    <>
     
      <Form
            name="basic"
            layout="vertical" className="grid grid-cols-3 gap-2"
          >
            <Form.Item label="CPU">
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="RAM">
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="CORE">
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="CPU">
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="CPU">
              <Input readOnly/>
            </Form.Item>
          </Form>
        <Title level={4} className="!text-slate-700">Queue</Title>
        <Table dataSource={dataSource} columns={columns} />
    </>
);
} 
 export default VpsDetail