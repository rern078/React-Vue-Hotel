import { useEffect, useState } from 'react'
import { getUsers, getRoles, createUserApi, updateUserApi, deleteUserApi } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({
    name: '',
    username: '',
    full_name: '',
    email: '',
    phone: '',
    role_id: '',
    status: 1,
    password: '',
  })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getUsers(), getRoles()])
      .then(([u, r]) => {
        setUsers(u)
        setRoles(r)
      })
      .catch((e) => setError(e.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const resetForm = () => {
    setForm({
      name: '',
      username: '',
      full_name: '',
      email: '',
      phone: '',
      role_id: '',
      status: 1,
      password: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name.trim()) {
      setError('Please enter a name.')
      return
    }
    if (!form.email.trim()) {
      setError('Please enter an email.')
      return
    }
    if (!editing && !form.password) {
      setError('Please enter a password for new users.')
      return
    }
    if (form.password && form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    const payload = {
      name: form.name.trim(),
      username: form.username.trim() || null,
      full_name: form.full_name.trim() || null,
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      role_id: form.role_id ? Number(form.role_id) : null,
      status: Number(form.status) || 0,
    }
    if (form.password) {
      payload.password = form.password
    }

    try {
      if (editing) {
        await updateUserApi(editing.id, payload)
      } else {
        await createUserApi(payload)
      }
      setEditing(null)
      resetForm()
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (user) => {
    setEditing(user)
    setForm({
      name: user.name || '',
      username: user.username || '',
      full_name: user.full_name || '',
      email: user.email || '',
      phone: user.phone || '',
      role_id: user.role_id || '',
      status: user.status ?? 1,
      password: '',
    })
    setError('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      await deleteUserApi(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Users</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit User' : 'New User'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>
                <span className="required">*</span> Name
              </label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="Please Enter Your Name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="form-field-2col">
              <label>Username</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="Optional username"
                  value={form.username}
                  onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-field-2col">
              <label>Full name</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                    <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="Display name (optional)"
                  value={form.full_name}
                  onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
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
                  placeholder="Enter Your Email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>Phone</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 .95-.26 11.72 11.72 0 0 0 3.68.59 1 1 0 0 1 1 1V21a1 1 0 0 1-1 1A17 17 0 0 1 3 7a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.72 11.72 0 0 0 .59 3.68 1 1 0 0 1-.26.95l-2.21 2.16z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="Phone number (optional)"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-field-2col">
              <label>Role</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 1l3 5.9 6.5.9-4.7 4.6L17.8 19 12 15.9 6.2 19l1-6.6L2.5 7.8 9 6.9 12 1z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.role_id || ''}
                  onChange={(e) => setForm((f) => ({ ...f, role_id: e.target.value }))}
                >
                  <option value="">No role</option>
                  {roles.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginBottom: '1rem' }}>
            <div className="form-field-2col">
              <label>Status</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 16.17L4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Disabled</option>
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>
                Password {editing && <span style={{ fontSize: '0.8rem', color: 'var(--main-muted)' }}>(optional)</span>}
              </label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder={editing ? 'Leave blank to keep current password' : 'At least 6 characters'}
                />
              </div>
            </div>
          </div>

          <div>
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
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username || '-'}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone || '-'}</td>
                <td>{roles.find((r) => String(r.id) === String(u.role_id))?.name || '-'}</td>
                <td>{u.status ? 'Active' : 'Disabled'}</td>
                <td>{u.created_at}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => startEdit(u)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

