import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { servicesAPI, appointmentsAPI, timeSlotsAPI } from '../services/api.js';
import styles from './BookingWizard.module.css';

const BookingWizard = ({ onComplete }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    serviceId: '',
    serviceName: '',
    date: '',
    time: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleVin: '',
    customerNotes: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, timeSlotsRes] = await Promise.all([
          servicesAPI.getAll(),
          timeSlotsAPI.getAll(),
        ]);
        setServices(servicesRes.data || []);
        setTimeSlots(timeSlotsRes.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
    }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.serviceId) {
      setError('Please select a service');
      return;
    }
    if (step === 2 && (!formData.date || !formData.time)) {
      setError('Please select a date and time');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/booking' } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const appointmentData = {
        userId: user.id,
        serviceId: formData.serviceId,
        serviceName: formData.serviceName,
        date: formData.date,
        time: formData.time,
        status: 'scheduled',
        vehicleInfo: {
          year: parseInt(formData.vehicleYear) || new Date().getFullYear(),
          make: formData.vehicleMake || 'Unknown',
          model: formData.vehicleModel || 'Unknown',
          vin: formData.vehicleVin || '',
        },
        customerNotes: formData.customerNotes,
        createdAt: new Date().toISOString(),
      };

      await appointmentsAPI.create(appointmentData);
      
      if (onComplete) {
        onComplete(appointmentData);
      } else {
        navigate('/dashboard', { 
          state: { 
            message: 'Appointment booked successfully! We will confirm your appointment shortly.' 
          } 
        });
      }
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const renderStepIndicator = () => (
    <div className={styles.stepIndicator}>
      <div className={`${styles.step} ${step >= 1 ? styles.active : ''} ${step > 1 ? styles.completed : ''}`}>
        <span className={styles.stepNumber}>{step > 1 ? '✓' : '1'}</span>
        <span className={styles.stepLabel}>Service</span>
      </div>
      <div className={styles.stepLine}></div>
      <div className={`${styles.step} ${step >= 2 ? styles.active : ''} ${step > 2 ? styles.completed : ''}`}>
        <span className={styles.stepNumber}>{step > 2 ? '✓' : '2'}</span>
        <span className={styles.stepLabel}>Date & Time</span>
      </div>
      <div className={styles.stepLine}></div>
      <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>
        <span className={styles.stepNumber}>3</span>
        <span className={styles.stepLabel}>Details</span>
      </div>
    </div>
  );

  const renderServiceStep = () => (
    <div className={styles.stepContent}>
      <h3>Select a Service</h3>
      <p className={styles.stepDescription}>Choose the service you need for your vehicle</p>
      
      <div className={styles.serviceGrid}>
        {services.map((service) => (
          <button
            key={service.id}
            className={`${styles.serviceOption} ${formData.serviceId === service.id.toString() ? styles.selected : ''}`}
            onClick={() => handleServiceSelect(service)}
          >
            <span className={styles.serviceIcon}>
              {service.icon === 'engine' && '🔧'}
              {service.icon === 'transmission' && '⚙️'}
              {service.icon === 'brakes' && '🛑'}
              {service.icon === 'suspension' && '🔩'}
              {service.icon === 'oil' && '🛢️'}
              {service.icon === 'wiring' && '⚡'}
              {service.icon === 'ecu' && '💻'}
              {service.icon === 'battery' && '🔋'}
              {service.icon === 'obd' && '📱'}
              {service.icon === 'analysis' && '📊'}
              {service.icon === 'emissions' && '🌿'}
              {service.icon === 'engine-rebuild' && '🔨'}
              {service.icon === 'transmission-rebuild' && '⚒️'}
            </span>
            <span className={styles.serviceName}>{service.name}</span>
            <span className={styles.servicePrice}>{service.priceEstimate}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDateTimeStep = () => (
    <div className={styles.stepContent}>
      <h3>Choose Date & Time</h3>
      <p className={styles.stepDescription}>Select your preferred appointment slot</p>
      
      <div className={styles.dateTimeGrid}>
        <div className={styles.dateSection}>
          <label htmlFor="date">Select Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            min={getMinDate()}
            className={styles.dateInput}
          />
        </div>
        
        <div className={styles.timeSection}>
          <label>Available Times</label>
          <div className={styles.timeSlots}>
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                className={`${styles.timeSlot} ${formData.time === slot ? styles.selected : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, time: slot }))}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className={styles.stepContent}>
      <h3>Your Information</h3>
      <p className={styles.stepDescription}>Tell us about your vehicle</p>
      
      <form onSubmit={handleSubmit} className={styles.detailsForm}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="vehicleYear">Vehicle Year</label>
            <input
              type="number"
              id="vehicleYear"
              name="vehicleYear"
              value={formData.vehicleYear}
              onChange={handleInputChange}
              placeholder="2020"
              min="1900"
              max={new Date().getFullYear() + 1}
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="vehicleMake">Make</label>
            <input
              type="text"
              id="vehicleMake"
              name="vehicleMake"
              value={formData.vehicleMake}
              onChange={handleInputChange}
              placeholder="Toyota"
              className={styles.input}
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="vehicleModel">Model</label>
            <input
              type="text"
              id="vehicleModel"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleInputChange}
              placeholder="Camry"
              className={styles.input}
            />
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="vehicleVin">VIN (Optional)</label>
            <input
              type="text"
              id="vehicleVin"
              name="vehicleVin"
              value={formData.vehicleVin}
              onChange={handleInputChange}
              placeholder="1HGBH41JXMN109186"
              maxLength="17"
              className={styles.input}
            />
          </div>
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="customerNotes">Additional Notes</label>
          <textarea
            id="customerNotes"
            name="customerNotes"
            value={formData.customerNotes}
            onChange={handleInputChange}
            placeholder="Describe any issues or concerns with your vehicle..."
            rows="4"
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.summary}>
          <h4>Appointment Summary</h4>
          <div className={styles.summaryItem}>
            <span>Service:</span>
            <strong>{formData.serviceName}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Date:</span>
            <strong>{formData.date || 'Not selected'}</strong>
          </div>
          <div className={styles.summaryItem}>
            <span>Time:</span>
            <strong>{formData.time || 'Not selected'}</strong>
          </div>
        </div>
        
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Appointment'}
        </button>
      </form>
    </div>
  );

  return (
    <div className={styles.wizard}>
      {renderStepIndicator()}
      
      {error && <div className={styles.error}>{error}</div>}
      
      {step === 1 && renderServiceStep()}
      {step === 2 && renderDateTimeStep()}
      {step === 3 && renderDetailsStep()}
      
      {step < 3 && (
        <div className={styles.navigation}>
          {step > 1 && (
            <button type="button" onClick={prevStep} className={styles.backBtn}>
              ← Back
            </button>
          )}
          <button type="button" onClick={nextStep} className={styles.nextBtn}>
            {step === 2 ? 'Review Details' : 'Continue'} →
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingWizard;
