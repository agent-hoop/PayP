
import React, { useState, useRef, useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import './ProfileDropdown.css';

export default function ProfileDropdown({ profilePic, onClose }) {
  const { balance } = useWallet();
  const [userEmail] = useState('john.doe@email.com');
  const [userName] = useState('John Doe');

  return (
    <div className="profile-dropdown">
      <div className="profile-dropdown-header">
        <img src={profilePic} alt="Profile" className="profile-dropdown-avatar" />
        <div className="profile-dropdown-info">
          <h3>{userName}</h3>
          <p>{userEmail}</p>
        </div>
      </div>
      
      <div className="profile-dropdown-balance">
        <div className="balance-info">
          <span className="balance-label">Available Balance</span>
          <span className="balance-amount">€{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
      </div>

      <div className="profile-dropdown-menu">
        <a href="#" className="dropdown-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          Profile & Settings
        </a>
        
        <a href="#" className="dropdown-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Wallet
        </a>
        
        <a href="#" className="dropdown-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Activity
        </a>
        
        <a href="#" className="dropdown-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>
          Send & Request
        </a>
        
        <div className="dropdown-divider"></div>
        
        <a href="#" className="dropdown-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
          Help & Support
        </a>
        
        <a href="#" className="dropdown-item logout">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Log Out
        </a>
      </div>
    </div>
  );
}
