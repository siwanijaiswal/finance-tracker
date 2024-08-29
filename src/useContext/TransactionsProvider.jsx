import React, { createContext, useContext, useState, useEffect } from 'react';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase/firebase';
import { db } from '../utils/firebase/firebase';
import { toast } from 'react-toastify';

const TransactionsContext = createContext();
export const useTransaction = () => useContext(TransactionsContext);

const TransactionsProvider = ({ children }) => {
  const [user] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //get all docs from firebase collection
    fetchTransaction();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  async function addTransaction(transaction, many) {
    try {
      const userDocRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      if (!many) {
        toast.success('Transaction Added!');
      }
      let newTransactionArr = transactions;
      newTransactionArr.push(transaction);
      setTransactions(newTransactionArr);
      calculateBalance();
    } catch (e) {
      toast.error(e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

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
    }
    setLoading(false);
  };

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

    setIncome(totalIncome);
    setExpense(totalExpense);
    setTotalBalance(totalIncome - totalExpense);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        fetchTransaction,
        income,
        expense,
        totalBalance,
        loading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsProvider;
