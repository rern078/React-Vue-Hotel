import { useEffect, useState } from 'react'
import { getAuditLogs, createAuditLogApi, deleteAuditLogApi, getUsers } from '../api'

export default function AuditLogs() {
  const [logs, setLogs] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ user_id: '', action: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getAuditLogs(), getUsers()])
      .then(([ls, us]) => {
        setLogs(ls)
        setUsers(us)
      })
      .catch(e => setError(e.message || 'Failed to load audit logs'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.action.trim()) {
      setError('Please enter action description.')
      return
    }
    try {
      await createAuditLogApi({
        user_id: form.user_id ? Number(form.user_id) : null,
        action: form.action.trim(),
      })
      setForm({ user_id: '', action: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this audit log entry?')) return
    try {
      await deleteAuditLogApi(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Audit Logs</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add Audit Log (manual)</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>User (optional)</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.user_id}
                  onChange={e => setForm(f => ({ ...f, user_id: e.target.value }))}
                >
                  <option value="">System / unknown</option>
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>Action</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 3h18v4H3z" />
                    <path d="M7 7v14" />
                    <path d="M3 11h18" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  placeholder="e.g. Created reservation #12"
                  value={form.action}
                  onChange={e => setForm(f => ({ ...f, action: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Add Log Entry</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {logs.map(l => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.user_name ? `${l.user_name} (${l.user_email})` : '-'}</td>
                <td>{l.action}</td>
                <td>{l.log_date}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(l.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No audit logs yet.</p>}
      </div>
    </>
  )
}

