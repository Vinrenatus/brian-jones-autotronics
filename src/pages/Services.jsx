import { useState, useEffect } from 'react';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard.jsx';
import styles from './Services.module.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', label: 'All Services', icon: '📋' },
    { id: 'automation', label: 'Automation', icon: '🤖' },
    { id: 'electrical', label: 'Electrical', icon: '⚡' },
    { id: 'programming', label: 'Programming', icon: '💻' },
    { id: 'integration', label: 'Integration', icon: '🔧' },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesAPI.getAll();
        setServices(response.data || []);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const getCategoryDescription = (category) => {
    const descriptions = {
      all: 'Browse our complete range of automation solutions',
      automation: 'Industrial automation systems and robotics integration',
      electrical: 'Control panels, wiring, and electrical systems',
      diagnostic: 'System diagnostics and troubleshooting',
      programming: 'PLC, HMI, and SCADA programming services',
      integration: 'Complete system integration and commissioning',
    };
    return descriptions[category] || '';
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className={styles.services}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Our Services</h1>
          <p>Professional automation solutions with certified engineers</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.categoryTabs}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.tab} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className={styles.tabIcon}>{category.icon}</span>
                <span className={styles.tabLabel}>{category.label}</span>
              </button>
            ))}
          </div>

          <p className={styles.categoryDescription}>
            {getCategoryDescription(activeCategory)}
          </p>

          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className={styles.emptyState}>
              <p>No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whyUs}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Why Choose Brian & Jones?</h2>

          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⭐</div>
              <h3>5.0 Google Rating</h3>
              <p>Trusted by industries across Kenya for quality service and professional support.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🛡️</div>
              <h3>Service Warranty</h3>
              <p>All installations and repairs come with our comprehensive warranty.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>💰</div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees. We provide detailed quotes before any work begins.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>⏱️</div>
              <h3>Quick Response</h3>
              <p>We respect your time and work efficiently to minimize downtime.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Advanced Diagnostics</h3>
              <p>State-of-the-art diagnostic tools to accurately identify issues.</p>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureIcon}>🤝</div>
              <h3>Expert Engineers</h3>
              <p>Certified professionals with extensive experience in automation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to Upgrade Your Systems?</h2>
          <p>Book a consultation or give us a call</p>
          <div className={styles.ctaButtons}>
            <a href="/booking" className={styles.primaryBtn}>Get Quote</a>
            <a href="tel:+254703501133" className={styles.secondaryBtn}>📞 0703 501133</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
