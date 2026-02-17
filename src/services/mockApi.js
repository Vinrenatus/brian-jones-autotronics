// Mock API - works entirely in the browser without json-server
// This simulates API calls with delays and uses localStorage for persistence

const API_DELAY = 300; // ms

// Load data from localStorage
const loadFromLocalStorage = () => {
  const stored = localStorage.getItem('brianJonesData');
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

const saveToLocalStorage = (data) => {
  localStorage.setItem('brianJonesData', JSON.stringify(data));
};

// Get data - first try localStorage, then try initial data from db.json
const getData = () => {
  // First check if we have data in localStorage
  let data = loadFromLocalStorage();
  
  if (data) {
    return data;
  }
  
  // If not, try to load initial data from db.json (stored by api.js)
  const initialData = localStorage.getItem('brianJonesInitialData');
  if (initialData) {
    data = JSON.parse(initialData);
    // Save it as the working data
    saveToLocalStorage(data);
    return data;
  }
  
  // Return empty structure if nothing available
  return {
    users: [],
    services: [],
    vehicles: [],
    appointments: [],
    testimonials: [],
    timeSlots: []
  };
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
    saveToLocalStorage(data);

    const { password: _, ...userWithoutPassword } = newUser;
    const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 3600000 }));

    return { user: userWithoutPassword, token };
  },

  // Services
  getServices: async () => {
    await delay(API_DELAY);
    const data = getData();
    console.log('Services loaded:', data?.services);
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

    console.log('Vehicles loaded:', vehicles);
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
    saveToLocalStorage(data);

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
    saveToLocalStorage(data);

    return appointment;
  },

  deleteAppointment: async (id) => {
    await delay(API_DELAY);
    const data = getData();
    data.appointments = data.appointments.filter(a => a.id !== id);
    saveToLocalStorage(data);
    return { success: true };
  },

  // Testimonials
  getTestimonials: async () => {
    await delay(API_DELAY);
    const data = getData();
    console.log('Testimonials loaded:', data?.testimonials);
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
    saveToLocalStorage(data);
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
    saveToLocalStorage(data);
    return data.vehicles[index];
  },

  deleteVehicle: async (id) => {
    await delay(API_DELAY);
    const data = getData();
    data.vehicles = data.vehicles.filter(v => v.id !== id);
    saveToLocalStorage(data);
    return { success: true };
  }
};

export default mockAPI;
