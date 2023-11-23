import React from 'react';
import { Table } from 'antd';

const dataSource = [
  {
    key: '1',
    name: 'John Doe',
    age: 25,
    address: '123 Main St',
  },
  {
    key: '2',
    name: 'Jane Doe',
    age: 30,
    address: '456 Oak St',
  },
  {
    key: '3',
    name: 'Jane Doe',
    age: 30,
    address: '456 Oak St',
  },
  {
    key: '4',
    name: 'Jane Doe',
    age: 30,
    address: '456 Oak St',
  },
  {
    key: '5',
    name: 'Jane Doe',
    age: 30,
    address: '456 Oak St',
  },
];

const columns = [
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

const AntdTable = () => {
  return (
    <Table dataSource={dataSource} columns={columns} pagination={false}/>
  );
};

export default AntdTable;
