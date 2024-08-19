import React, {  useState } from 'react';
import {  Space, Statistic, Table } from 'antd';
import type { TableProps } from 'antd';
import {  TbCpu, TbSandbox} from 'react-icons/tb';
import { DollarCircleFilled, HddOutlined } from '@ant-design/icons';



interface SelectProfileProps{
  profiles: any[],
  onSelectProfileChange?: any
}
const SelectProfile:React.FC<SelectProfileProps> = ({profiles, onSelectProfileChange}) => {
  const fixedColumns: TableProps['columns'] = [
    {
      title: 'Slug',
      dataIndex: 'slug',
    },
    {
      title: 'Storage',
      dataIndex: 'disk',
      render: (text:any, record)=>(<>{(record.disk / 1024).toFixed(2)} GB</>)
    },
    {
      title: 'CPU',
      dataIndex: 'cpu',
      render: (text:any, record)=>(<>{record.cpu.cores} cores</>)
    },
    {
      title: 'Memory',
      dataIndex: 'ram',
      render: (text:any, record)=>(<>{(text / 1024).toFixed(2)} GB</>)
    },
    {
        title:"Price",
        dataIndex:'price',
        render: (text: string, record: any)=> formatCurrency(record.price.amount)
    }
  ];
  

  const formatCurrency = (amountInCents:any) => {
    // Convert from cents to dollars
    const amountInDollars = amountInCents / 100;
    
    // Format the amount as currency
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amountInDollars);
  };

  const tblRef: Parameters<typeof Table>[0]['ref'] = React.useRef(null);
  const data = profiles?.map((profile, index)=>({
    ...profile, id: index+1
  }))

  const mergedColumns = fixedColumns.map((col) => ({ ...col, onCell: undefined }));

  const [selectedRowKey, setSelectedRowKey] = useState<number[]>([1])

  const customExpandIcon = ({ expanded, onExpand, record }: any) => (
    <div onClick={(e) => onExpand(record, e)}>
      {record.id}
    </div>
  );

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Table
          style={{
           
            overflowX: "hidden",
            borderRadius: 10
          }}
          
          bordered={true}
          virtual
          columns={mergedColumns}
          rowKey="id"
          dataSource={data}
          pagination={false}
          ref={tblRef}
          rowSelection={{
            type: 'radio',
            columnWidth: 200,
            selectedRowKeys: selectedRowKey,
            renderCell: (text,record) => record.name,
            columnTitle: 'Profile',
          }}
          onRow={(record) => ({
            onClick: () => {
              setSelectedRowKey([record.id]),
              onSelectProfileChange(record.slug)
            }
          })}
       
        />
      </Space>
    </div>
  );
};

export default SelectProfile;
