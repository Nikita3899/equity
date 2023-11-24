import React from 'react';
import { Table } from 'antd';

interface DataItem{
  key: string,
  account: string,
  this_month: number,
  ytd:  number,
}

interface DataSource{
  data : DataItem[]
}

const columns = [
  {
    title: 'Account',
    dataIndex: 'account',
    key: 'account',
    width : 200,
  },
  {
    title: 'This Month',
    dataIndex: 'this_month',
    key: 'this_month',
    width : 80,
  },
  {
    title: 'YTD',
    dataIndex: 'ytd',
    key: 'ytd',
    width:80,
  },

];

const AntdTable: React.FC<DataSource> = ({data}) => {
  return (
    <Table dataSource={data} columns={columns} pagination={false}/>
  );
};

export default AntdTable;
