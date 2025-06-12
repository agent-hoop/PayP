
import './SendMoney.css';
import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '../context/WalletContext';
import { searchUsers } from '../data/mockUsers';
import PaymentSuccess from './PaymentSuccess';
import Footer from './Footer';

export default function SendMoney({ onNotification }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const searchInputRef = useRef(null);
  const { balance, deductAmount } = useWallet();

  const validateRecipient = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    const usernameRegex = /^@[a-zA-Z0-9_]{3,}$/;  
    if (!value.trim()) {
      return 'Recipient is required';
    }
    
    if (value.includes('@') && !value.startsWith('@')) {
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    } else if (value.startsWith('@')) {
      if (!usernameRegex.test(value)) {
        return 'Username must be at least 3 characters and contain only letters, numbers, and underscores';
      }
    } else if (phoneRegex.test(value.replace(/\s/g, ''))) {
      // Valid phone number
    } else {
      return 'Please enter a valid email, username (@username), or phone number';
    }
    
    return '';
  };

  const handleNext = (e) => {
    e.preventDefault();
    
    const recipientError = validateRecipient(recipient);
    if (recipientError) {
      setErrors({ recipient: recipientError });
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep(2);
    }, 1500);
  };

  const validateAmount = (value) => {
    const numAmount = parseFloat(value);
    
    if (!value || isNaN(numAmount)) {
      return 'Amount is required';
    }
    
    if (numAmount <= 0) {
      return 'Amount must be greater than 0';
    }
    
    if (numAmount < 0.01) {
      return 'Minimum amount is €0.01';
    }
    
    if (numAmount > balance) {
      return `Insufficient balance. Maximum: €${balance.toFixed(2)}`;
    }
    
    if (numAmount > 10000) {
      return 'Maximum transaction limit is €10,000';
    }
    
    return '';
  };

  const handleSend = (e) => {
    e.preventDefault();
    
    const amountError = validateAmount(amount);
    if (amountError) {
      setErrors({ amount: amountError });
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    
    // const numAmount = parseFloat(amount);
    
    
    // Simulate sending with more realistic timing
    setTimeout(() => {
      const success = deductAmount(amount, recipient, note);
      setIsLoading(false);
      
      if (success) {
        // Show success screen
        setSuccessData({
          amount,
          recipient,
          selectedUser,
          note
        });
        setPaymentSuccess(true);
      } else {
        onNotification && onNotification('Transaction failed. Please try again.', 'error');
      }
    }, 2000);
  };

  // Handle search input changes
  const handleSearchInput = (value) => {
    setRecipient(value);
    setSelectedUser(null);
    
    if (value.length >= 2) {
      const results = searchUsers(value);
      setSearchResults(results);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
    
    if (errors.recipient) {
      setErrors(prev => ({ ...prev, recipient: '' }));
    }
  };

  // Handle user selection from search results
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setRecipient(user.username);
    setShowSearchResults(false);
    setSearchResults([]);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Real-time validation
  React.useEffect(() => {
    if (currentStep === 2) {
      const amountError = validateAmount(amount);
      setIsFormValid(!amountError && amount);
    }
  }, [amount, balance, currentStep]);

  // Handle success screen actions
  const handleSendMore = () => {
    setPaymentSuccess(false);
    setSuccessData(null);
    setRecipient('');
    setAmount('');
    setNote('');
    setCurrentStep(1);
    setSelectedUser(null);
  };

  const handleGoToActivity = () => {
    setPaymentSuccess(false);
    setSuccessData(null);
    setRecipient('');
    setAmount('');
    setNote('');
    setCurrentStep(1);
    setSelectedUser(null);
    // Navigate to activity page
    if (window.App && window.App.setCurrentPage) {
      window.App.setCurrentPage('activity');
    }
  };

  // Show success screen if payment is successful
  if (paymentSuccess && successData) {
    return (
      <PaymentSuccess
        amount={successData.amount}
        recipient={successData.recipient}
        selectedUser={successData.selectedUser}
        onSendMore={handleSendMore}
        onGoToActivity={handleGoToActivity}
      />
    );
  }

  return (
    <>
      <div className="send-money">
        <div className="send-container">
          {currentStep === 1 && (
            <div className="step-container">
              <div className="send-header">
                <h1>Send payment to</h1>
              </div>

              <form className="send-form" onSubmit={handleNext}>
                <div className="input-container" ref={searchInputRef}>
                  <div className="search-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Name, @username, email, or mobile"
                    value={recipient}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) {
                        setShowSearchResults(true);
                      }
                    }}
                    className={`recipient-input ${errors.recipient ? 'error' : ''}`}
                    required
                  />
                  
                  {/* Search Results Dropdown */}
                  {showSearchResults && searchResults.length > 0 && (

                    <div className="search-results">
                      {searchResults.map((user) => (
                        <div
                          key={user.id}
                          className="search-result-item"
                          onClick={() => handleUserSelect(user)}
                        >
                          <div className="user-avatar">
                            <img src={user.avatar} alt={user.name} />
                            {user.verified && (
                              <div className="verified-badge">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0070ba" strokeWidth="2" fill="#0070ba"/>
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-details">
                              <span className="username">{user.username}</span>
                              <span className="email">{user.email}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.recipient && (
                  <div className="error-message">
                    {errors.recipient}
                  </div>
                )}

                <button type="submit" className="next-btn" disabled={isLoading || !recipient.trim()}>
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    'Next'
                  )}
                </button>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-container">
              <div className="send-header">
                <button className="back-btn" onClick={() => setCurrentStep(1)}>
                  ← Back
                </button>
                <div className="recipient-info">
  {selectedUser ? (
    <div className="selected-user">
      <div className="user-avatar-small">
        {selectedUser.avatar ? (
          <img src={selectedUser.avatar} alt={selectedUser.name} />
        ) : (
          <div className="default-avatar-small">
            {selectedUser.name?.charAt(0).toUpperCase()}
          </div>
        )}
        {selectedUser.verified && (
          <div className="verified-badge-small">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#0070ba" strokeWidth="2" fill="#0070ba"/>
            </svg>
          </div>
        )}
      </div>
      <div>
        <h1>Send to {selectedUser.name}</h1>
        <p className="recipient-email">{selectedUser.email}</p>
      </div>
    </div>
  ) : (
    <h1>Send to {recipient}</h1>
  )}
</div>

              </div>

              <form className="send-form" onSubmit={handleSend}>
                <div className="form-section">
                  <label>Amount</label>
                  <div className="balance-info">
                    <span>Available: €{balance.toFixed(2)}</span>
                  </div>
                  <div className="amount-input-container">
                    <span className="currency-symbol">€</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        if (errors.amount) {
                          setErrors(prev => ({ ...prev, amount: '' }));
                        }
                      }}
                      className={`amount-input ${errors.amount ? 'error' : ''}`}
                      step="0.01"
                      min="0.01"
                      max={balance}
                      required
                    />
                  </div>
                  {errors.amount && (
                    <div className="error-message">
                      {errors.amount}
                    </div>
                  )}
                </div>

                <div className="form-section">
                  <label>Note (Optional)</label>
                  <textarea
                    placeholder="What's this for?"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="note-input"
                    rows="3"
                  />
                </div>

                <button type="submit" className="send-btn" disabled={isLoading || !isFormValid}>
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    `Send €${amount || '0.00'}`
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
