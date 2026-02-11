import { useEffect, useState } from 'react'
import { getCustomers, updateCustomerApi, deleteCustomerApi } from '../api'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    full_name: '',
    gender: '',
    phone: '',
    email: '',
    id_card: '',
    address: '',
  })

  const load = () => {
    setLoading(true)
    setError('')
    getCustomers()
      .then(setCustomers)
      .catch(e => setError(e.message || 'Failed to load customers'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setForm({
      full_name: '',
      gender: '',
      phone: '',
      email: '',
      id_card: '',
      address: '',
    })
  }

  const startEdit = (c) => {
    setEditing(c)
    setForm({
      full_name: c.full_name || '',
      gender: c.gender || '',
      phone: c.phone || '',
      email: c.email || '',
      id_card: c.id_card || '',
      address: c.address || '',
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!editing) return
    setError('')
    if (!form.full_name.trim()) {
      setError('Please enter full name.')
      return
    }
    if (!form.email.trim()) {
      setError('Please enter email.')
      return
    }
    try {
      await updateCustomerApi(editing.id, {
        full_name: form.full_name.trim(),
        gender: form.gender || null,
        phone: form.phone || null,
        email: form.email.trim(),
        id_card: form.id_card || null,
        address: form.address || null,
      })
      setEditing(null)
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this customer and their data?')) return
    try {
      await deleteCustomerApi(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Customers</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Customer' : 'Select a customer to edit'}</h3>
        {editing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-grid-2">
              <div className="form-field-2col">
                <label>
                  <span className="required">*</span> Full name
                </label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    value={form.full_name}
                    onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-field-2col">
                <label>Gender</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 3h-6v2h3.59l-3.8 3.8A5 5 0 1 0 14 10.2L17.8 6.4V10h2z" />
                    </svg>
                  </div>
                  <select
                    className="inline-input"
                    value={form.gender}
                    onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}
                  >
                    <option value="">Not set</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-field-2col">
                <label>Phone</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .95-.26 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.26.95z" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="form-field-2col">
                <label>
                  <span className="required">*</span> Email
                </label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v.01L12 11l8-4.99V6H4zm0 4.236V18h16v-5.764L12 14 4 10.236z" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-field-2col">
                <label>ID card / Passport</label>
                <div className="inline-input-wrap">
                  <div className="inline-input-icon">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 4h16v16H4z" />
                      <path d="M8 10h8" /><path d="M8 14h4" />
                    </svg>
                  </div>
                  <input
                    className="inline-input"
                    value={form.id_card}
                    onChange={e => setForm(f => ({ ...f, id_card: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '0.75rem' }}>
              <label>Address</label>
              <div className="inline-input-wrap" style={{ marginTop: '0.25rem' }}>
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <textarea
                  className="inline-input"
                  style={{ minHeight: '70px', resize: 'vertical' }}
                  value={form.address}
                  onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  placeholder="Street, city, country"
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <button type="submit" className="btn-primary">Update</button>
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
            </div>
          </form>
        ) : (
          <p style={{ color: 'var(--main-muted)' }}>Select a customer from the table below to edit their details.</p>
        )}
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full name</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>ID card</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.full_name}</td>
                <td>{c.gender || '-'}</td>
                <td>{c.phone || '-'}</td>
                <td>{c.email}</td>
                <td>{c.id_card || '-'}</td>
                <td>{c.created_at}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => startEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No customers yet.</p>}
      </div>
    </>
  )
}

