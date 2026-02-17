import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { appointmentsAPI } from '../services/api';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentsAPI.getByUser(user.id);
        setAppointments(response.data || []);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }
  }, [user]);

  const getStatusClass = (status) => {
    const classes = {
      scheduled: styles.statusScheduled,
      'in-progress': styles.statusInProgress,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled,
    };
    return classes[status] || '';
  };

  const getStatusIcon = (status) => {
    const icons = {
      scheduled: '📅',
      'in-progress': '🔧',
      completed: '✓',
      cancelled: '✕',
    };
    return icons[status] || '📋';
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const upcomingAppointments = appointments.filter(
    (a) => a.status === 'scheduled' || a.status === 'in-progress'
  );
  const pastAppointments = appointments.filter(
    (a) => a.status === 'completed' || a.status === 'cancelled'
  );

  return (
    <div className={styles.dashboard}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>My Dashboard</h1>
          <p>Welcome back, {user?.firstName}!</p>
        </div>
      </section>

      {/* Success Message */}
      {successMessage && (
        <div className={styles.successMessage}>
          <span>✓</span> {successMessage}
          <button onClick={() => setSuccessMessage('')} className={styles.closeMsg}>×</button>
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.container}>
          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <a href="/booking" className={styles.actionBtn}>
              <span className={styles.actionIcon}>📋</span>
              <span>Request New Quote</span>
            </a>
            <a href="/inventory" className={styles.actionBtn}>
              <span className={styles.actionIcon}>🛒</span>
              <span>Browse Products</span>
            </a>
            <a href="/services" className={styles.actionBtn}>
              <span className={styles.actionIcon}>⚡</span>
              <span>View Services</span>
            </a>
            <a href="tel:+254703501133" className={styles.actionBtn}>
              <span className={styles.actionIcon}>📞</span>
              <span>Call Us</span>
            </a>
          </div>

          {/* Upcoming Appointments */}
          <div className={styles.sectionBlock}>
            <h2>Upcoming Projects</h2>

            {upcomingAppointments.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No upcoming projects</p>
                <a href="/booking" className={styles.bookBtn}>Request Your First Quote</a>
              </div>
            ) : (
              <div className={styles.appointmentsList}>
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className={styles.appointmentCard}>
                    <div className={styles.appointmentHeader}>
                      <div className={styles.serviceInfo}>
                        <span className={styles.serviceIcon}>⚡</span>
                        <div>
                          <h3>{appointment.serviceName}</h3>
                          <p className={styles.vehicleText}>
                            {appointment.vehicleInfo?.year} {appointment.vehicleInfo?.make} {appointment.vehicleInfo?.model}
                          </p>
                        </div>
                      </div>
                      <span className={`${styles.statusBadge} ${getStatusClass(appointment.status)}`}>
                        {getStatusIcon(appointment.status)} {appointment.status}
                      </span>
                    </div>

                    <div className={styles.appointmentDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>📅</span>
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>🕐</span>
                        <span>{formatTime(appointment.time)}</span>
                      </div>
                      {appointment.customerNotes && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailIcon}>📝</span>
                          <span>{appointment.customerNotes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div className={styles.sectionBlock}>
            <h2>Project History</h2>

            {pastAppointments.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No project history yet</p>
              </div>
            ) : (
              <div className={styles.appointmentsList}>
                {pastAppointments.map((appointment) => (
                  <div key={appointment.id} className={styles.appointmentCard}>
                    <div className={styles.appointmentHeader}>
                      <div className={styles.serviceInfo}>
                        <span className={styles.serviceIcon}>⚡</span>
                        <div>
                          <h3>{appointment.serviceName}</h3>
                          <p className={styles.vehicleText}>
                            {appointment.vehicleInfo?.year} {appointment.vehicleInfo?.make} {appointment.vehicleInfo?.model}
                          </p>
                        </div>
                      </div>
                      <span className={`${styles.statusBadge} ${getStatusClass(appointment.status)}`}>
                        {getStatusIcon(appointment.status)} {appointment.status}
                      </span>
                    </div>

                    <div className={styles.appointmentDetails}>
                      <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>📅</span>
                        <span>{formatDate(appointment.date)}</span>
                      </div>
                      {appointment.totalCost && (
                        <div className={styles.detailItem}>
                          <span className={styles.detailIcon}>💰</span>
                          <span>KSh {appointment.totalCost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          <div className={styles.sectionBlock}>
            <h2>Profile Information</h2>
            <div className={styles.profileCard}>
              <div className={styles.profileHeader}>
                <div className={styles.profileAvatar}>
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <div className={styles.profileInfo}>
                  <h3>{user?.firstName} {user?.lastName}</h3>
                  <span className={styles.roleBadge}>{user?.role}</span>
                </div>
              </div>
              <div className={styles.profileDetails}>
                <div className={styles.profileItem}>
                  <span className={styles.profileLabel}>Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className={styles.profileItem}>
                  <span className={styles.profileLabel}>Phone</span>
                  <span>{user?.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
