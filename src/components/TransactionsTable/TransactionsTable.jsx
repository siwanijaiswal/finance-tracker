import React, { useState } from 'react';
import { Table } from 'antd';

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },

    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
  ];
  let filteredTransactions = transactions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log(filteredTransactions);

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search by name'
      />
      <Table dataSource={filteredTransactions} columns={columns} />;
    </div>
  );
};

export default TransactionsTable;
