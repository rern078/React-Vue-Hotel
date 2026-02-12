import { useState, useEffect } from 'react'
import { getBookings, getHotels, getGuests, updateBooking, updateBookingStatus, deleteBooking } from '../api'

const defaultForm = {
  hotelId: '',
  guestId: '',
  guestName: '',
  guestEmail: '',
  bookingDate: '',
  bookingTime: '',
  arrivalDate: '',
  departureDate: '',
  estArrivalTime: '',
  estDepartureTime: '',
  numAdults: '',
  numChildren: '',
  specialReq: '',
  status: 'pending',
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [hotels, setHotels] = useState([])
  const [guests, setGuests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [filterHotelId, setFilterHotelId] = useState('')
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(defaultForm)

  function load() {
    setLoading(true)
    const params = {}
    if (filter) params.status = filter
    if (filterHotelId) params.hotelId = filterHotelId
    getBookings(params)
      .then(setBookings)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getHotels().then(setHotels).catch(() => {})
  }, [])

  useEffect(() => {
    load()
  }, [filter, filterHotelId])

  useEffect(() => {
    if (editing) {
      getGuests().then(setGuests).catch(() => {})
    }
  }, [editing])

  const setStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status)
      load()
      if (editing?.id === id) setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Cancel and delete this booking?')) return
    try {
      await deleteBooking(id)
      load()
      if (editing?.id === id) setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (b) => {
    setEditing(b)
    setForm({
      hotelId: b.hotelId || '',
      guestId: b.guestId || '',
      guestName: b.guestName || '',
      guestEmail: b.guestEmail || '',
      bookingDate: b.bookingDate || '',
      bookingTime: b.estArrivalTime ? (b.bookingTime || b.estArrivalTime.slice(0, 5)) : '',
      arrivalDate: b.arrivalDate || b.checkIn || '',
      departureDate: b.departureDate || b.checkOut || '',
      estArrivalTime: b.estArrivalTime ? b.estArrivalTime.slice(0, 5) : '',
      estDepartureTime: b.estDepartureTime ? b.estDepartureTime.slice(0, 5) : '',
      numAdults: b.numAdults ?? b.guests ?? '',
      numChildren: b.numChildren ?? '',
      specialReq: b.specialReq || '',
      status: b.status || 'pending',
    })
    setError('')
  }

  const cancelEdit = () => {
    setEditing(null)
    setForm(defaultForm)
    setError('')
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    if (!editing) return
    if (!form.guestName?.trim() && !form.guestEmail?.trim() && !form.guestId) {
      setError('Guest name or email is required.')
      return
    }
    if (!form.arrivalDate || !form.departureDate) {
      setError('Arrival and departure dates are required.')
      return
    }
    setError('')
    try {
      await updateBooking(editing.id, {
        hotelId: form.hotelId || undefined,
        guestId: form.guestId || undefined,
        guestName: form.guestName?.trim() || undefined,
        guestEmail: form.guestEmail?.trim() || undefined,
        bookingDate: form.bookingDate || undefined,
        bookingTime: form.bookingTime ? form.bookingTime + (form.bookingTime.length === 5 ? ':00' : '') : undefined,
        arrivalDate: form.arrivalDate,
        departureDate: form.departureDate,
        checkIn: form.arrivalDate,
        checkOut: form.departureDate,
        estArrivalTime: form.estArrivalTime ? form.estArrivalTime + (form.estArrivalTime.length === 5 ? ':00' : '') : undefined,
        estDepartureTime: form.estDepartureTime ? form.estDepartureTime + (form.estDepartureTime.length === 5 ? ':00' : '') : undefined,
        numAdults: form.numAdults !== '' ? Number(form.numAdults) : undefined,
        numChildren: form.numChildren !== '' ? Number(form.numChildren) : undefined,
        specialReq: form.specialReq?.trim() || undefined,
        status: form.status,
      })
      cancelEdit()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const guestDisplay = (b) => {
    if (b.guest?.firstName || b.guest?.lastName) {
      return [b.guest.firstName, b.guest.lastName].filter(Boolean).join(' ')
    }
    return b.guestName || '—'
  }

  const emailDisplay = (b) => b.guest?.email || b.guestEmail || '—'

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Bookings</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <select value={filterHotelId} onChange={e => setFilterHotelId(e.target.value)}>
            <option value="">All hotels</option>
            {hotels.map(h => (
              <option key={h.id} value={h.id}>{h.hotelName} ({h.hotelCode})</option>
            ))}
          </select>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      {error && <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

      {editing && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Edit booking #{editing.id}</h3>
          <form onSubmit={handleEditSubmit}>
            <div className="form-grid-2">
              <div className="form-field-2col">
                <label>Hotel</label>
                <select
                  className="inline-input"
                  value={form.hotelId}
                  onChange={e => setForm(f => ({ ...f, hotelId: e.target.value }))}
                >
                  <option value="">—</option>
                  {hotels.map(h => (
                    <option key={h.id} value={h.id}>{h.hotelName} ({h.hotelCode})</option>
                  ))}
                </select>
              </div>
              <div className="form-field-2col">
                <label>Linked guest</label>
                <select
                  className="inline-input"
                  value={form.guestId}
                  onChange={e => setForm(f => ({ ...f, guestId: e.target.value }))}
                >
                  <option value="">—</option>
                  {guests.map(g => (
                    <option key={g.id} value={g.id}>{[g.firstName, g.lastName].filter(Boolean).join(' ')} ({g.email})</option>
                  ))}
                </select>
              </div>
              <div className="form-field-2col">
                <label>Guest name</label>
                <input
                  className="inline-input"
                  value={form.guestName}
                  onChange={e => setForm(f => ({ ...f, guestName: e.target.value }))}
                  placeholder="Override if no linked guest"
                />
              </div>
              <div className="form-field-2col">
                <label>Guest email</label>
                <input
                  className="inline-input"
                  type="email"
                  value={form.guestEmail}
                  onChange={e => setForm(f => ({ ...f, guestEmail: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Booking date</label>
                <input
                  className="inline-input"
                  type="date"
                  value={form.bookingDate}
                  onChange={e => setForm(f => ({ ...f, bookingDate: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Booking time</label>
                <input
                  className="inline-input"
                  type="time"
                  value={form.bookingTime}
                  onChange={e => setForm(f => ({ ...f, bookingTime: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Arrival date</label>
                <input
                  className="inline-input"
                  type="date"
                  value={form.arrivalDate}
                  onChange={e => setForm(f => ({ ...f, arrivalDate: e.target.value }))}
                  required
                />
              </div>
              <div className="form-field-2col">
                <label>Departure date</label>
                <input
                  className="inline-input"
                  type="date"
                  value={form.departureDate}
                  onChange={e => setForm(f => ({ ...f, departureDate: e.target.value }))}
                  required
                />
              </div>
              <div className="form-field-2col">
                <label>Est. arrival time</label>
                <input
                  className="inline-input"
                  type="time"
                  value={form.estArrivalTime}
                  onChange={e => setForm(f => ({ ...f, estArrivalTime: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Est. departure time</label>
                <input
                  className="inline-input"
                  type="time"
                  value={form.estDepartureTime}
                  onChange={e => setForm(f => ({ ...f, estDepartureTime: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Adults</label>
                <input
                  className="inline-input"
                  type="number"
                  min="0"
                  value={form.numAdults}
                  onChange={e => setForm(f => ({ ...f, numAdults: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Children</label>
                <input
                  className="inline-input"
                  type="number"
                  min="0"
                  value={form.numChildren}
                  onChange={e => setForm(f => ({ ...f, numChildren: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Status</label>
                <select
                  className="inline-input"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-field-2col" style={{ gridColumn: '1 / -1' }}>
                <label>Special requirements</label>
                <textarea
                  className="inline-input"
                  style={{ minHeight: '60px', resize: 'vertical' }}
                  value={form.specialReq}
                  onChange={e => setForm(f => ({ ...f, specialReq: e.target.value }))}
                  placeholder="Optional"
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">Save changes</button>
              <button type="button" style={{ marginLeft: '0.5rem' }} onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Guest</th>
                <th>Email</th>
                <th>Room</th>
                <th>Booking date</th>
                <th>Arrival</th>
                <th>Departure</th>
                <th>Est. arrival</th>
                <th>Est. depart</th>
                <th>Adults</th>
                <th>Children</th>
                <th>Special req</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{b.hotel?.hotelName ? `${b.hotel.hotelName} (${b.hotel.hotelCode})` : '—'}</td>
                  <td>{guestDisplay(b)}</td>
                  <td>{emailDisplay(b)}</td>
                  <td>{b.room?.name ?? '—'}</td>
                  <td>{b.bookingDate || '—'}</td>
                  <td>{b.arrivalDate || b.checkIn}</td>
                  <td>{b.departureDate || b.checkOut}</td>
                  <td>{b.estArrivalTime || '—'}</td>
                  <td>{b.estDepartureTime || '—'}</td>
                  <td>{b.numAdults ?? b.guests ?? '—'}</td>
                  <td>{b.numChildren ?? '—'}</td>
                  <td style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }} title={b.specialReq || ''}>{b.specialReq ? (b.specialReq.slice(0, 20) + (b.specialReq.length > 20 ? '…' : '')) : '—'}</td>
                  <td><span className={`badge ${b.status}`}>{b.status}</span></td>
                  <td>
                    <button type="button" className="btn-primary" style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => startEdit(b)}>Edit</button>
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
        </div>
        {bookings.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No bookings match the filter.</p>}
      </div>
    </>
  )
}
