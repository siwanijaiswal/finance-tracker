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

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

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
      toast.success('Transaction Added!');
      let newTransactionArr = transactions;
      newTransactionArr.push(transaction);
      setTransactions(newTransactionArr);
      calculateBalance();
    } catch (e) {
      console.error('error in adding document', e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    //get all docs from firebase collection
    fetchTransaction();
  }, []);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    let totalCalculatedBalance = totalIncome - totalExpense;

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalCalculatedBalance);
  };

  const fetchTransaction = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
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
            income={income}
            expense={expense}
            totalBalance={totalBalance}
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
