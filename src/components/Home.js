import './Home.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

import { useWallet } from '../context/WalletContext';

export default function Home({ onNotification }) {
  const { balance, addAmount } = useWallet();
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [addAmount_input, setAddAmount_input] = useState('');

  const handleAddMoney = () => {
    const amount = parseFloat(addAmount_input);
    if (amount > 0) {
      const success = addAmount(amount, 'Manual Add');
      if (success) {
        onNotification && onNotification(`Successfully added €${amount.toFixed(2)} to your wallet`, 'success');
        setAddAmount_input('');
        setShowAddMoney(false);
      }
    }
  };

  const handleQuickAdd = () => {
    const success = addAmount(90989983, 'Quick Add');
    if (success) {
      onNotification && onNotification(`Successfully added €90,989,983.00 to your wallet`, 'success');
    }
  };

  return (
    <div className="home">
      {/* Balance Section */}
      <section className="balance-section">
        <h2>Your Balance</h2>
        <div className="balance-card">
          <div className="balance-amount">
            € {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div> 
          <div className="balance-buttons">
            <button className="btn primary" onClick={() => setShowAddMoney(true)}>Add Money</button>
            <button className="btn secondary">Withdraw</button>
          </div>
        </div>
      </section>

      {/* Add Money Modal */}
      {showAddMoney && (
        <div className="modal-overlay" onClick={() => setShowAddMoney(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add Money to Wallet</h3>
            <div className="add-money-form">
              <div className="input-group">
                <label>Amount (€)</label>
                <input
                  type="number"
                  value={addAmount_input}
                  onChange={(e) => setAddAmount_input(e.target.value)}
                  placeholder="Enter amount"
                  className="amount-input"
                />
              </div>
              <div className="quick-add">
                <button className="btn quick-btn" onClick={handleQuickAdd}>
                  Quick Add €90,989,983
                </button>
              </div>
              <div className="modal-buttons">
                <button className="btn secondary" onClick={() => setShowAddMoney(false)}>
                  Cancel
                </button>
                <button className="btn primary" onClick={handleAddMoney}>
                  Add Money
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to PayPal</h1>
          <p>Securely send and receive money, shop online, and more.</p>
          <div className="hero-buttons"> 
            <Link to="/send" className="btn primary">Send Money</Link>
            {/* <button className="btn primary"> Send Money</button> */}
            <button className="btn secondary">Request Money</button>
          </div>
        </div>
        {/* <div className="hero-image">
          <img
            src="https://www.visa.co.in/dam/VCOM/regional/ap/india/global-elements/images/in-visa-gold-card-498x280.png"
            alt="PayPal Hero"
          />
        </div> */}
      </section>

      {/* Quick Links Section */}
      <section className="quick-links">
        <div className="section-container">
          <h2>Quick Links</h2>
          <div className="quick-links-grid">
            <div className="quick-link-item">
              <div className="quick-link-icon purple">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm5-18v4h3V3h-3z"/>
                </svg>
              </div>
              <span>Professional Tools</span>
            </div>
            <div className="quick-link-item">
              <div className="quick-link-icon blue">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span>Ask for Money</span>
            </div>
            <div className="quick-link-item">
              <div className="quick-link-icon light-blue">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </div>
              <span>Send Money</span>
            </div>
            <div className="quick-link-item">
              <div className="quick-link-icon dark-blue">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5h2V3c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2h2c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2zM7 3v2h10V3H7z"/>
                </svg>
              </div>
              <span>QR Codes</span>
            </div>
            <div className="quick-link-item">
              <div className="quick-link-icon gold">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91 2.44.6 4.18 1.48 4.18 3.91-.01 1.83-1.38 2.83-3.12 3.16z"/>
                </svg>
              </div>
              <span>Billing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="recommendations">
        <div className="section-container">
          <h2>Our Recommendations</h2>
          <div className="recommendation-item">
            <div className="recommendation-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <div className="recommendation-content">
              <h3>Donations</h3>
              <p>Accept one-time and recurring donations with a donate button & sharable code.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
