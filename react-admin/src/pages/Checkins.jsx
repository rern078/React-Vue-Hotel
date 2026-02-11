import { useState, useEffect } from 'react'
import { getCheckins, createCheckin, updateCheckin, deleteCheckin, getReservations } from '../api'

export default function Checkins() {
  const [checkins, setCheckins] = useState([])
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [form, setForm] = useState({ reservation_id: '' })

  function load() {
    setLoading(true)
    const params = filter ? { status: filter } : {}
    Promise.all([getCheckins(params), getReservations()])
      .then(([ci, resv]) => {
        setCheckins(ci)
        setReservations(resv)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.reservation_id) {
      setError('Please select a reservation.')
      return
    }
    try {
      await createCheckin({ reservation_id: Number(form.reservation_id) })
      setForm({ reservation_id: '' })
      setError(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const markCheckout = async (id) => {
    try {
      const nowIso = new Date().toISOString().slice(0, 19).replace('T', ' ')
      await updateCheckin(id, { checkout_datetime: nowIso, status: 'CheckedOut' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this check-in record?')) return
    try {
      await deleteCheckin(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Check-ins</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="CheckedIn">Checked In</option>
          <option value="CheckedOut">Checked Out</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      {error && <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>New Check-in</h3>
        <form onSubmit={handleCreate}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>Reservation</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 3h10a2 2 0 0 1 2 2v14l-7-3-7 3V5a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.reservation_id}
                  onChange={e => setForm(f => ({ ...f, reservation_id: e.target.value }))}
                >
                  <option value="">Select reservation</option>
                  {reservations.map(r => (
                    <option key={r.id} value={r.id}>
                      #{r.id} – {r.customer_name || r.customer_id} ({r.check_in_date} → {r.check_out_date})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Check in</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Check-in time</th>
              <th>Check-out time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {checkins.map(ci => (
              <tr key={ci.id}>
                <td>{ci.id}</td>
                <td>{ci.customer_name || '-'}</td>
                <td>{ci.customer_email || '-'}</td>
                <td>{ci.checkin_datetime}</td>
                <td>{ci.checkout_datetime || '-'}</td>
                <td><span className={`badge ${ci.status.toLowerCase()}`}>{ci.status}</span></td>
                <td>
                  {ci.status === 'CheckedIn' && (
                    <button
                      type="button"
                      className="btn-success"
                      style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      onClick={() => markCheckout(ci.id)}
                    >
                      Check out
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => remove(ci.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {checkins.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No check-ins match the filter.</p>}
      </div>
    </>
  )
}

