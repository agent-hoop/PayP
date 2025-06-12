
import React from 'react';
import './PaymentSuccess.css';
import {Link } from 'react-router-dom'
export default function PaymentSuccess({ 
  amount, 
  recipient, 
  selectedUser, 
  onSendMore, 
  onGoToActivity 
}) {
  return (
    <div className="payment-success">
      <div className="success-container">
        <div className="success-icon">
          <div className="checkmark-circle">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          </div>
        </div>

        <div className="success-message">
          <h1>You've just sent €{parseFloat(amount).toFixed(2)} to</h1>
          <h2>
            {selectedUser ? selectedUser.name : recipient}
          </h2>
        </div>

        <div className="success-actions">
          <button className="btn-primary" onClick={onSendMore}>
            Send More Money
          </button>
          <Link to="/activity" className="btn-activity btn-secondary">
            Go to Activity
          </Link>
        </div>
      </div>
    </div>
  );
}
