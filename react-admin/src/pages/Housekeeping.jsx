import { useEffect, useState } from 'react'
import { getHousekeeping, createHousekeeping, deleteHousekeeping, getRooms } from '../api'

export default function Housekeeping() {
  const [records, setRecords] = useState([])
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ room_id: '', staff_name: '', status: 'Cleaned', cleaned_date: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getHousekeeping(), getRooms()])
      .then(([hk, rms]) => {
        setRecords(hk)
        setRooms(rms)
      })
      .catch(e => setError(e.message || 'Failed to load housekeeping'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.room_id || !form.staff_name || !form.status) {
      setError('Please select room, status and enter staff name.')
      return
    }
    try {
      await createHousekeeping({
        room_id: Number(form.room_id),
        staff_name: form.staff_name.trim(),
        status: form.status,
        cleaned_date: form.cleaned_date || null,
      })
      setForm({ room_id: '', staff_name: '', status: 'Cleaned', cleaned_date: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this housekeeping record?')) return
    try {
      await deleteHousekeeping(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Housekeeping</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add Housekeeping Record</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>Room</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.room_id}
                  onChange={e => setForm(f => ({ ...f, room_id: e.target.value }))}
                >
                  <option value="">Select room</option>
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>Staff name</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  value={form.staff_name}
                  onChange={e => setForm(f => ({ ...f, staff_name: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
            <div className="form-field-2col">
              <label>Status</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value="Cleaned">Cleaned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>Cleaned date/time</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 2v3" />
                    <path d="M16 2v3" />
                    <rect x="3" y="5" width="18" height="18" rx="2" />
                    <path d="M3 10h18" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  type="datetime-local"
                  value={form.cleaned_date}
                  onChange={e => setForm(f => ({ ...f, cleaned_date: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Staff</th>
              <th>Status</th>
              <th>Cleaned date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.room_name || r.room_id}</td>
                <td>{r.staff_name}</td>
                <td>{r.status}</td>
                <td>{r.cleaned_date || '-'}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {records.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No housekeeping records yet.</p>}
      </div>
    </>
  )
}

