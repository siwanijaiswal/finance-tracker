import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards/Cards';
import AddExpense from '../../components/Modals/AddExpense';
import AddIncome from '../../components/Modals/AddIncome';
import ChartComponent from '../../components/Charts/Charts';
import NoTransactions from '../../components/NoTransactions/NoTransactions';
import { useTransaction } from '../../useContext/TransactionsProvider.jsx';

const Dashboard = () => {
  const {
    transactions,
    addTransaction,
    income,
    expense,
    totalBalance,
    loading,
  } = useTransaction();

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [sortKey, setSortKey] = useState('');

  const showExpenseModel = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModel = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date ? values.date.format('YYYY-MM-DD') : null,
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
      time: values.time ? values.time.format('hh:mm A') : null,
    };
    addTransaction(newTransaction);
  };

  let sortedTransactions = transactions.sort((a, b) => {
    if (sortKey === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
  });

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModel={showExpenseModel}
            showIncomeModel={showIncomeModel}
          />
          {transactions.length ? (
            <ChartComponent sortedTransactions={sortedTransactions} />
          ) : (
            <NoTransactions />
          )}
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
