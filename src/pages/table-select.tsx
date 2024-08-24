// pages/index.tsx
import React, { useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

const Home: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRowData, setSelectedRowData] = useState<DataType | null>(null);

  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log('Selected row keys:', newSelectedRowKeys);
    console.log('Selected row data:', selectedRows[0]);

    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRowData(selectedRows[0]);
  };

  const rowSelection: TableRowSelection<DataType> = {
    type: 'radio', // Use radio button for single row selection
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <h1>Select a Row with Radio Button Example</h1>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      {selectedRowData && (
        <div style={{ marginTop: 16 }}>
          <h2>Selected Row Data:</h2>
          <p>Name: {selectedRowData.name}</p>
          <p>Age: {selectedRowData.age}</p>
          <p>Address: {selectedRowData.address}</p>
        </div>
      )}
    </div>
  );
};

export default Home;

