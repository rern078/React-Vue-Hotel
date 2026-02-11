import { useState, useEffect } from 'react'
import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Rooms from './pages/Rooms'
import Bookings from './pages/Bookings'
import Reservations from './pages/Reservations'
import ReservationRooms from './pages/ReservationRooms'
import Checkins from './pages/Checkins'
import Services from './pages/Services'
import ServiceOrders from './pages/ServiceOrders'
import Invoices from './pages/Invoices'
import Payments from './pages/Payments'
import Housekeeping from './pages/Housekeeping'
import AuditLogs from './pages/AuditLogs'
import Customers from './pages/Customers'
import Login from './pages/Login'
import Register from './pages/Register'
import Roles from './pages/Roles'
import Users from './pages/Users'

// Simple inline icons (no extra deps)
const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const IconBell = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)
const IconUser = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
)
const IconDashboard = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
  </svg>
)
const IconRoom = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const IconBookings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IconChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15" />
  </svg>
)
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)
const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const AUTH_USER_KEY = 'hotel_admin_user'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [backdropReady, setBackdropReady] = useState(false)
  const [authSectionOpen, setAuthSectionOpen] = useState(false)

  // Prevent backdrop from closing sidebar on the same tap that opened it (mobile)
  useEffect(() => {
    if (!sidebarOpen) {
      setBackdropReady(false)
      return
    }
    const t = setTimeout(() => setBackdropReady(true), 350)
    return () => clearTimeout(t)
  }, [sidebarOpen])

  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  // Automatically expand the Authentication section when on /login or /register,
  // so the active link is always visible.
  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setAuthSectionOpen(true)
    }
  }, [location.pathname])

  const toggleSidebar = () => setSidebarOpen((o) => !o)

  const handleLogout = () => {
    localStorage.removeItem(AUTH_USER_KEY)
    navigate('/login', { replace: true })
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={
        <div className={`app-layout materially ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <header className="top-header">
            <div className="header-left">
              <button
                type="button"
                className="header-menu-btn"
                onClick={toggleSidebar}
                aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={sidebarOpen}
              >
                <span className="header-menu-btn-inner" aria-hidden>
                  <IconMenu />
                </span>
              </button>
              <div className="header-brand">
                <span className="header-brand-text">Hotel Dashboard</span>
              </div>
            </div>
            <div className="header-search">
              <IconSearch />
              <input type="text" placeholder="Search..." className="header-search-input" />
            </div>
            <div className="header-right">
              <button type="button" className="header-icon-btn" aria-label="Notifications">
                <IconBell />
              </button>
              <button type="button" className="header-profile-btn" aria-label="Profile">
                <IconUser />
              </button>
              <button type="button" className="header-profile-btn" onClick={handleLogout}>
                <IconLogout />
              </button>
            </div>
          </header>

          {/* Backdrop: only closes when ready (avoids same-tap close on mobile) */}
          {sidebarOpen && (
            <div
              className="sidebar-backdrop"
              onClick={() => backdropReady && setSidebarOpen(false)}
              role="presentation"
              aria-hidden
            />
          )}

          <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`} aria-hidden={!sidebarOpen}>
            {/* <div className="sidebar-brand">
              <span className="sidebar-title">Hotel Admin</span>
            </div> */}
            <nav className="sidebar-nav">
              <div className="nav-section">
                <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconDashboard />
                  <span>Dashboard</span>
                </NavLink>
              </div>
              <div className="nav-section">
                <div className="nav-section-label">MANAGEMENT</div>
                <NavLink to="/rooms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconRoom />
                  <span>Rooms</span>
                </NavLink>
                <NavLink to="/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Bookings</span>
                </NavLink>
                <NavLink to="/reservations" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Reservations</span>
                </NavLink>
                <NavLink to="/reservation-rooms" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Reservation Rooms</span>
                </NavLink>
                <NavLink to="/checkins" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Check-ins</span>
                </NavLink>
                <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Services</span>
                </NavLink>
                <NavLink to="/service-orders" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Service Orders</span>
                </NavLink>
                <NavLink to="/invoices" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Invoices</span>
                </NavLink>
                <NavLink to="/payments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Payments</span>
                </NavLink>
                <NavLink to="/housekeeping" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Housekeeping</span>
                </NavLink>
                <NavLink to="/audit-logs" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconBookings />
                  <span>Audit Logs</span>
                </NavLink>
                <NavLink to="/customers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconUser />
                  <span>Customers</span>
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconUser />
                  <span>Users</span>
                </NavLink>
                <NavLink to="/roles" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                  <IconShield />
                  <span>Roles</span>
                </NavLink>
              </div>
              <div className="nav-section">
                <button
                  type="button"
                  className="nav-section-toggle"
                  onClick={() => setAuthSectionOpen((o) => !o)}
                  aria-expanded={authSectionOpen}
                  aria-controls="auth-nav"
                >
                  <IconShield />
                  <span>Authentication</span>
                  <span className="nav-section-chevron" aria-hidden>
                    {authSectionOpen ? <IconChevronUp /> : <IconChevronDown />}
                  </span>
                </button>
                <div id="auth-nav" className="nav-subsection" hidden={!authSectionOpen}>
                  <NavLink to="/login" className={({ isActive }) => `nav-item nav-subitem ${isActive ? 'active' : ''}`}>
                    <IconArrowRight />
                    <span>Login</span>
                  </NavLink>
                  <NavLink to="/register" className={({ isActive }) => `nav-item nav-subitem ${isActive ? 'active' : ''}`}>
                    <IconArrowRight />
                    <span>Register</span>
                  </NavLink>
                </div>
              </div>
            </nav>
          </aside>

          <main className="main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/reservation-rooms" element={<ReservationRooms />} />
              <Route path="/checkins" element={<Checkins />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service-orders" element={<ServiceOrders />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/housekeeping" element={<Housekeeping />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/users" element={<Users />} />
              <Route path="/roles" element={<Roles />} />
            </Routes>
            <footer className="main-footer">
              Distributed by <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
            </footer>
          </main>
        </div>
      } />
    </Routes>
  )
}
