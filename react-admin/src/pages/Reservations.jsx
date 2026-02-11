import { useState, useEffect } from 'react'
import { getReservations, updateReservationStatus, deleteReservation } from '../api'

export default function Reservations() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)

  function load() {
    setLoading(true)
    const params = filter ? { status: filter } : {}
    getReservations(params)
      .then(setReservations)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filter])

  const setStatus = async (id, status) => {
    try {
      await updateReservationStatus(id, status)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const remove = async (id) => {
    if (!confirm('Cancel and delete this reservation?')) return
    try {
      await deleteReservation(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Reservations</h1>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      {error && <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id}>
                <td>{r.customer_name || r.customer_id}</td>
                <td>{r.customer_email || '-'}</td>
                <td>{r.check_in_date}</td>
                <td>{r.check_out_date}</td>
                <td><span className={`badge ${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td>{r.created_at}</td>
                <td>
                  {r.status === 'Pending' && (
                    <button
                      type="button"
                      className="btn-success"
                      style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      onClick={() => setStatus(r.id, 'Confirmed')}
                    >
                      Confirm
                    </button>
                  )}
                  {r.status !== 'Cancelled' && (
                    <button
                      type="button"
                      className="btn-danger"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      onClick={() => r.status === 'Pending' ? remove(r.id) : setStatus(r.id, 'Cancelled')}
                    >
                      {r.status === 'Pending' ? 'Cancel' : 'Mark cancelled'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {reservations.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No reservations match the filter.</p>}
      </div>
    </>
  )
}

