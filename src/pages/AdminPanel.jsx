import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { appointmentsAPI, vehiclesAPI, usersAPI } from '../services/api';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, vehiclesRes, usersRes] = await Promise.all([
          appointmentsAPI.getAll(),
          vehiclesAPI.getAll(),
          usersAPI.getAll(),
        ]);
        setAppointments(appointmentsRes.data || []);
        setVehicles(vehiclesRes.data || []);
        setUsers(usersRes.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (isAdmin()) {
      fetchData();
    }
  }, [isAdmin]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await appointmentsAPI.updateStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
      );
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await appointmentsAPI.delete(id);
        setAppointments((prev) => prev.filter((apt) => apt.id !== id));
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
  };

  const handleDeleteVehicle = async (id) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await vehiclesAPI.delete(id);
        setVehicles((prev) => prev.filter((v) => v.id !== id));
      } catch (err) {
        console.error('Failed to delete vehicle:', err);
      }
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusClass = (status) => {
    const classes = {
      scheduled: styles.statusScheduled,
      'in-progress': styles.statusInProgress,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled,
    };
    return classes[status] || '';
  };

  const stats = {
    totalAppointments: appointments.length,
    scheduledAppointments: appointments.filter((a) => a.status === 'scheduled').length,
    inProgressAppointments: appointments.filter((a) => a.status === 'in-progress').length,
    totalVehicles: vehicles.length,
    certifiedVehicles: vehicles.filter((v) => v.condition === 'reconditioned').length,
    totalUsers: users.filter((u) => u.role === 'customer').length,
  };

  if (!isAdmin()) {
    return null;
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading admin panel...</p>
      </div>
    );
  }

  return (
    <div className={styles.admin}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Admin Panel</h1>
          <p>Manage appointments, inventory, and users</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          {/* Stats Overview */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📅</div>
              <div className={styles.statValue}>{stats.totalAppointments}</div>
              <div className={styles.statLabel}>Total Appointments</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🔧</div>
              <div className={styles.statValue}>{stats.inProgressAppointments}</div>
              <div className={styles.statLabel}>In Progress</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🚗</div>
              <div className={styles.statValue}>{stats.totalVehicles}</div>
              <div className={styles.statLabel}>Vehicles in Stock</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🏅</div>
              <div className={styles.statValue}>{stats.certifiedVehicles}</div>
              <div className={styles.statLabel}>Certified Vehicles</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>👥</div>
              <div className={styles.statValue}>{stats.totalUsers}</div>
              <div className={styles.statLabel}>Registered Customers</div>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === 'appointments' ? styles.active : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'vehicles' ? styles.active : ''}`}
              onClick={() => setActiveTab('vehicles')}
            >
              Vehicles
            </button>
            <button
              className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
              onClick={() => setActiveTab('users')}
            >
              Users
            </button>
          </div>

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <h2>All Appointments</h2>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Vehicle</th>
                      <th>Date/Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id}>
                        <td>
                          {apt.userId && users.find((u) => u.id === apt.userId)?.firstName}{' '}
                          {apt.userId && users.find((u) => u.id === apt.userId)?.lastName}
                        </td>
                        <td>{apt.serviceName}</td>
                        <td>
                          {apt.vehicleInfo?.year} {apt.vehicleInfo?.make} {apt.vehicleInfo?.model}
                        </td>
                        <td>
                          {formatDate(apt.date)}<br />
                          <small>{apt.time}</small>
                        </td>
                        <td>
                          <span className={`${styles.statusBadge} ${getStatusClass(apt.status)}`}>
                            {apt.status}
                          </span>
                        </td>
                        <td>
                          <div className={styles.actionButtons}>
                            {apt.status === 'scheduled' && (
                              <button
                                className={styles.actionBtn}
                                onClick={() => handleStatusUpdate(apt.id, 'in-progress')}
                              >
                                Start
                              </button>
                            )}
                            {apt.status === 'in-progress' && (
                              <button
                                className={`${styles.actionBtn} ${styles.completeBtn}`}
                                onClick={() => handleStatusUpdate(apt.id, 'completed')}
                              >
                                Complete
                              </button>
                            )}
                            <button
                              className={`${styles.actionBtn} ${styles.deleteBtn}`}
                              onClick={() => handleDeleteAppointment(apt.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <h2>Vehicle Inventory</h2>
                <button className={styles.addBtn} onClick={() => setShowVehicleModal(true)}>
                  + Add Vehicle
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Vehicle</th>
                      <th>Condition</th>
                      <th>Mileage</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id}>
                        <td>
                          {vehicle.year} {vehicle.make} {vehicle.model}
                        </td>
                        <td>
                          <span className={styles.conditionBadge}>
                            {vehicle.condition === 'reconditioned' ? '✓ Certified' : 'Used'}
                          </span>
                        </td>
                        <td>{vehicle.mileage.toLocaleString()}</td>
                        <td>{formatPrice(vehicle.price)}</td>
                        <td>
                          <div className={styles.actionButtons}>
                            <button
                              className={styles.actionBtn}
                              onClick={() => {
                                setEditingVehicle(vehicle);
                                setShowVehicleModal(true);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className={`${styles.actionBtn} ${styles.deleteBtn}`}
                              onClick={() => handleDeleteVehicle(vehicle.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className={styles.tabContent}>
              <div className={styles.tabHeader}>
                <h2>Registered Users</h2>
                <div className={styles.userStats}>
                  <span className={styles.userStatItem}>
                    <span className={styles.userStatValue}>{users.length}</span>
                    <span className={styles.userStatLabel}>Total Users</span>
                  </span>
                  <span className={styles.userStatItem}>
                    <span className={styles.userStatValue}>{users.filter(u => u.role === 'customer').length}</span>
                    <span className={styles.userStatLabel}>Customers</span>
                  </span>
                  <span className={styles.userStatItem}>
                    <span className={styles.userStatValue}>{users.filter(u => u.role === 'mechanic').length}</span>
                    <span className={styles.userStatLabel}>Mechanics</span>
                  </span>
                  <span className={styles.userStatItem}>
                    <span className={styles.userStatValue}>{users.filter(u => u.role === 'admin').length}</span>
                    <span className={styles.userStatLabel}>Admins</span>
                  </span>
                </div>
              </div>
              
              <div className={styles.usersGrid}>
                {users.map((u) => (
                  <div key={u.id} className={styles.userCard}>
                    <div className={styles.userCardHeader}>
                      <div className={styles.userAvatar}>
                        {u.firstName?.charAt(0)}{u.lastName?.charAt(0)}
                      </div>
                      <div className={styles.userInfo}>
                        <h3 className={styles.userName}>{u.firstName} {u.lastName}</h3>
                        <span className={`${styles.roleBadge} ${styles[u.role]}`}>
                          {u.role}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.userCardBody}>
                      <div className={styles.userDetail}>
                        <span className={styles.userDetailIcon}>✉️</span>
                        <div className={styles.userDetailContent}>
                          <span className={styles.userDetailLabel}>Email</span>
                          <span className={styles.userDetailValue}>{u.email}</span>
                        </div>
                      </div>
                      
                      <div className={styles.userDetail}>
                        <span className={styles.userDetailIcon}>📞</span>
                        <div className={styles.userDetailContent}>
                          <span className={styles.userDetailLabel}>Phone</span>
                          <span className={styles.userDetailValue}>{u.phone}</span>
                        </div>
                      </div>
                      
                      {u.role === 'customer' && (
                        <div className={styles.userDetail}>
                          <span className={styles.userDetailIcon}>📅</span>
                          <div className={styles.userDetailContent}>
                            <span className={styles.userDetailLabel}>Appointments</span>
                            <span className={styles.userDetailValue}>
                              {appointments.filter(a => a.userId === u.id).length}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.userCardFooter}>
                      <span className={styles.memberSince}>Member</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {users.length === 0 && (
                <div className={styles.emptyUsers}>
                  <span className={styles.emptyIcon}>👥</span>
                  <p>No registered users yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPanel;
