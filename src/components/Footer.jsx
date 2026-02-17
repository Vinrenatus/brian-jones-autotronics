import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/inventory', label: 'Products' },
    { to: '/booking', label: 'Get Quote' },
  ];

  const services = [
    'Industrial Automation',
    'Robotics Integration',
    'Control Systems',
    'PLC Programming',
    'SCADA Systems',
    'IoT Solutions',
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.mainFooter}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            <div className={styles.footerColumn}>
              <div className={styles.footerLogo}>
                <svg viewBox="0 0 50 50" className={styles.wrenchIcon}>
                  <circle cx="25" cy="25" r="23" fill="none" stroke="#00d4ff" strokeWidth="3"/>
                  <path d="M15 20 L35 20 M15 25 L35 25 M15 30 L35 30 M20 15 L30 15 M20 35 L30 35" stroke="#00d4ff" strokeWidth="2" strokeLinecap="round"/>
                  <rect x="18" y="18" width="14" height="14" rx="2" fill="none" stroke="#ff6b35" strokeWidth="2"/>
                </svg>
                <div className={styles.logoText}>
                  <span className={styles.logoName}>Brian & Jones</span>
                  <span className={styles.logoTagline}>Autotronics</span>
                </div>
              </div>
              <p className={styles.footerTagline}>
                Leading automation solutions provider in Ngong. Specializing in industrial 
                automation, robotics, and control systems with expert technical support.
              </p>
              <div className={styles.certifications}>
                <div className={styles.certBadge}>
                  <span>⭐</span>
                  <span>5.0 Google Rating</span>
                </div>
                <div className={styles.certBadge}>
                  <span>✓</span>
                  <span>Certified Engineers</span>
                </div>
              </div>
            </div>

            <div className={styles.footerColumn}>
              <h4>Quick Links</h4>
              <ul className={styles.footerLinks}>
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Our Services</h4>
              <ul className={styles.footerLinks}>
                {services.map((service) => (
                  <li key={service}>
                    <Link to="/services">{service}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4>Contact Us</h4>
              <ul className={styles.contactInfo}>
                <li>
                  <span className={styles.icon}>📍</span>
                  <span>Embulbul Area, Former KMC/Halal Meat<br />Ngong, Kenya</span>
                </li>
                <li>
                  <span className={styles.icon}>📞</span>
                  <a href="tel:+254703501133">0703 501133</a>
                </li>
                <li>
                  <span className={styles.icon}>✉️</span>
                  <a href="mailto:info@brianjonesautotronics.co.ke">info@brianjonesautotronics.co.ke</a>
                </li>
              </ul>
              <div className={styles.hours}>
                <h5>Business Hours</h5>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 1:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p>&copy; {currentYear} Brian & Jones Autotronics. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
