import { useEffect, useState } from 'react'
import { getGuests, getBookings, createGuestApi, updateGuestApi, deleteGuestApi } from '../api'

const defaultForm = {
  bookingId: '',
  guestTitle: '',
  firstName: '',
  lastName: '',
  dob: '',
  gender: '',
  phoneNo: '',
  email: '',
  password: '',
  passportNo: '',
  address: '',
  postcode: '',
  city: '',
  country: '',
}

export default function Guests() {
  const [guests, setGuests] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(defaultForm)
  const [filterBookingId, setFilterBookingId] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    getBookings()
      .then(setBookings)
      .catch(e => setError(e.message || 'Failed to load bookings'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (loading) return
    const params = filterBookingId ? { bookingId: filterBookingId } : {}
    getGuests(params).then(setGuests).catch(e => setError(e.message))
  }, [loading, filterBookingId])

  const resetForm = () => {
    setForm(defaultForm)
    setCreating(false)
    setEditing(null)
    setError('')
  }

  const startEdit = (g) => {
    setEditing(g)
    setCreating(false)
    setForm({
      bookingId: g.bookingId,
      guestTitle: g.guestTitle || '',
      firstName: g.firstName || '',
      lastName: g.lastName || '',
      dob: g.dob || '',
      gender: g.gender || '',
      phoneNo: g.phoneNo || '',
      email: g.email || '',
      password: '',
      passportNo: g.passportNo || '',
      address: g.address || '',
      postcode: g.postcode || '',
      city: g.city || '',
      country: g.country || '',
    })
    setError('')
  }

  const startCreate = () => {
    setCreating(true)
    setEditing(null)
    setForm({ ...defaultForm, bookingId: filterBookingId || '' })
    setError('')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.bookingId || !form.firstName.trim() || !form.lastName.trim()) {
      setError('Booking, first name and last name are required.')
      return
    }
    setError('')
    try {
      await createGuestApi({
        bookingId: form.bookingId,
        guestTitle: form.guestTitle || undefined,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dob: form.dob || undefined,
        gender: form.gender || undefined,
        phoneNo: form.phoneNo || undefined,
        email: form.email || undefined,
        password: form.password || undefined,
        passportNo: form.passportNo || undefined,
        address: form.address || undefined,
        postcode: form.postcode || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
      })
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editing || !form.firstName.trim() || !form.lastName.trim()) return
    setError('')
    try {
      await updateGuestApi(editing.id, {
        guestTitle: form.guestTitle || undefined,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        dob: form.dob || undefined,
        gender: form.gender || undefined,
        phoneNo: form.phoneNo || undefined,
        email: form.email || undefined,
        passportNo: form.passportNo || undefined,
        address: form.address || undefined,
        postcode: form.postcode || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
      })
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this guest record?')) return
    try {
      await deleteGuestApi(id)
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Guests</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <select
            value={filterBookingId}
            onChange={e => setFilterBookingId(e.target.value)}
            style={{ minWidth: '140px' }}
          >
            <option value="">All bookings</option>
            {bookings.map(b => (
              <option key={b.id} value={b.id}>
                #{b.id} {b.guestName} – {b.checkIn}
              </option>
            ))}
          </select>
          <button type="button" className="btn-primary" onClick={startCreate}>
            Add Guest
          </button>
        </div>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {(creating || editing) && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{creating ? 'New Guest' : 'Edit Guest'}</h3>
          <form onSubmit={creating ? handleCreate : handleUpdate}>
            <div className="form-grid-2">
              <div className="form-field-2col">
                <label><span className="required">*</span> Booking</label>
                <select
                  className="inline-input"
                  value={form.bookingId}
                  onChange={e => setForm(f => ({ ...f, bookingId: e.target.value }))}
                  required
                  disabled={!!editing}
                >
                  <option value="">Select booking</option>
                  {bookings.map(b => (
                    <option key={b.id} value={b.id}>#{b.id} {b.guestName} – {b.checkIn} to {b.checkOut}</option>
                  ))}
                </select>
              </div>
              <div className="form-field-2col">
                <label>Title</label>
                <select
                  className="inline-input"
                  value={form.guestTitle}
                  onChange={e => setForm(f => ({ ...f, guestTitle: e.target.value }))}
                >
                  <option value="">—</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                  <option value="Miss">Miss</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              <div className="form-field-2col">
                <label><span className="required">*</span> First name</label>
                <input
                  className="inline-input"
                  value={form.firstName}
                  onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                  required
                />
              </div>
              <div className="form-field-2col">
                <label><span className="required">*</span> Last name</label>
                <input
                  className="inline-input"
                  value={form.lastName}
                  onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                  required
                />
              </div>
              <div className="form-field-2col">
                <label>DOB</label>
                <input
                  className="inline-input"
                  type="date"
                  value={form.dob}
                  onChange={e => setForm(f => ({ ...f, dob: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Gender</label>
                <select
                  className="inline-input"
                  value={form.gender}
                  onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                >
                  <option value="">—</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-field-2col">
                <label>Phone</label>
                <input
                  className="inline-input"
                  value={form.phoneNo}
                  onChange={e => setForm(f => ({ ...f, phoneNo: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Email</label>
                <input
                  className="inline-input"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              {creating && (
                <div className="form-field-2col">
                  <label>Password</label>
                  <input
                    className="inline-input"
                    type="password"
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Optional"
                  />
                </div>
              )}
              <div className="form-field-2col">
                <label>Passport No</label>
                <input
                  className="inline-input"
                  value={form.passportNo}
                  onChange={e => setForm(f => ({ ...f, passportNo: e.target.value }))}
                />
              </div>
              <div className="form-field-2col" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input
                  className="inline-input"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="Street, number"
                />
              </div>
              <div className="form-field-2col">
                <label>Postcode</label>
                <input
                  className="inline-input"
                  value={form.postcode}
                  onChange={e => setForm(f => ({ ...f, postcode: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>City</label>
                <input
                  className="inline-input"
                  value={form.city}
                  onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                />
              </div>
              <div className="form-field-2col">
                <label>Country</label>
                <input
                  className="inline-input"
                  value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">
                {creating ? 'Create Guest' : 'Update'}
              </button>
              <button type="button" style={{ marginLeft: '0.5rem' }} onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Passport</th>
              <th>City / Country</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {guests.map(g => (
              <tr key={g.id}>
                <td>{g.id}</td>
                <td>#{g.bookingId} {g.booking?.guestName}</td>
                <td>{[g.guestTitle, g.firstName, g.lastName].filter(Boolean).join(' ')}</td>
                <td>{g.dob || '—'}</td>
                <td>{g.gender || '—'}</td>
                <td>{g.phoneNo || '—'}</td>
                <td>{g.email || '—'}</td>
                <td>{g.passportNo || '—'}</td>
                <td>{[g.city, g.country].filter(Boolean).join(', ') || '—'}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => startEdit(g)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(g.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {guests.length === 0 && (
          <p style={{ padding: '1rem', color: 'var(--muted)' }}>
            {filterBookingId ? 'No guests for this booking.' : 'No guests yet.'}
          </p>
        )}
      </div>
    </>
  )
}
