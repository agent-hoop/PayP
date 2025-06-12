
import React, { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import './Activity.css';

export default function Activity() {
  const { transactions, formatCurrency } = useWallet();
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort transactions
  const filteredAndSortedTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by type
    if (filterType === 'sent') {
      filtered = transactions.filter(t => t.type === 'sent');
    } else if (filterType === 'received') {
      filtered = transactions.filter(t => t.type === 'received');
    }

    // Sort transactions
    return filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });
  }, [transactions, filterType, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: diffDays > 365 ? 'numeric' : undefined
      });
    }
  };

  const getTransactionIcon = (transaction) => {
    if (transaction.type === 'sent') {
      return (
        <div className="transaction-icon sent">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7V17"/>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="transaction-icon received">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M17 7L7 17M7 17H17M7 17V7"/>
          </svg>
        </div>
      );
    }
  };

  const getTotalAmounts = () => {
    const sent = transactions
      .filter(t => t.type === 'sent')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const received = transactions
      .filter(t => t.type === 'received')
      .reduce((sum, t) => sum + t.amount, 0);

    return { sent, received };
  };

  const { sent: totalSent, received: totalReceived } = getTotalAmounts();

  return (
    <div className="activity">
      <div className="activity-container">
        <div className="activity-header">
          <h1>Activity</h1>
          <p>Review your PayPal transactions</p>
        </div>

        {/* Summary Cards */}
        <div className="activity-summary">
          <div className="summary-card">
            <div className="summary-icon sent">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </div>
            <div className="summary-content">
              <div className="summary-label">Money Sent</div>
              <div className="summary-amount sent">-{formatCurrency(totalSent)}</div>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon received">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 7L7 17M7 17H17M7 17V7"/>
              </svg>
            </div>
            <div className="summary-content">
              <div className="summary-label">Money Received</div>
              <div className="summary-amount received">+{formatCurrency(totalReceived)}</div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="activity-controls">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filterType === 'all' ? 'active' : ''}`}
              onClick={() => setFilterType('all')}
            >
              All ({transactions.length})
            </button>
            <button 
              className={`filter-tab ${filterType === 'sent' ? 'active' : ''}`}
              onClick={() => setFilterType('sent')}
            >
              Sent ({transactions.filter(t => t.type === 'sent').length})
            </button>
            <button 
              className={`filter-tab ${filterType === 'received' ? 'active' : ''}`}
              onClick={() => setFilterType('received')}
            >
              Received ({transactions.filter(t => t.type === 'received').length})
            </button>
          </div>

          <div className="sort-dropdown">
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>

        {/* Transaction List */}
        <div className="transactions-list">
          {filteredAndSortedTransactions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <h3>No transactions found</h3>
              <p>When you send or receive money, your transactions will appear here.</p>
            </div>
          ) : (
            filteredAndSortedTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                {getTransactionIcon(transaction)}
                
                <div className="transaction-details">
                  <div className="transaction-main">
                    <div className="transaction-title">
                      {transaction.type === 'sent' 
                        ? `Sent to ${transaction.recipient}`
                        : `Received from ${transaction.source}`
                      }
                    </div>
                    <div className="transaction-subtitle">
                      {transaction.note && (
                        <span className="transaction-note">{transaction.note}</span>
                      )}
                      <span className="transaction-date">
                        {formatDate(transaction.date)} • {transaction.status === 'completed' ? 'Completed' : transaction.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="transaction-amount">
                    <span className={`amount ${transaction.type}`}>
                      {transaction.type === 'sent' ? '-' : '+'}
                      {formatCurrency(transaction.amount)}
                    </span>
                    <div className="transaction-status">
                      <span className={`status ${transaction.status}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show more button if there are many transactions */}
        {filteredAndSortedTransactions.length > 10 && (
          <div className="load-more">
            <button className="load-more-btn">
              Load More Transactions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
