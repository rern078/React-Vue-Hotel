import { useState, useEffect } from 'react'
import { getRooms, createRoom, updateRoom, deleteRoom, getRoomTypes } from '../api'

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null)
  const [roomTypes, setRoomTypes] = useState([])
  const [form, setForm] = useState({ name: '', room_type_id: '', price: '', capacity: 2, amenities: [] })
  const [showForm, setShowForm] = useState(false)

  function loadRooms() {
    setLoading(true)
    Promise.all([getRooms(), getRoomTypes()])
      .then(([roomsList, types]) => {
        setRooms(roomsList)
        setRoomTypes(types)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadRooms() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = { ...form, room_type_id: Number(form.room_type_id), price: Number(form.price), capacity: Number(form.capacity) }
    if (typeof form.amenities === 'string') payload.amenities = form.amenities.split(',').map(s => s.trim()).filter(Boolean)
    try {
      if (editing) {
        await updateRoom(editing.id, payload)
        setEditing(null)
      } else {
        await createRoom(payload)
      }
      setForm({ name: '', room_type_id: '', price: '', capacity: 2, amenities: [] })
      setShowForm(false)
      loadRooms()
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (room) => {
    setEditing(room)
    const amenitiesStr = Array.isArray(room.amenities) ? room.amenities.join(', ') : (room.amenities ?? '')
    setForm({ name: room.name, room_type_id: room.room_type_id, price: room.price, capacity: room.capacity, amenities: amenitiesStr })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this room?')) return
    try {
      await deleteRoom(id)
      loadRooms()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Rooms</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setForm({ name: '', room_type_id: '', price: '', capacity: 2, amenities: [] }); setShowForm(!showForm); }}>
          {showForm ? 'Cancel' : 'Add Room'}
        </button>
      </div>
      {error && <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>}
      {showForm && (
        <div className="card" style={{ marginBottom: '1.5rem'}}>
          <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Room' : 'New Room'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <div className="form-field-2col">
                <label>Name</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <path d="M9 22V12h6v10" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Room name"
                    required
                  />
                </div>
              </div>
              <div className="form-field-2col">
                <label>Room type</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 7h16v10H4z" />
                      <path d="M10 7V5h4v2" />
                    </svg>
                  </div>
                  <select
                    className="inline-input"
                    value={form.room_type_id}
                    onChange={e => setForm(f => ({ ...f, room_type_id: e.target.value }))}
                  >
                    <option value="">Select type</option>
                    {roomTypes.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.type_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-field-2col">
                <label>Price/night</label>
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
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="Price per night"
                    required
                  />
                </div>
              </div>
              <div className="form-field-2col">
                <label>Capacity</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="7" cy="8" r="2" />
                      <circle cx="17" cy="8" r="2" />
                      <path d="M5 20v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
                      <path d="M13 20v-2a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v2" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    type="number"
                    min="1"
                    value={form.capacity}
                    onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))}
                    placeholder="Guests"
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <label>Amenities (comma-separated)</label>
              <div className="inline-input-wrap" style={{ marginTop: '0.25rem' }}>
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 5h16v4H4z" />
                    <path d="M6 11h12v8H6z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  value={typeof form.amenities === 'string' ? form.amenities : (form.amenities || []).join(', ')}
                  onChange={e => setForm(f => ({ ...f, amenities: e.target.value }))}
                  placeholder="wifi, tv, minibar"
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Create'}</button>
            </div>
          </form>
        </div>
      )}
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>Amenities</th>
              <th>Available</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(r => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{roomTypes.find(t => String(t.id) === String(r.room_type_id))?.type_name || '-'}</td>
                <td>${r.price}</td>
                <td>{r.capacity}</td>
                <td>{(r.amenities || []).join(', ')}</td>
                <td>{r.available ? 'Yes' : 'No'}</td>
                <td>
                  <button type="button" className="btn-primary" style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => startEdit(r)}>Edit</button>
                  <button type="button" className="btn-danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
