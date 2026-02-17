// Mock API - works entirely in the browser without json-server
// This simulates API calls with delays and uses localStorage for persistence

const API_DELAY = 300; // ms

// Load data from db.json initially, then use localStorage
const loadInitialData = () => {
  const stored = localStorage.getItem('brianJonesData');
  if (stored) {
    return JSON.parse(stored);
  }
  // Initial data will be loaded from db.json on first access
  return null;
};

const saveData = (data) => {
  localStorage.setItem('brianJonesData', JSON.stringify(data));
};

const getData = () => {
  let data = loadInitialData();
  if (!data) {
    // Fetch initial data from db.json
    data = JSON.parse(localStorage.getItem('brianJonesInitialData') || 'null');
    if (!data) {
      // This will be set by the app on first load
      return null;
    }
  }
  return data;
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Simulated API endpoints
export const mockAPI = {
  // Auth endpoints
  login: async (email, password) => {
    await delay(API_DELAY);
    const data = getData();
    const user = data?.users?.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const { password: _, ...userWithoutPassword } = user;
    const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 3600000 }));
    
    return { user: userWithoutPassword, token };
  },

  register: async (userData) => {
    await delay(API_DELAY);
    const data = getData();
    
    const existingUser = data?.users?.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    
    const newUser = {
      id: String(Date.now()),
      ...userData,
      role: 'customer'
    };
    
    data.users.push(newUser);
    saveData(data);
    
    const { password: _, ...userWithoutPassword } = newUser;
    const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 3600000 }));
    
    return { user: userWithoutPassword, token };
  },

  // Services
  getServices: async () => {
    await delay(API_DELAY);
    const data = getData();
    return data?.services || [];
  },

  // Vehicles
  getVehicles: async (params = {}) => {
    await delay(API_DELAY);
    const data = getData();
    let vehicles = data?.vehicles || [];
    
    if (params.condition && params.condition !== 'all') {
      vehicles = vehicles.filter(v => v.condition === params.condition);
    }
    
    return vehicles;
  },

  // Appointments
  getAppointments: async (params = {}) => {
    await delay(API_DELAY);
    const data = getData();
    let appointments = data?.appointments || [];
    
    if (params.userId) {
      appointments = appointments.filter(a => a.userId === params.userId);
    }
    
    return appointments;
  },

  createAppointment: async (appointment) => {
    await delay(API_DELAY);
    const data = getData();
    
    const newAppointment = {
      id: String(Date.now()),
      ...appointment
    };
    
    data.appointments.push(newAppointment);
    saveData(data);
    
    return newAppointment;
  },

  updateAppointmentStatus: async (id, status) => {
    await delay(API_DELAY);
    const data = getData();
    
    const appointment = data.appointments.find(a => a.id === id);
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    
    appointment.status = status;
    saveData(data);
    
    return appointment;
  },

  deleteAppointment: async (id) => {
    await delay(API_DELAY);
    const data = getData();
    data.appointments = data.appointments.filter(a => a.id !== id);
    saveData(data);
    return { success: true };
  },

  // Testimonials
  getTestimonials: async () => {
    await delay(API_DELAY);
    const data = getData();
    return data?.testimonials || [];
  },

  // Time slots
  getTimeSlots: async () => {
    await delay(API_DELAY);
    const data = getData();
    return data?.timeSlots || [];
  },

  // Users
  getUsers: async () => {
    await delay(API_DELAY);
    const data = getData();
    return data?.users?.map(({ password, ...u }) => u) || [];
  },

  // Vehicle management
  createVehicle: async (vehicle) => {
    await delay(API_DELAY);
    const data = getData();
    const newVehicle = {
      id: String(Date.now()),
      ...vehicle
    };
    data.vehicles.push(newVehicle);
    saveData(data);
    return newVehicle;
  },

  updateVehicle: async (id, vehicle) => {
    await delay(API_DELAY);
    const data = getData();
    const index = data.vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error('Vehicle not found');
    }
    data.vehicles[index] = { ...data.vehicles[index], ...vehicle };
    saveData(data);
    return data.vehicles[index];
  },

  deleteVehicle: async (id) => {
    await delay(API_DELAY);
    const data = getData();
    data.vehicles = data.vehicles.filter(v => v.id !== id);
    saveData(data);
    return { success: true };
  }
};

export default mockAPI;
