import { useEffect, useState } from 'react'
import { getHotels, createHotelApi, updateHotelApi, deleteHotelApi } from '../api'

const defaultForm = {
  hotelCode: '',
  hotelName: '',
  address: '',
  postcode: '',
  city: '',
  country: '',
  numRooms: '',
  phoneNo: '',
  starRating: '',
}

export default function Hotels() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [creating, setCreating] = useState(false)
  const [form, setForm] = useState(defaultForm)

  const load = () => {
    setLoading(true)
    setError('')
    getHotels()
      .then(setHotels)
      .catch(e => setError(e.message || 'Failed to load hotels'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setForm(defaultForm)
    setEditing(null)
    setCreating(false)
    setError('')
  }

  const startEdit = (h) => {
    setEditing(h)
    setCreating(false)
    setForm({
      hotelCode: h.hotelCode || '',
      hotelName: h.hotelName || '',
      address: h.address || '',
      postcode: h.postcode || '',
      city: h.city || '',
      country: h.country || '',
      numRooms: h.numRooms ?? '',
      phoneNo: h.phoneNo || '',
      starRating: h.starRating ?? '',
    })
    setError('')
  }

  const startCreate = () => {
    setCreating(true)
    setEditing(null)
    setForm(defaultForm)
    setError('')
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!form.hotelCode.trim() || !form.hotelName.trim()) {
      setError('Hotel code and name are required.')
      return
    }
    setError('')
    try {
      await createHotelApi({
        hotelCode: form.hotelCode.trim(),
        hotelName: form.hotelName.trim(),
        address: form.address || undefined,
        postcode: form.postcode || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
        numRooms: form.numRooms ? Number(form.numRooms) : undefined,
        phoneNo: form.phoneNo || undefined,
        starRating: form.starRating ? Number(form.starRating) : undefined,
      })
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editing) return
    if (!form.hotelCode.trim() || !form.hotelName.trim()) {
      setError('Hotel code and name are required.')
      return
    }
    setError('')
    try {
      await updateHotelApi(editing.id, {
        hotelCode: form.hotelCode.trim(),
        hotelName: form.hotelName.trim(),
        address: form.address || undefined,
        postcode: form.postcode || undefined,
        city: form.city || undefined,
        country: form.country || undefined,
        numRooms: form.numRooms ? Number(form.numRooms) : undefined,
        phoneNo: form.phoneNo || undefined,
        starRating: form.starRating ? Number(form.starRating) : undefined,
      })
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this hotel? Rooms and bookings may be affected.')) return
    try {
      await deleteHotelApi(id)
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
        <h1 className="page-title" style={{ marginBottom: 0 }}>Hotels</h1>
        <button type="button" className="btn-primary" onClick={startCreate}>Add Hotel</button>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>
      )}

      {(creating || editing) && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>{creating ? 'New Hotel' : 'Edit Hotel'}</h3>
          <form onSubmit={creating ? handleCreate : handleUpdate}>
            <div className="form-grid-2">
              <div className="form-field-2col">
                <label><span className="required">*</span> Hotel code</label>
                <input
                  className="inline-input"
                  value={form.hotelCode}
                  onChange={e => setForm(f => ({ ...f, hotelCode: e.target.value }))}
                  placeholder="e.g. HLT01"
                  required
                  disabled={!!editing}
                />
              </div>
              <div className="form-field-2col">
                <label><span className="required">*</span> Hotel name</label>
                <input
                  className="inline-input"
                  value={form.hotelName}
                  onChange={e => setForm(f => ({ ...f, hotelName: e.target.value }))}
                  required
                />
              </div>
              <div className="form-field-2col" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input
                  className="inline-input"
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
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
              <div className="form-field-2col">
                <label>Num rooms</label>
                <input
                  className="inline-input"
                  type="number"
                  min="1"
                  value={form.numRooms}
                  onChange={e => setForm(f => ({ ...f, numRooms: e.target.value }))}
                />
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
                <label>Star rating</label>
                <input
                  className="inline-input"
                  type="number"
                  min="1"
                  max="5"
                  step="0.5"
                  value={form.starRating}
                  onChange={e => setForm(f => ({ ...f, starRating: e.target.value }))}
                  placeholder="1–5"
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">{creating ? 'Create' : 'Update'}</button>
              <button type="button" style={{ marginLeft: '0.5rem' }} onClick={resetForm}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>City</th>
              <th>Country</th>
              <th>Rooms</th>
              <th>Phone</th>
              <th>Stars</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(h => (
              <tr key={h.id}>
                <td>{h.hotelCode}</td>
                <td>{h.hotelName}</td>
                <td>{h.city || '—'}</td>
                <td>{h.country || '—'}</td>
                <td>{h.numRooms ?? '—'}</td>
                <td>{h.phoneNo || '—'}</td>
                <td>{h.starRating ?? '—'}</td>
                <td>
                  <button type="button" className="btn-primary" style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => startEdit(h)}>Edit</button>
                  <button type="button" className="btn-danger" style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }} onClick={() => handleDelete(h.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {hotels.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No hotels yet.</p>}
      </div>
    </>
  )
}
