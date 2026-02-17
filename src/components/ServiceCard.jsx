import { Link } from 'react-router-dom';
import styles from './ServiceCard.module.css';

const serviceIcons = {
  engine: '🔧',
  transmission: '⚙️',
  brakes: '🛑',
  suspension: '🔩',
  oil: '🛢️',
  wiring: '⚡',
  ecu: '💻',
  battery: '🔋',
  obd: '📱',
  analysis: '📊',
  emissions: '🌿',
  'engine-rebuild': '🔨',
  'transmission-rebuild': '⚒️',
};

const ServiceCard = ({ service, compact = false }) => {
  const icon = serviceIcons[service.icon] || '🔧';

  if (compact) {
    return (
      <div className={styles.compactCard}>
        <span className={styles.compactIcon}>{icon}</span>
        <div className={styles.compactContent}>
          <h4>{service.name}</h4>
          <p className={styles.compactPrice}>{service.priceEstimate}</p>
        </div>
        <Link to="/booking" className={styles.compactBtn}>
          Book
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.category}>{service.category}</div>
      <h3 className={styles.title}>{service.name}</h3>
      <p className={styles.description}>{service.description}</p>
      <div className={styles.details}>
        <span className={styles.duration}>⏱️ {service.duration}</span>
        <span className={styles.price}>{service.priceEstimate}</span>
      </div>
      <Link to="/booking" className={styles.bookBtn}>
        Book Now
      </Link>
    </div>
  );
};

export default ServiceCard;
