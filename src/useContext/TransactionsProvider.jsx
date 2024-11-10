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
  const [customTags, setCustomTags] = useState([]);
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
      console.log('added', userDocRef);
    } catch (e) {
      console.log(e);
      toast.error(e);
      if (!many) {
        toast.error("Couldn't add transaction");
      }
    }
  }

  async function addTag(customTag) {
    try {
      const userDocRef = await addDoc(
        collection(db, `users/${user.uid}/tags`),
        customTag
      );
      //appending customTag created in customTags state
      setCustomTags([...customTags, customTag]);
    } catch (e) {
      toast.error(e);
    }
  }
  const fetchCustomTag = async () => {
    if (user) {
      const q = query(collection(db, `users/${user.id}/tags`));
      const querySnapshot = await getDocs(q);
      let tagArray = [];
      querySnapshot.forEach((doc) => {
        tagArray.push(doc.data());
      });
      setCustomTags(tagArray);
    }
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
        fetchCustomTag,
        customTags,
        addTag,
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
