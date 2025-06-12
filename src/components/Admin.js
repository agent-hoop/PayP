
import React, { useState, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import './Admin.css';

export default function Admin() {
  const { transactions, balance, addTransaction, updateTransaction, deleteTransaction, setBalance } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    type: 'received',
    amount: '',
    recipient: '',
    source: '',
    note: '',
    status: 'completed'
  });
  const [balanceInput, setBalanceInput] = useState(balance);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('userProfilePic') || '/api/placeholder/150/150';
  });
  const [newProfilePic, setNewProfilePic] = useState('');

  const handleCreateTransaction = () => {
    const amount = parseFloat(newTransaction.amount);
    if (amount > 0) {
      const transaction = {
        id: Date.now() + Math.random(),
        type: newTransaction.type,
        amount,
        recipient: newTransaction.type === 'sent' ? newTransaction.recipient : undefined,
        source: newTransaction.type === 'received' ? newTransaction.source : undefined,
        note: newTransaction.note,
        date: new Date().toISOString(),
        status: newTransaction.status
      };

      addTransaction(transaction);
      setNewTransaction({
        type: 'received',
        amount: '',
        recipient: '',
        source: '',
        note: '',
        status: 'completed'
      });
      setShowCreateModal(false);
    }
  };

  const handleEditTransaction = () => {
    if (selectedTransaction) {
      const updatedTransaction = {
        ...selectedTransaction,
        amount: parseFloat(selectedTransaction.amount),
        note: selectedTransaction.note,
        status: selectedTransaction.status
      };
      updateTransaction(updatedTransaction);
      setShowEditModal(false);
      setSelectedTransaction(null);
    }
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleBalanceUpdate = () => {
    const newBalance = parseFloat(balanceInput);
    if (newBalance >= 0) {
      setBalance(newBalance);
    }
  };

  const handleProfilePicUpdate = () => {
    if (newProfilePic.trim()) {
      setProfilePic(newProfilePic);
      localStorage.setItem('userProfilePic', newProfilePic);
      setNewProfilePic('');
      setShowProfileModal(false);
    }
  };

  const getTransactionStats = () => {
    const totalSent = transactions.filter(t => t.type === 'sent').reduce((sum, t) => sum + t.amount, 0);
    const totalReceived = transactions.filter(t => t.type === 'received').reduce((sum, t) => sum + t.amount, 0);
    const pendingCount = transactions.filter(t => t.status === 'pending').length;
    const completedCount = transactions.filter(t => t.status === 'completed').length;

    return { totalSent, totalReceived, pendingCount, completedCount };
  };

  const stats = getTransactionStats();

  return (
    <div className="admin">
      <div className="admin-container">
        <div className="admin-header">
          <h1>PayPal Admin Dashboard</h1>
          <p>Manage transactions, balances, and system operations</p>
          <div className="admin-actions">
            <button className="btn primary" onClick={() => setShowCreateModal(true)}>
              Create Transaction
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab ${activeTab === 'transactions' ? 'active' : ''}`}
            onClick={() => setActiveTab('transactions')}
          >
            Transactions
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon balance">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Current Balance</div>
                  <div className="stat-value">€{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon sent">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Sent</div>
                  <div className="stat-value">€{stats.totalSent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon received">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 7L7 17M7 17H17M7 17V7"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Received</div>
                  <div className="stat-value">€{stats.totalReceived.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon transactions">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10,9 9,9 8,9"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <div className="stat-label">Total Transactions</div>
                  <div className="stat-value">{transactions.length}</div>
                </div>
              </div>
            </div>

            <div className="status-overview">
              <h3>Transaction Status Overview</h3>
              <div className="status-grid">
                <div className="status-item">
                  <div className="status-indicator completed"></div>
                  <span>Completed: {stats.completedCount}</span>
                </div>
                <div className="status-item">
                  <div className="status-indicator pending"></div>
                  <span>Pending: {stats.pendingCount}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="admin-transactions">
            <div className="transactions-header">
              <h3>All Transactions</h3>
              <span className="transaction-count">{transactions.length} total</span>
            </div>
            
            <div className="admin-transactions-list">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="admin-transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-type">
                      <span className={`type-badge ${transaction.type}`}>
                        {transaction.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">
                        {transaction.type === 'sent' 
                          ? `To: ${transaction.recipient}`
                          : `From: ${transaction.source}`
                        }
                      </div>
                      <div className="transaction-meta">
                        ID: {transaction.id} • {new Date(transaction.date).toLocaleDateString()}
                      </div>
                      {transaction.note && (
                        <div className="transaction-note">Note: {transaction.note}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="transaction-amount">
                    <span className={`amount ${transaction.type}`}>
                      {transaction.type === 'sent' ? '-' : '+'}€{transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <span className={`status ${transaction.status}`}>
                      {transaction.status}
                    </span>
                  </div>
                  
                  <div className="transaction-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => {
                        setSelectedTransaction(transaction);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-settings">
            <div className="setting-section">
              <h3>Profile Management</h3>
              <div className="profile-control">
                <label>Profile Picture</label>
                <div className="profile-pic-group">
                  <img src={profilePic} alt="Profile" className="current-profile-pic" />
                  <button className="btn primary" onClick={() => setShowProfileModal(true)}>
                    Change Profile Picture
                  </button>
                </div>
              </div>
            </div>

            <div className="setting-section">
              <h3>Balance Management</h3>
              <div className="balance-control">
                <label>Current Balance</label>
                <div className="balance-input-group">
                  <input
                    type="number"
                    value={balanceInput}
                    onChange={(e) => setBalanceInput(e.target.value)}
                    className="balance-input"
                  />
                  <button className="btn primary" onClick={handleBalanceUpdate}>
                    Update Balance
                  </button>
                </div>
              </div>
            </div>

            <div className="setting-section">
              <h3>System Actions</h3>
              <div className="system-actions">
                <button className="btn secondary">Clear All Transactions</button>
                <button className="btn secondary">Export Data</button>
                <button className="btn secondary">Reset System</button>
              </div>
            </div>
          </div>
        )}

        {/* Create Transaction Modal */}
        {showCreateModal && (
          <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Create New Transaction</h3>
              <div className="form-group">
                <label>Transaction Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({...newTransaction, type: e.target.value})}
                >
                  <option value="received">Received</option>
                  <option value="sent">Sent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount (€)</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
                  placeholder="0.00"
                />
              </div>

              {newTransaction.type === 'sent' ? (
                <div className="form-group">
                  <label>Recipient</label>
                  <input
                    type="text"
                    value={newTransaction.recipient}
                    onChange={(e) => setNewTransaction({...newTransaction, recipient: e.target.value})}
                    placeholder="Enter recipient name"
                  />
                </div>
              ) : (
                <div className="form-group">
                  <label>Source</label>
                  <input
                    type="text"
                    value={newTransaction.source}
                    onChange={(e) => setNewTransaction({...newTransaction, source: e.target.value})}
                    placeholder="Enter source name"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Note (Optional)</label>
                <input
                  type="text"
                  value={newTransaction.note}
                  onChange={(e) => setNewTransaction({...newTransaction, note: e.target.value})}
                  placeholder="Transaction note"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newTransaction.status}
                  onChange={(e) => setNewTransaction({...newTransaction, status: e.target.value})}
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button className="btn secondary" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </button>
                <button className="btn primary" onClick={handleCreateTransaction}>
                  Create Transaction
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Picture Modal */}
        {showProfileModal && (
          <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Change Profile Picture</h3>
              <div className="form-group">
                <label>Profile Picture URL</label>
                <input
                  type="url"
                  value={newProfilePic}
                  onChange={(e) => setNewProfilePic(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
              
              {newProfilePic && (
                <div className="form-group">
                  <label>Preview</label>
                  <img src={newProfilePic} alt="Preview" className="profile-preview" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              <div className="modal-buttons">
                <button className="btn secondary" onClick={() => setShowProfileModal(false)}>
                  Cancel
                </button>
                <button className="btn primary" onClick={handleProfilePicUpdate}>
                  Update Profile Picture
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Transaction Modal */}
        {showEditModal && selectedTransaction && (
          <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Edit Transaction</h3>
              <div className="form-group">
                <label>Amount (€)</label>
                <input
                  type="number"
                  value={selectedTransaction.amount}
                  onChange={(e) => setSelectedTransaction({...selectedTransaction, amount: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Note</label>
                <input
                  type="text"
                  value={selectedTransaction.note || ''}
                  onChange={(e) => setSelectedTransaction({...selectedTransaction, note: e.target.value})}
                  placeholder="Transaction note"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={selectedTransaction.status}
                  onChange={(e) => setSelectedTransaction({...selectedTransaction, status: e.target.value})}
                >
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="modal-buttons">
                <button className="btn secondary" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button className="btn primary" onClick={handleEditTransaction}>
                  Update Transaction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
