const API = '/api'

export async function login(email, password) {
  const r = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Login failed')
  return data
}

export async function register({ name, email, password }) {
  const r = await fetch(`${API}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Registration failed')
  return data
}

// Customer auth (hotel guests)
export async function customerLogin(email, password) {
  const r = await fetch(`${API}/customers/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Login failed')
  return data
}

export async function customerRegister(payload) {
  const r = await fetch(`${API}/customers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Registration failed')
  return data
}

// Customers (admin view)
export async function getCustomers() {
  const r = await fetch(`${API}/customers`)
  if (!r.ok) throw new Error('Failed to fetch customers')
  return r.json()
}

export async function updateCustomerApi(id, payload) {
  const r = await fetch(`${API}/customers/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to update customer')
  return data
}

export async function deleteCustomerApi(id) {
  const r = await fetch(`${API}/customers/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete customer')
  }
}

export async function getStats() {
  const r = await fetch(`${API}/stats`)
  if (!r.ok) throw new Error('Failed to fetch stats')
  return r.json()
}

export async function getRooms(params = {}) {
  const q = new URLSearchParams(params).toString()
  const r = await fetch(`${API}/rooms${q ? '?' + q : ''}`)
  if (!r.ok) throw new Error('Failed to fetch rooms')
  return r.json()
}

export async function getRoom(id) {
  const r = await fetch(`${API}/rooms/${id}`)
  if (!r.ok) throw new Error('Failed to fetch room')
  return r.json()
}

export async function createRoom(data) {
  const r = await fetch(`${API}/rooms`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!r.ok) throw new Error('Failed to create room')
  return r.json()
}

export async function updateRoom(id, data) {
  const r = await fetch(`${API}/rooms/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
  if (!r.ok) throw new Error('Failed to update room')
  return r.json()
}

export async function deleteRoom(id) {
  const r = await fetch(`${API}/rooms/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Failed to delete room')
}

// Room types
export async function getRoomTypes() {
  const r = await fetch(`${API}/room-types`)
  if (!r.ok) throw new Error('Failed to fetch room types')
  return r.json()
}

export async function createRoomType(data) {
  const r = await fetch(`${API}/room-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const resData = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(resData.error || 'Failed to create room type')
  return resData
}

export async function updateRoomType(id, data) {
  const r = await fetch(`${API}/room-types/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const resData = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(resData.error || 'Failed to update room type')
  return resData
}

export async function deleteRoomType(id) {
  const r = await fetch(`${API}/room-types/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const resData = await r.json().catch(() => ({}))
    throw new Error(resData.error || 'Failed to delete room type')
  }
}

export async function getBookings(params = {}) {
  const q = new URLSearchParams(params).toString()
  const r = await fetch(`${API}/bookings${q ? '?' + q : ''}`)
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to fetch bookings')
  return data
}

export async function updateBookingStatus(id, status) {
  const r = await fetch(`${API}/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
  if (!r.ok) throw new Error('Failed to update booking')
  return r.json()
}

export async function deleteBooking(id) {
  const r = await fetch(`${API}/bookings/${id}`, { method: 'DELETE' })
  if (!r.ok) throw new Error('Failed to delete booking')
}

// Reservations
export async function getReservations(params = {}) {
  const q = new URLSearchParams(params).toString()
  const r = await fetch(`${API}/reservations${q ? '?' + q : ''}`)
  if (!r.ok) throw new Error('Failed to fetch reservations')
  return r.json()
}

export async function updateReservationStatus(id, status) {
  const r = await fetch(`${API}/reservations/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to update reservation')
  }
  return r.json()
}

export async function deleteReservation(id) {
  const r = await fetch(`${API}/reservations/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete reservation')
  }
}

// Reservation rooms (linking reservations to rooms)
export async function getReservationRooms() {
  const r = await fetch(`${API}/reservation-rooms`)
  if (!r.ok) throw new Error('Failed to fetch reservation rooms')
  return r.json()
}

export async function createReservationRoom(payload) {
  const r = await fetch(`${API}/reservation-rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create reservation room')
  return data
}

export async function deleteReservationRoom(id) {
  const r = await fetch(`${API}/reservation-rooms/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete reservation room')
  }
}

// Check-ins
export async function getCheckins(params = {}) {
  const q = new URLSearchParams(params).toString()
  const r = await fetch(`${API}/checkins${q ? '?' + q : ''}`)
  if (!r.ok) throw new Error('Failed to fetch check-ins')
  return r.json()
}

export async function createCheckin(payload) {
  const r = await fetch(`${API}/checkins`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create check-in')
  return data
}

export async function updateCheckin(id, payload) {
  const r = await fetch(`${API}/checkins/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to update check-in')
  return data
}

export async function deleteCheckin(id) {
  const r = await fetch(`${API}/checkins/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete check-in')
  }
}

// Roles
export async function getRoles() {
  const r = await fetch(`${API}/roles`)
  if (!r.ok) throw new Error('Failed to fetch roles')
  return r.json()
}

export async function createRole(name) {
  const r = await fetch(`${API}/roles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create role')
  return data
}

export async function updateRole(id, name) {
  const r = await fetch(`${API}/roles/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to update role')
  return data
}

export async function deleteRoleApi(id) {
  const r = await fetch(`${API}/roles/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete role')
  }
}

// Users (admin accounts)
export async function getUsers() {
  const r = await fetch(`${API}/users`)
  if (!r.ok) throw new Error('Failed to fetch users')
  return r.json()
}

export async function createUserApi(payload) {
  const r = await fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create user')
  return data
}

export async function updateUserApi(id, payload) {
  const r = await fetch(`${API}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to update user')
  return data
}

export async function deleteUserApi(id) {
  const r = await fetch(`${API}/users/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete user')
  }
}

// Services
export async function getServices() {
  const r = await fetch(`${API}/services`)
  if (!r.ok) throw new Error('Failed to fetch services')
  return r.json()
}

export async function createServiceApi(payload) {
  const r = await fetch(`${API}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create service')
  return data
}

export async function updateServiceApi(id, payload) {
  const r = await fetch(`${API}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to update service')
  return data
}

export async function deleteServiceApi(id) {
  const r = await fetch(`${API}/services/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete service')
  }
}

// Service orders (services used during a check-in)
export async function getServiceOrders() {
  const r = await fetch(`${API}/service-orders`)
  if (!r.ok) throw new Error('Failed to fetch service orders')
  return r.json()
}

export async function createServiceOrder(payload) {
  const r = await fetch(`${API}/service-orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create service order')
  return data
}

export async function deleteServiceOrder(id) {
  const r = await fetch(`${API}/service-orders/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete service order')
  }
}

// Invoices
export async function getInvoices() {
  const r = await fetch(`${API}/invoices`)
  if (!r.ok) throw new Error('Failed to fetch invoices')
  return r.json()
}

export async function createInvoice(payload) {
  const r = await fetch(`${API}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create invoice')
  return data
}

export async function deleteInvoice(id) {
  const r = await fetch(`${API}/invoices/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete invoice')
  }
}

// Payments
export async function getPayments() {
  const r = await fetch(`${API}/payments`)
  if (!r.ok) throw new Error('Failed to fetch payments')
  return r.json()
}

export async function createPayment(payload) {
  const r = await fetch(`${API}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create payment')
  return data
}

export async function deletePayment(id) {
  const r = await fetch(`${API}/payments/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete payment')
  }
}

// Housekeeping
export async function getHousekeeping() {
  const r = await fetch(`${API}/housekeeping`)
  if (!r.ok) throw new Error('Failed to fetch housekeeping')
  return r.json()
}

export async function createHousekeeping(payload) {
  const r = await fetch(`${API}/housekeeping`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create housekeeping record')
  return data
}

export async function deleteHousekeeping(id) {
  const r = await fetch(`${API}/housekeeping/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete housekeeping record')
  }
}

// Audit logs
export async function getAuditLogs() {
  const r = await fetch(`${API}/audit-logs`)
  if (!r.ok) throw new Error('Failed to fetch audit logs')
  return r.json()
}

export async function createAuditLogApi(payload) {
  const r = await fetch(`${API}/audit-logs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(data.error || 'Failed to create audit log')
  return data
}

export async function deleteAuditLogApi(id) {
  const r = await fetch(`${API}/audit-logs/${id}`, { method: 'DELETE' })
  if (!r.ok) {
    const data = await r.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to delete audit log')
  }
}
