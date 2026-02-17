import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { servicesAPI, vehiclesAPI } from '../services/api';
import ServiceCard from '../components/ServiceCard.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import Testimonial from '../components/Testimonial.jsx';
import styles from './Home.module.css';

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [featuredVehicles, setFeaturedVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, vehiclesRes] = await Promise.all([
          servicesAPI.getAll(),
          vehiclesAPI.getAll(),
        ]);
        setFeaturedServices((servicesRes.data || []).slice(0, 4));
        setFeaturedVehicles((vehiclesRes.data || []).slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroVideo}>
          <div className={styles.videoPlaceholder}>
            <div className={styles.garageScene}>
              <span className={styles.garageIcon}>🤖</span>
              <span className={styles.garageIcon2}>⚡</span>
              <span className={styles.garageIcon3}>🔧</span>
            </div>
            <p className={styles.videoText}>Automation Excellence</p>
          </div>
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.container}>
            <div className={styles.heroLayout}>
              <div className={styles.heroText}>
                <h1 className={styles.heroTitle}>
                  Brian & Jones Autotronics
                </h1>
                <p className={styles.heroTagline}>
                  Advanced Automation & Robotics Solutions
                </p>
                <p className={styles.heroDescription}>
                  Leading industrial automation company in Ngong. Expert robotics integration,
                  control systems, and IoT solutions for modern industries.
                </p>
                <div className={styles.heroCTAs}>
                  <Link to="/booking" className={styles.primaryBtn}>
                    Get Free Quote
                  </Link>
                  <Link to="/inventory" className={styles.secondaryBtn}>
                    View Products
                  </Link>
                </div>
                <div className={styles.heroBadges}>
                  <div className={styles.badge}>
                    <span>⭐</span> 5.0 Google Rating
                  </div>
                  <div className={styles.badge}>
                    <span>✓</span> Certified Engineers
                  </div>
                  <div className={styles.badge}>
                    <span>🏆</span> Industry Leaders
                  </div>
                </div>
              </div>
              <div className={styles.heroImage}>
                <div className={styles.olympicRingsContainer}>
                  <div className={styles.centerPyramid}>
                    <div className={styles.pyramid3D}>
                      <div className={styles.pyramidFace}></div>
                      <div className={styles.pyramidFace2}></div>
                      <div className={styles.pyramidFace3}></div>
                    </div>
                    <div className={styles.pyramidIcon}>
                      <span className={styles.iconSpanner}>🔧</span>
                      <span className={styles.iconHandyman}>👨‍🔧</span>
                    </div>
                  </div>
                  <div className={styles.ringWrapper}>
                    <div className={`${styles.ring} ${styles.ring1}`}>
                      <img src="https://images.pexels.com/photos/8985923/pexels-photo-8985923.jpeg" alt="Automation Service 1" />
                    </div>
                    <div className={`${styles.ring} ${styles.ring2}`}>
                      <img src="https://images.pexels.com/photos/8985514/pexels-photo-8985514.jpeg" alt="Automation Service 2" />
                    </div>
                    <div className={`${styles.ring} ${styles.ring3}`}>
                      <img src="https://images.pexels.com/photos/20872010/pexels-photo-20872010.jpeg" alt="Automation Service 3" />
                    </div>
                    <div className={`${styles.ring} ${styles.ring4}`}>
                      <img src="https://images.pexels.com/photos/8985923/pexels-photo-8985923.jpeg" alt="Automation Service 4" />
                    </div>
                    <div className={`${styles.ring} ${styles.ring5}`}>
                      <img src="https://images.pexels.com/photos/8985514/pexels-photo-8985514.jpeg" alt="Automation Service 5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>
            From PLC programming to complete automation systems, we deliver cutting-edge solutions 
            tailored to your industrial needs.
          </p>

          <div className={styles.servicesGrid}>
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className={styles.sectionCTA}>
            <Link to="/services" className={styles.outlineBtn}>
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Banner */}
      <section className={styles.warrantyBanner}>
        <div className={styles.container}>
          <div className={styles.warrantyContent}>
            <div className={styles.warrantyIcon}>🚀</div>
            <div className={styles.warrantyText}>
              <h3>State-of-the-Art Automation Technology</h3>
              <p>
                We partner with leading manufacturers to bring you the latest in 
                industrial automation, robotics, and control systems.
              </p>
            </div>
            <Link to="/booking" className={styles.warrantyBtn}>
              Consult Our Experts
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Products</h2>
          <p className={styles.sectionSubtitle}>
            Quality automation components and systems ready for deployment.
          </p>

          <div className={styles.vehiclesGrid}>
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onViewDetails={() => {}} />
            ))}
          </div>

          <div className={styles.sectionCTA}>
            <Link to="/inventory" className={styles.outlineBtn}>
              View Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`${styles.section} ${styles.testimonialSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <p className={styles.sectionSubtitle}>
            Trusted by industries across Kenya for reliable automation solutions.
          </p>
          <Testimonial />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Automate Your Operations?</h2>
            <p>
              Whether you need a simple PLC upgrade or complete factory automation,
              our certified engineers are here to help.
            </p>
            <div className={styles.ctaButtons}>
              <Link to="/booking" className={styles.ctaPrimaryBtn}>
                Request Consultation
              </Link>
              <a href="tel:+254703501133" className={styles.ctaSecondaryBtn}>
                📞 0703 501133
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
