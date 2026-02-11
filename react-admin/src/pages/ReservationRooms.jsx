import { useEffect, useState } from 'react'
import { getReservationRooms, createReservationRoom, deleteReservationRoom, getReservations, getRooms } from '../api'

export default function ReservationRooms() {
  const [items, setItems] = useState([])
  const [reservations, setReservations] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ reservation_id: '', room_id: '', price: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getReservationRooms(), getReservations(), getRooms()])
      .then(([links, resv, rms]) => {
        setItems(links)
        setReservations(resv)
        setRooms(rms)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.reservation_id || !form.room_id) {
      setError('Please select reservation and room.')
      return
    }
    try {
      await createReservationRoom({
        reservation_id: Number(form.reservation_id),
        room_id: Number(form.room_id),
        price: form.price ? Number(form.price) : 0,
      })
      setForm({ reservation_id: '', room_id: '', price: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Remove this room from reservation?')) return
    try {
      await deleteReservationRoom(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Reservation Rooms</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Link room to reservation</h3>
        <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setForm(f => ({ ...f, reservation_id: e.target.value }))}
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
            <div className="form-field-2col">
              <label>Room</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.room_id}
                  onChange={(e) => setForm(f => ({ ...f, room_id: e.target.value }))}
                >
                  <option value="">Select room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      #{r.id} – {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
            <div className="form-field-2col">
              <label>Price</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 1v22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                  placeholder="Override price (optional)"
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Add</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Reservation</th>
              <th>Room</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  #{item.reservation_id}{' '}
                  {item.check_in_date && `(${item.check_in_date} → ${item.check_out_date})`}
                </td>
                <td>{item.room_name || item.room_id}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No reservation rooms yet.</p>}
      </div>
    </>
  )
}

