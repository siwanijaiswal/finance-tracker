import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards/Cards';
import moment from 'moment';
import AddExpense from '../../components/Modals/AddExpense';
import AddIncome from '../../components/Modals/AddIncome';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import { db } from '../../utils/firebase/firebase';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transaction, setTransaction] = useState([]);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

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
      date: moment(values.data).format('YYYY-MM-DD'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const userDocRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      console.log('Document written with ID:', userDocRef.id);
      toast.success('Transaction Added!');
    } catch (e) {
      console.error('error in adding document', e);
      toast.error("Couldn't add transaction");
    }
  }

  return (
    <div>
      <Cards
        showExpenseModel={showExpenseModel}
        showIncomeModel={showIncomeModel}
      />
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
  );
};

export default Dashboard;
