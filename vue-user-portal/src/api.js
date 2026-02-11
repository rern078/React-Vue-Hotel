const API = '/api'

export async function getRooms(params = {}) {
  const q = new URLSearchParams({ ...params, available: 'true' }).toString()
  const r = await fetch(`${API}/rooms?${q}`)
  if (!r.ok) throw new Error('Failed to fetch rooms')
  return r.json()
}

export async function getRoom(id) {
  const r = await fetch(`${API}/rooms/${id}`)
  if (!r.ok) throw new Error('Failed to fetch room')
  return r.json()
}

export async function createBooking(data) {
  const r = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!r.ok) throw new Error('Failed to create booking')
  return r.json()
}

export async function getBookingsByEmail(email) {
  const r = await fetch(`${API}/bookings?guestEmail=${encodeURIComponent(email)}`)
  if (!r.ok) throw new Error('Failed to fetch bookings')
  return r.json()
}
