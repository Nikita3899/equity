import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    account: 'Sales',
    this_month: 25,
    ytd: '123 Main St',
  },
  {
    key: '2',
    account: 'Advertising',
    this_month: 30,
    ytd: '456 Oak St',
  },
  {
    key: '3',
    account: 'Inventory',
    this_month: 30,
    ytd: '456 Oak St',
  },
  {
    key: '4',
    account: 'Entertainment',
    this_month: 30,
    ytd: '456 Oak St',
  },
  {
    key: '5',
    account: 'Product',
    this_month: 30,
    ytd: '456 Oak St',
  },
];

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

const AntdTable = () => {
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false}/>
  );
};

export default AntdTable;
