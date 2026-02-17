import mockAPI from './mockApi';

// Load initial data from db.json on module load
let initialDataLoaded = false;

const loadInitialData = async () => {
  if (initialDataLoaded) return;
  
  try {
    const response = await fetch('/db.json');
    const data = await response.json();
    localStorage.setItem('brianJonesInitialData', JSON.stringify(data));
    initialDataLoaded = true;
  } catch (err) {
    console.error('Failed to load initial data:', err);
  }
};

// Load initial data immediately
loadInitialData();

const api = {
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} }
  }
};

// Auth endpoints
export const authAPI = {
  login: async (email, password) => {
    try {
      const result = await mockAPI.login(email, password);
      return { data: result };
    } catch (err) {
      throw { response: { data: { message: err.message } } };
    }
  },
  register: async (userData) => {
    try {
      const result = await mockAPI.register(userData);
      return { data: result };
    } catch (err) {
      throw { response: { data: { message: err.message } } };
    }
  },
  logout: async () => ({ data: { success: true } }),
  getCurrentUser: async () => ({ data: null }),
};

// Services endpoints
export const servicesAPI = {
  getAll: async () => {
    const result = await mockAPI.getServices();
    return { data: result };
  },
  getByCategory: async (category) => {
    const result = await mockAPI.getServices();
    const filtered = category ? result.filter(s => s.category === category) : result;
    return { data: filtered };
  },
};

// Vehicles endpoints
export const vehiclesAPI = {
  getAll: async () => {
    const result = await mockAPI.getVehicles();
    return { data: result };
  },
  getById: async (id) => {
    const result = await mockAPI.getVehicles();
    const vehicle = result.find(v => v.id === id);
    return { data: vehicle || null };
  },
  getByCondition: async (condition) => {
    const result = await mockAPI.getVehicles({ condition });
    return { data: result };
  },
  create: async (vehicle) => {
    const result = await mockAPI.createVehicle(vehicle);
    return { data: result };
  },
  update: async (id, vehicle) => {
    const result = await mockAPI.updateVehicle(id, vehicle);
    return { data: result };
  },
  delete: async (id) => {
    await mockAPI.deleteVehicle(id);
    return { data: { success: true } };
  },
};

// Appointments endpoints
export const appointmentsAPI = {
  getAll: async () => {
    const result = await mockAPI.getAppointments();
    return { data: result };
  },
  getByUser: async (userId) => {
    const result = await mockAPI.getAppointments({ userId });
    return { data: result };
  },
  create: async (appointment) => {
    const result = await mockAPI.createAppointment(appointment);
    return { data: result };
  },
  update: async (id, appointment) => {
    const result = await mockAPI.updateAppointmentStatus(id, appointment.status);
    return { data: result };
  },
  updateStatus: async (id, status) => {
    const result = await mockAPI.updateAppointmentStatus(id, status);
    return { data: result };
  },
  delete: async (id) => {
    await mockAPI.deleteAppointment(id);
    return { data: { success: true } };
  },
};

// Users endpoints
export const usersAPI = {
  getAll: async () => {
    const result = await mockAPI.getUsers();
    return { data: result };
  },
  getById: async (id) => {
    const result = await mockAPI.getUsers();
    const user = result.find(u => u.id === id);
    return { data: user || null };
  },
  update: async (id, user) => ({ data: { ...user, id } }),
};

// Testimonials endpoints
export const testimonialsAPI = {
  getAll: async () => {
    const result = await mockAPI.getTestimonials();
    return { data: result };
  },
};

// Time slots endpoint
export const timeSlotsAPI = {
  getAll: async () => {
    const result = await mockAPI.getTimeSlots();
    return { data: result };
  },
};

export default api;
