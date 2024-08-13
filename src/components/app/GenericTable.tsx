import React from 'react';
import { Table, TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface GenericTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
}

const GenericTable = <T extends object>({ columns, data, ...rest }: GenericTableProps<T>) => {
  return <Table<T> columns={columns} dataSource={data} rowKey={(record) => `${(record as any).id}`} {...rest} />;
};

export default GenericTable;

