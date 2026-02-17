import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/dashboard';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData);
      }

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
    });
  };

  return (
    <div className={styles.login}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p>{isLogin ? 'Sign in to access your dashboard' : 'Join the Brian & Jones family'}</p>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.formCard}>
            <div className={styles.formTabs}>
              <button
                className={`${styles.tab} ${isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            {error && (
              <div className={styles.error}>
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              {!isLogin && (
                <>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        required={!isLogin}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Smith"
                        required={!isLogin}
                        className={styles.input}
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      required={!isLogin}
                      className={styles.input}
                    />
                  </div>
                </>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required
                  minLength="6"
                  className={styles.input}
                />
              </div>

              {isLogin && (
                <div className={styles.forgotPassword}>
                  <a href="#">Forgot password?</a>
                </div>
              )}

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className={styles.demoInfo}>
              <p><strong>Demo Accounts:</strong></p>
              <p>Admin: admin@brianjonesautotronics.co.ke / admin123</p>
              <p>Customer: customer@example.com / customer123</p>
            </div>

            <div className={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button type="button" onClick={toggleMode} className={styles.toggleBtn}>
                {isLogin ? 'Register here' : 'Sign in here'}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>📅</span>
              <h3>Easy Quotes</h3>
              <p>Request quotes online anytime</p>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>📋</span>
              <h3>Project History</h3>
              <p>Track all your automation projects</p>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>🔔</span>
              <h3>Support Alerts</h3>
              <p>Get notified about maintenance and updates</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
