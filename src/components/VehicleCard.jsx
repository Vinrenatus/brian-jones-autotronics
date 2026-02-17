import { useState } from 'react';
import styles from './VehicleCard.module.css';

const VehicleCard = ({ vehicle, onViewDetails }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const isReconditioned = vehicle.condition === 'reconditioned';

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % (vehicle.images?.length || 1));
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + (vehicle.images?.length || 1)) % (vehicle.images?.length || 1));
  };

  return (
    <div className={`${styles.card} ${isReconditioned ? styles.certified : ''}`}>
      {isReconditioned && (
        <div className={styles.certifiedBadge}>
          <span>✓</span> Brian & Jones Certified
        </div>
      )}
      
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={vehicle.images?.[currentImage] || '/vehicles/placeholder.jpg'}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className={styles.vehicleImage}
          />
          {vehicle.images?.length > 1 && (
            <>
              <button className={styles.imageNav} onClick={prevImage}>
                ‹
              </button>
              <button className={`${styles.imageNav} ${styles.next}`} onClick={nextImage}>
                ›
              </button>
            </>
          )}
        </div>
        <div className={styles.imageIndicators}>
          {vehicle.images?.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.indicator} ${idx === currentImage ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <div className={styles.price}>{formatPrice(vehicle.price)}</div>
        </div>

        <div className={styles.specs}>
          <span className={styles.spec}>
            📍 {formatMileage(vehicle.mileage)} mi
          </span>
          <span className={styles.spec}>🔖 {vehicle.condition === 'reconditioned' ? 'Certified' : 'Used'}</span>
        </div>

        <p className={styles.description}>{vehicle.description}</p>

        {isReconditioned && vehicle.warranty && (
          <div className={styles.warranty}>
            <span>🛡️</span> {vehicle.warranty}
          </div>
        )}

        <div className={styles.features}>
          {vehicle.features?.slice(0, 4).map((feature, idx) => (
            <span key={idx} className={styles.featureTag}>{feature}</span>
          ))}
          {vehicle.features?.length > 4 && (
            <span className={styles.moreFeatures}>+{vehicle.features.length - 4} more</span>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.detailsBtn} onClick={() => onViewDetails(vehicle)}>
            View Details
          </button>
          <a href="tel:+15551234567" className={styles.callBtn}>
            📞 Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
