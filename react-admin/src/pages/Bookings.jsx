import { useState, useEffect } from 'react'
import { getBookings, updateBookingStatus, deleteBooking } from '../api'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)

  function load() {
    setLoading(true)
    const params = filter ? { status: filter } : {}
    getBookings(params)
      .then(setBookings)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const setStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Cancel and delete this booking?')) return
    try {
      await deleteBooking(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Bookings</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {error && <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.guestName}</td>
                <td>{b.guestEmail}</td>
                <td>{b.room?.name}</td>
                <td>{b.checkIn}</td>
                <td>{b.checkOut}</td>
                <td>{b.guests}</td>
                <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                <td>
                  {b.status === 'pending' && (
                    <button type="button" className="btn-success" style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => setStatus(b.id, 'confirmed')}>Confirm</button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button type="button" className="btn-danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => b.status === 'pending' ? remove(b.id) : setStatus(b.id, 'cancelled')}>{b.status === 'pending' ? 'Cancel' : 'Mark cancelled'}</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No bookings match the filter.</p>}
      </div>
    </>
  )
}
