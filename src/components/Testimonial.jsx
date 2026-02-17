import { useState, useEffect } from 'react';
import { testimonialsAPI } from '../services/api.js';
import styles from './Testimonial.module.css';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Alternate images for testimonials
  const testimonialImages = [
    "https://images.pexels.com/photos/7937318/pexels-photo-7937318.jpeg",
    "https://images.pexels.com/photos/8152740/pexels-photo-8152740.jpeg",
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialsAPI.getAll();
        setTestimonials(response.data || []);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  if (loading || testimonials.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading testimonials...</p>
      </div>
    );
  }

  return (
    <div className={styles.testimonial}>
      <div className={styles.carousel}>
        <button className={styles.navBtn} onClick={goToPrev} aria-label="Previous testimonial">
          ‹
        </button>
        
        <div className={styles.slides}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <div className={styles.authorImage}>
                    <img
                      src={testimonialImages[index % testimonialImages.length]}
                      alt={testimonial.customerName}
                    />
                  </div>
                  <div className={styles.authorDetails}>
                    <span className={styles.authorName}>{testimonial.customerName}</span>
                    <span className={styles.authorVehicle}>{testimonial.vehicle}</span>
                  </div>
                </div>
                <div className={styles.rating}>
                  <span className={styles.stars}>{renderStars(testimonial.rating)}</span>
                  <span className={styles.serviceType}>{testimonial.serviceType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={`${styles.navBtn} ${styles.next}`} onClick={goToNext} aria-label="Next testimonial">
          ›
        </button>
      </div>
      
      <div className={styles.indicators}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
