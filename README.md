# SIH Online Verification System - Frontend

Welcome to the frontend application for the SIH Online Verification System! This modern, responsive, and robust React application is designed to interface seamlessly with the FastAPI backend, providing an intuitive experience for Business Users, Legal Metrology Officers (LMOs), and System Administrators.

## 🚀 Features

- **Dynamic Dashboards**: Real-time business metrics, recent applications, and workflow statuses.
- **Instrument Inventory Management**: Track and manage all measuring instruments, filtering by status, category, and calibration dates.
- **Field Inspection Module**: Dedicated views for LMOs to input precision readings (load tests, eccentricity) and upload evidence on the go.
- **Digital Certificates**: Instantly generated, scannable digital verification certificates.
- **Graceful API Fallbacks**: The frontend is engineered with resilience in mind. If the backend is unreachable (e.g., during local UI development or backend downtime), the app seamlessly falls back to high-quality mock data, ensuring a perfectly unbroken UI preview.
- **Modern Tech Stack**: Powered by **Vite**, **React 18**, **TypeScript**, and **Tailwind CSS v4** (with custom Neumorphic theming).

## 📂 Project Structure

```text
LM-Verify-Frontend/
├── src/
│   ├── api.ts                     # API client configuring Axios and graceful mock fallbacks
│   ├── App.tsx                    # Main React Router setup
│   ├── main.tsx                   # React Entry Point
│   ├── index.css                  # Tailwind CSS v4 entry and global styles
│   ├── components/
│   │   └── Layout.tsx             # Global layout, Sidebar navigation, and TopNav
│   └── pages/
│       ├── Dashboard.tsx          # Business overview and metrics
│       ├── Instruments.tsx        # Instrument tracking and lists
│       ├── ApplicationDetails.tsx # Detailed view of an application & dynamic stepper
│       ├── FieldInspection.tsx    # Inspection form for field officers
│       └── CertificateView.tsx    # Digital verification certificate view
├── public/                        # Static assets (Favicon, icons)
├── index.html                     # HTML Template
├── tailwind.config.js             # Tailwind design system configuration
├── postcss.config.js              # PostCSS plugins (Tailwind v4 adapter)
├── package.json                   # Dependencies
└── README.md                      # You are here!
```

## 🛠️ Setup & Installation

Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ashroxy/SIH-36-Frontend.git
   cd SIH-36-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## 🔗 Backend Integration

The frontend uses `axios` to communicate with the backend. 
- The default `baseURL` in `src/api.ts` is configured to `http://localhost:8006/api/v1` (matching the FastAPI backend configuration).
- **Authentication**: It automatically attaches a Bearer token from `localStorage` (`access_token`) to all requests.
- **Resilience**: If an API call fails (e.g., `ERR_CONNECTION_REFUSED`), the `try-catch` blocks in `api.ts` intercept the error, log a warning to the console, and return pre-defined mock data to keep the UI completely functional.

## 🎨 Styling

The application heavily utilizes **Tailwind CSS** with a custom color palette derived from Material You / Neumorphism guidelines. The configuration (`tailwind.config.js`) enforces specific border radii, typography (Plus Jakarta Sans & JetBrains Mono), and neumorphic shadow effects (`neu-flat`, `neu-recessed`, `neu-btn`).

## 🧪 Building for Production

To create a production-ready optimized build:
```bash
npm run build
```
This command runs `tsc` (TypeScript type checking) and `vite build`. The output will be generated in the `/dist` directory.

---
*Built with ❤️ for the SIH Verification System*
