import { useEffect, useState } from 'react'
import { getRoles, createRole, updateRole, deleteRoleApi } from '../api'

export default function Roles() {
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [editing, setEditing] = useState(null)

  const load = () => {
    setLoading(true)
    setError('')
    getRoles()
      .then(setRoles)
      .catch((e) => setError(e.message || 'Failed to load roles'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter a role name.')
      return
    }
    try {
      if (editing) {
        await updateRole(editing.id, name.trim())
      } else {
        await createRole(name.trim())
      }
      setName('')
      setEditing(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const startEdit = (role) => {
    setEditing(role)
    setName(role.name)
    setError('')
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this role?')) return
    try {
      await deleteRoleApi(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Roles</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      <div className="card" style={{ marginBottom: '1.5rem'}}>
        <h3 style={{ marginBottom: '1rem' }}>{editing ? 'Edit Role' : 'New Role'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="inline-form-row">
            <label className="inline-form-label">
              <span className="required">*</span> Name:
            </label>
            <div className="inline-input-wrap">
              <div className="inline-input-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2L4 5v6c0 5 3.8 9.4 8 11 4.2-1.6 8-6 8-11V5l-8-3zm0 2.2l5 1.9v5.2c0 3.6-2.4 6.9-5 8.1-2.6-1.2-5-4.5-5-8.1V6.1l5-1.9z" />
                  <path d="M11 14h2v2h-2zM11 8h2v5h-2z" />
                </svg>
              </div>
              <input
                className="inline-input"
                placeholder="Role name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                  setName('')
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>
                  <button
                    type="button"
                    className="btn-primary"
                    style={{ marginRight: '0.5rem', padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => startEdit(r)}
                  >
                    Edit
                  </button>
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
      </div>
    </>
  )
}

