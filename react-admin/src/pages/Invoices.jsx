import { useEffect, useState } from 'react'
import { getInvoices, createInvoice, deleteInvoice, getCheckins } from '../api'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [checkins, setCheckins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ checkin_id: '', room_charge: '', service_charge: '', total_amount: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getInvoices(), getCheckins()])
      .then(([inv, ci]) => {
        setInvoices(inv)
        setCheckins(ci)
      })
      .catch(e => setError(e.message || 'Failed to load invoices'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.checkin_id) {
      setError('Please select a check-in.')
      return
    }
    const room = form.room_charge ? Number(form.room_charge) : 0
    const service = form.service_charge ? Number(form.service_charge) : 0
    let total = form.total_amount ? Number(form.total_amount) : 0
    if (!total) {
      total = room + service
    }
    try {
      await createInvoice({
        checkin_id: Number(form.checkin_id),
        room_charge: room,
        service_charge: service,
        total_amount: total,
      })
      setForm({ checkin_id: '', room_charge: '', service_charge: '', total_amount: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this invoice?')) return
    try {
      await deleteInvoice(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Invoices</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Create Invoice</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>Check-in</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 3h10a2 2 0 0 1 2 2v14l-7-3-7 3V5a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.checkin_id}
                  onChange={e => setForm(f => ({ ...f, checkin_id: e.target.value }))}
                >
                  <option value="">Select check-in</option>
                  {checkins.map(ci => (
                    <option key={ci.id} value={ci.id}>
                      #{ci.id} – {ci.customer_name || '-'} ({ci.checkin_datetime})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>Room charge</label>
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
                  value={form.room_charge}
                  onChange={e => setForm(f => ({ ...f, room_charge: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
            <div className="form-field-2col">
              <label>Service charge</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 2 7l10 5 10-5-10-5z" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.service_charge}
                  onChange={e => setForm(f => ({ ...f, service_charge: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-field-2col">
              <label>Total amount</label>
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
                  placeholder="Auto = room + service if empty"
                  value={form.total_amount}
                  onChange={e => setForm(f => ({ ...f, total_amount: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Create Invoice</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Check-in</th>
              <th>Customer</th>
              <th>Room charge</th>
              <th>Service charge</th>
              <th>Total</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>#{inv.checkin_id}</td>
                <td>{inv.customer_name || '-'}</td>
                <td>${inv.room_charge.toFixed(2)}</td>
                <td>${inv.service_charge.toFixed(2)}</td>
                <td>${inv.total_amount.toFixed(2)}</td>
                <td>{inv.created_at}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(inv.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invoices.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No invoices yet.</p>}
      </div>
    </>
  )
}

