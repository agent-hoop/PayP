import './Footer.css'

export default function Footer(){
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-section">
        <h4>PayPal</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Newsroom</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Values in Action</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Products & Services</h4>
        <ul>
          <li><a href="#">Send Money</a></li>
          <li><a href="#">PayPal Checkout</a></li>
          <li><a href="#">Pay in 4</a></li>
          <li><a href="#">Credit and Cards</a></li>
          <li><a href="#">PayPal Rewards</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Resources</h4>
        <ul>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Security Center</a></li>
          <li><a href="#">Developer Resources</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Consumer Info</h4>
        <ul>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Feedback</a></li>
          <li><a href="#">Accessibility</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 1999-2024 PayPal, Inc. All rights reserved.</p>
      <div className="footer-legal">
        <a href="#">Privacy</a>
        <a href="#">Legal</a>
        <a href="#">Policy Updates</a>
      </div>
    </div>
  </footer>
  );
}