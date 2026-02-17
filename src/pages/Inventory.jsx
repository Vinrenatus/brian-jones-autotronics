import { useState, useEffect } from 'react';
import { vehiclesAPI } from '../services/api';
import VehicleCard from '../components/VehicleCard.jsx';
import styles from './Inventory.module.css';

const Inventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [conditionFilter, setConditionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await vehiclesAPI.getAll();
        setVehicles(response.data || []);
        setFilteredVehicles(response.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    let result = [...vehicles];

    // Filter by condition
    if (conditionFilter !== 'all') {
      result = result.filter((v) => v.condition === conditionFilter);
    }

    // Filter by price range
    result = result.filter(
      (v) => v.price >= priceRange[0] && v.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        result.sort((a, b) => b.year - a.year);
    }

    setFilteredVehicles(result);
  }, [vehicles, conditionFilter, sortBy, priceRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.inventory}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1>Products Catalog</h1>
          <p>Quality automation components and systems</p>
        </div>
      </section>

      {/* Main Content */}
      <section className={styles.section}>
        <div className={styles.container}>
          {/* Condition Toggle */}
          <div className={styles.filterBar}>
            <div className={styles.conditionToggle}>
              <button
                className={`${styles.toggleBtn} ${conditionFilter === 'all' ? styles.active : ''}`}
                onClick={() => setConditionFilter('all')}
              >
                All Products
              </button>
              <button
                className={`${styles.toggleBtn} ${conditionFilter === 'used' ? styles.active : ''}`}
                onClick={() => setConditionFilter('used')}
              >
                Refurbished
              </button>
              <button
                className={`${styles.toggleBtn} ${conditionFilter === 'reconditioned' ? styles.active : ''}`}
                onClick={() => setConditionFilter('reconditioned')}
              >
                <span className={styles.certBadge}>✓</span>
                New In Stock
              </button>
            </div>

            <div className={styles.sortControls}>
              <label htmlFor="sort">Sort by:</label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={styles.select}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className={styles.priceRange}>
            <label>Max Price: {formatPrice(priceRange[1])}</label>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className={styles.rangeSlider}
            />
          </div>

          {/* Results Count */}
          <div className={styles.resultsCount}>
            Showing {filteredVehicles.length} of {vehicles.length} products
          </div>

          {/* Products Grid */}
          <div className={styles.vehiclesGrid}>
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className={styles.emptyState}>
              <p>No products match your criteria.</p>
              <button
                onClick={() => {
                  setConditionFilter('all');
                  setPriceRange([0, 200000]);
                }}
                className={styles.resetBtn}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Quality Banner */}
      {conditionFilter !== 'used' && (
        <section className={styles.certifiedBanner}>
          <div className={styles.container}>
            <div className={styles.certifiedContent}>
              <div className={styles.certifiedIcon}>🏅</div>
              <div className={styles.certifiedText}>
                <h3>Genuine Products Guaranteed</h3>
                <p>
                  All our automation components are sourced from certified manufacturers
                  and come with warranty and technical support.
                </p>
              </div>
              <div className={styles.inspectionList}>
                <h4>Our Promise:</h4>
                <ul>
                  <li>✓ Genuine Manufacturers</li>
                  <li>✓ Quality Assurance</li>
                  <li>✓ Technical Support</li>
                  <li>✓ Warranty Included</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Detail Modal */}
      {showModal && selectedVehicle && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeModal}>×</button>

            <div className={styles.modalContent}>
              <div className={styles.modalImages}>
                <img
                  src={selectedVehicle.images?.[0] || '/products/placeholder.jpg'}
                  alt={`${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}`}
                  className={styles.mainImage}
                />
              </div>

              <div className={styles.modalInfo}>
                <div className={styles.modalHeader}>
                  <h2>
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h2>
                  <div className={styles.modalPrice}>{formatPrice(selectedVehicle.price)}</div>
                </div>

                {selectedVehicle.certified && (
                  <div className={styles.certifiedLabel}>
                    <span>✓</span> Genuine Product
                  </div>
                )}

                <div className={styles.modalSpecs}>
                  <span>🔖 {selectedVehicle.condition === 'new' ? 'Brand New' : 'Refurbished'}</span>
                  {selectedVehicle.inStock !== undefined && (
                    <span>{selectedVehicle.inStock ? '✅ In Stock' : '❌ Out of Stock'}</span>
                  )}
                  {selectedVehicle.vin && <span>🆔 Model: {selectedVehicle.vin}</span>}
                </div>

                <p className={styles.modalDescription}>{selectedVehicle.description}</p>

                {selectedVehicle.warranty && (
                  <div className={styles.modalWarranty}>
                    <span>🛡️</span> {selectedVehicle.warranty}
                  </div>
                )}

                <div className={styles.modalFeatures}>
                  <h4>Features</h4>
                  <div className={styles.featureTags}>
                    {selectedVehicle.features?.map((feature, idx) => (
                      <span key={idx} className={styles.featureTag}>{feature}</span>
                    ))}
                  </div>
                </div>

                {selectedVehicle.serviceHistory && (
                  <div className={styles.modalHistory}>
                    <h4>Specifications</h4>
                    <ul>
                      {selectedVehicle.serviceHistory.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className={styles.modalActions}>
                  <a href="tel:+254703501133" className={styles.callBtn}>
                    📞 Call to Order
                  </a>
                  <a href="/booking" className={styles.testDriveBtn}>
                    Request Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
