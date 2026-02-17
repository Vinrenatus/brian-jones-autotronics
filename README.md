# Brian & Jones Automotive

**Where Craftsmanship Meets the Road**

A full-stack automotive website for Brian & Jones Automotive, featuring service booking, vehicle inventory management, and customer dashboard.

![Brian & Jones Automotive](./public/favicon.svg)

## Features

### Customer Features
- **Service Booking**: 3-step booking wizard for scheduling automotive services
- **Vehicle Inventory**: Browse used and certified reconditioned vehicles
- **Customer Dashboard**: View appointment history and service records
- **User Authentication**: Secure login and registration

### Admin Features
- **Appointment Management**: Update appointment status (scheduled → in-progress → completed)
- **Inventory Management**: Add, edit, and delete vehicles
- **User Management**: View registered customers and staff

### Services Offered
- **Mechanical**: Engine repair, transmission, brakes, suspension, oil changes
- **Electrical**: Wiring diagnostics, ECU programming, battery/alternator systems
- **Diagnostics**: OBD-II scanning, drivability analysis, emissions testing
- **Overhauls**: Complete engine and transmission rebuilds with 12-month warranty

## Tech Stack

### Frontend
- **React 18** with JSX (zero TypeScript)
- **React Router v6** for routing
- **CSS Modules** for styling
- **Axios** for API calls
- **Vite** for build tooling
- **JSON Server** for mock backend

### Color Palette
- `--primary`: #0d2a47 (Navy Blue - Trust)
- `--secondary`: #c41e3a (Automotive Red - Energy)
- `--accent`: #f5a623 (Gold - Quality/Certification)
- `--light`: #f8f9fa (Clean Workspace Feel)

## Project Structure

```
brian-jones-automotive/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── ServiceCard.jsx
│   │   ├── ServiceCard.module.css
│   │   ├── VehicleCard.jsx
│   │   ├── VehicleCard.module.css
│   │   ├── BookingWizard.jsx
│   │   ├── BookingWizard.module.css
│   │   └── Testimonial.jsx
│   │   └── Testimonial.module.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.module.css
│   │   ├── Services.jsx
│   │   ├── Services.module.css
│   │   ├── Inventory.jsx
│   │   ├── Inventory.module.css
│   │   ├── Booking.jsx
│   │   ├── Booking.module.css
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.module.css
│   │   ├── AdminPanel.jsx
│   │   ├── AdminPanel.module.css
│   │   ├── Login.jsx
│   │   └── Login.module.css
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx
│   └── index.jsx
├── db.json
├── package.json
├── vite.config.js
├── index.html
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   This starts the React app on http://localhost:3000

4. **Open your browser** and navigate to http://localhost:3000

**Note:** The app uses a browser-based mock API that loads data from `db.json`. No separate backend server is required!

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

```bash
npm run start
```

Preview the production build locally.

## Demo Accounts

| Role     | Email                    | Password    |
|----------|--------------------------|-------------|
| Admin    | admin@brianjones.com     | admin123    |
| Customer | customer@example.com     | customer123 |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Preview production build
- `npm run server` - Start JSON Server mock backend

## API Endpoints (Mock)

The application uses JSON Server which automatically provides REST endpoints:

- `GET /api/users` - Get all users
- `GET /api/services` - Get all services
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles?condition=reconditioned` - Filter by condition
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments?userId=1` - Get user's appointments
- `POST /api/appointments` - Create appointment
- `GET /api/testimonials` - Get testimonials
- `GET /api/timeSlots` - Get available time slots

## Key Features Implementation

### Authentication
- JWT-style authentication simulated with localStorage
- Protected routes for booking and dashboard
- Admin-only routes for admin panel

### Booking Flow
1. Select service category and specific service
2. Choose date and time from available slots
3. Enter vehicle and contact information
4. Confirmation with tracking ID

### Vehicle Inventory
- Toggle between "All", "Used", and "Reconditioned" vehicles
- Price range filter
- Sort by price, mileage, or year
- Quick view modal with detailed information

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile navigation
- Click-to-call phone button on mobile
- Swipeable appointment cards

## Brand Elements

- **ASE Certified Technicians** badge in header
- **12-Month Warranty** banner for overhauls
- **Brian & Jones Certified** badge for reconditioned vehicles
- Customer testimonial carousel
- Trust-focused color scheme (navy blue, red accent, gold certification)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for demonstration purposes.

---

**Brian & Jones Automotive** - Where Craftsmanship Meets the Road

📍 123 Main Street, Auto City, AC 12345  
📞 (555) 123-4567  
✉️ service@brianjones.com
