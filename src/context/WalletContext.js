
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('walletBalance');
    return saved ? parseFloat(saved) : 1250.00;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initial sample transactions for demo purposes
    const sampleTransactions = [
      {
        id: Date.now() - 86400000,
        type: 'received',
        amount: 500.00,
        source: 'John Smith',
        note: 'Payment for freelance work',
        date: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed'
      },
      {
        id: Date.now() - 172800000,
        type: 'sent',
        amount: 75.50,
        recipient: 'Sarah Johnson',
        note: 'Dinner split',
        date: new Date(Date.now() - 172800000).toISOString(),
        status: 'completed'
      },
      {
        id: Date.now() - 259200000,
        type: 'received',
        amount: 1200.00,
        source: 'Acme Corp',
        note: 'Invoice #1234 payment',
        date: new Date(Date.now() - 259200000).toISOString(),
        status: 'completed'
      },
      {
        id: Date.now() - 345600000,
        type: 'sent',
        amount: 25.00,
        recipient: 'Mike Wilson',
        note: 'Coffee meetup',
        date: new Date(Date.now() - 345600000).toISOString(),
        status: 'completed'
      }
    ];
    
    return sampleTransactions;
  });

  // Save to localStorage whenever balance or transactions change
  useEffect(() => {
    localStorage.setItem('walletBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const deductAmount = (amount, recipient, note = '') => {
    const numAmount = parseFloat(amount);
    
    if (numAmount <= 0 || numAmount > balance) {
      return false;
    }

    const transaction = {
      id: Date.now() + Math.random(),
      type: 'sent',
      amount: numAmount,
      recipient,
      note,
      date: new Date().toISOString(),
      status: 'completed'
    };

    setBalance(prev => prev - numAmount);
    setTransactions(prev => [transaction, ...prev]);
    
    console.log('Money sent:', { recipient, amount, note });
    return true;
  };

  const addAmount = (amount, source = 'Added') => {
    const numAmount = parseFloat(amount);
    
    if (numAmount <= 0) {
      return false;
    }

    const transaction = {
      id: Date.now() + Math.random(),
      type: 'received',
      amount: numAmount,
      source,
      date: new Date().toISOString(),
      status: 'completed'
    };

    setBalance(prev => prev + numAmount);
    setTransactions(prev => [transaction, ...prev]);
    
    return true;
  };

  const addTransaction = (transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
  };

  const deleteTransaction = (transactionId) => {
    setTransactions(prev => prev.filter(t => t.id !== transactionId));
  };

  const setBalanceDirectly = (newBalance) => {
    setBalance(newBalance);
  };

  const value = {
    balance,
    transactions,
    deductAmount,
    addAmount,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setBalance: setBalanceDirectly,
    formatCurrency: (amount) => `€${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
