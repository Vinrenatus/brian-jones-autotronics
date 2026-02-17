import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import BookingWizard from '../components/BookingWizard.jsx';
import styles from './Booking.module.css';

const Booking = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: '/booking' },
        replace: true
      });
    }
  }, [isAuthenticated, navigate]);

  const handleBookingComplete = (appointmentData) => {
    navigate('/dashboard', {
      state: {
        message: 'Quote request submitted! We will contact you shortly.',
        appointmentId: appointmentData.id
      }
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className={styles.booking}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Request a Quote</h1>
          <p>Get a free consultation for your automation needs</p>
        </div>
      </section>

      {/* Booking Wizard Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.bookingInfo}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📞</div>
              <h3>Need Help?</h3>
              <p>Call us at <a href="tel:+15551234567">(555) 123-4567</a></p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⏰</div>
              <h3>Business Hours</h3>
              <p>Mon-Fri: 8AM-6PM<br/>Sat: 8AM-2PM</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📍</div>
              <h3>Location</h3>
              <p>123 Main Street<br/>Auto City, AC 12345</p>
            </div>
          </div>

          <div className={styles.wizardContainer}>
            <BookingWizard onComplete={handleBookingComplete} />
          </div>

          <div className={styles.guarantees}>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>No hidden fees</span>
            </div>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>ASE certified technicians</span>
            </div>
            <div className={styles.guarantee}>
              <span className={styles.guaranteeIcon}>✓</span>
              <span>12-month warranty on major repairs</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
