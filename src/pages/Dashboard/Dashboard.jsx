import React, { useEffect, useState } from 'react';
import Cards from '../../components/Cards/Cards';
import moment from 'moment';
import AddExpense from '../../components/Modals/AddExpense';
import AddIncome from '../../components/Modals/AddIncome';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import { db } from '../../utils/firebase/firebase';
import { getIdToken } from 'firebase/auth/web-extension';

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    //get all docs from firebase collection
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshot
        transactionsArray.push(doc.data());
      });
      setTransaction(transactionsArray);
      console.log('Transaction array is', transactionsArray);
      +toast.success('Transaction fetched');
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
