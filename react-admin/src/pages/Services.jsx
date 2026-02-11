import { useEffect, useState } from 'react'
import { getServices, createServiceApi, updateServiceApi, deleteServiceApi } from '../api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ service_name: '', price: '', status: 1 })

  const load = () => {
    setLoading(true)
    setError('')
    getServices()
      .then(setServices)
      .catch(e => setError(e.message || 'Failed to load services'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setForm({ service_name: '', price: '', status: 1 })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.service_name.trim()) {
      setError('Please enter a service name.')
      return
    }
    const payload = {
      service_name: form.service_name.trim(),
      price: form.price ? Number(form.price) : 0,
      status: Number(form.status) || 0,
    }
    try {
      if (editing) {
        await updateServiceApi(editing.id, payload)
      } else {
        await createServiceApi(payload)
      }
      setEditing(null)
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (service) => {
    setEditing(service)
    setForm({
      service_name: service.service_name || '',
      price: service.price != null ? String(service.price) : '',
      status: service.status ? 1 : 0,
    })
    setError('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return
    try {
      await deleteServiceApi(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Services</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Service' : 'New Service'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>
                <span className="required">*</span> Service name
              </label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="Service name"
                  value={form.service_name}
                  onChange={e => setForm(f => ({ ...f, service_name: e.target.value }))}
                  required
                />
              </div>
            </div>
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
                  placeholder="0.00"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
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
                    <path d="M9 16.17 4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">
              {editing ? 'Update' : 'Create'}
            </button>
            {editing && (
              <button
                type="button"
                style={{ marginLeft: '0.5rem' }}
                onClick={() => {
                  setEditing(null)
                  resetForm()
                  setError('')
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.service_name}</td>
                <td>${s.price.toFixed(2)}</td>
                <td>{s.status ? 'Active' : 'Disabled'}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => startEdit(s)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No services yet.</p>}
      </div>
    </>
  )
}

