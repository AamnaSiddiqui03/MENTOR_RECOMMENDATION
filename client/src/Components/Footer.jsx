import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../assets/css/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            Logo
          </div>
          <div className="footer-links">
            <ul className="footer-menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">Recommend</a></li>
              <li><a href="#">Virtualmeet</a></li>
             
            </ul>
          </div>
          <div className="footer-social">
            <ul className="social-icons">
              <li><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
              <li><a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 NammaMentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
