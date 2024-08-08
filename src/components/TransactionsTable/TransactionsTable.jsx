import React, { useState } from 'react';
import { Table, Select, Radio } from 'antd';
import searchImg from '../../assets/search.svg';
import './TransactionsTable.css';

const TransactionsTable = ({ transactions }) => {
  const { Option } = Select;
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');

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
  let filteredTransactions = transactions.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.type.includes(typeFilter)
  );

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === 'amount') {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div className='transaction-search-filter'>
        <div className='input-flex'>
          <img src={searchImg} width='16' />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search by name'
          />
        </div>
        <Select
          className='select-input'
          onChange={(value) => setTypeFilter(value)}
          value={typeFilter}
          placeholder='Filter'
          allowClear
        >
          <Option value=''> All </Option>
          <Option value='income'>Income</Option>
          <Option value='expense'>Expense</Option>
        </Select>
      </div>
      <div className='table-radio'>
        <h2>My Transactions</h2>
        <Radio.Group
          className='input-radio'
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value=''> No Sort</Radio.Button>
          <Radio.Button value='date'>Sort By Date </Radio.Button>
          <Radio.Button value='amount'>Sort By Amount</Radio.Button>
        </Radio.Group>
        <div className='csv-btn'>
          <button className='btn'>Export to CSV</button>
          <label htmlFor='file-csv' className='btn btn-blue'>
            Import from CSV
          </label>
          <input
            id='file-csv'
            type='file'
            accept='.csv'
            required
            style={{ display: 'none' }}
          />
        </div>
      </div>
      <Table dataSource={sortedTransactions} columns={columns} />;
    </div>
  );
};

export default TransactionsTable;
