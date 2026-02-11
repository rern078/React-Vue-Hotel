import { useEffect, useState } from 'react'
import { getServiceOrders, createServiceOrder, deleteServiceOrder, getCheckins, getServices } from '../api'

export default function ServiceOrders() {
  const [orders, setOrders] = useState([])
  const [checkins, setCheckins] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ checkin_id: '', service_id: '', quantity: 1, total_price: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getServiceOrders(), getCheckins(), getServices()])
      .then(([ord, ci, sv]) => {
        setOrders(ord)
        setCheckins(ci)
        setServices(sv)
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
    if (!form.checkin_id || !form.service_id) {
      setError('Please select check-in and service.')
      return
    }
    const qty = form.quantity ? Number(form.quantity) : 1
    let total = form.total_price ? Number(form.total_price) : 0
    if (!total) {
      const service = services.find(s => String(s.id) === String(form.service_id))
      if (service) total = service.price * qty
    }
    try {
      await createServiceOrder({
        checkin_id: Number(form.checkin_id),
        service_id: Number(form.service_id),
        quantity: qty,
        total_price: total,
      })
      setForm({ checkin_id: '', service_id: '', quantity: 1, total_price: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this service order?')) return
    try {
      await deleteServiceOrder(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Service Orders</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Add Service to Check-in</h3>
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
              <label>Service</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2 2 7l10 5 10-5-10-5z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.service_id}
                  onChange={e => setForm(f => ({ ...f, service_id: e.target.value }))}
                >
                  <option value="">Select service</option>
                  {services.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.service_name} (${s.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
            <div className="form-field-2col">
              <label>Quantity</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 12h16" />
                    <path d="M12 4v16" />
                  </svg>
                </div>
                <input
                  className="inline-input"
                  type="number"
                  min="1"
                  value={form.quantity}
                  onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-field-2col">
              <label>Total price</label>
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
                  placeholder="Auto from service × qty if empty"
                  value={form.total_price}
                  onChange={e => setForm(f => ({ ...f, total_price: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Add Service</button>
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
              <th>Service</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Order date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>#{o.checkin_id}</td>
                <td>{o.customer_name || '-'}</td>
                <td>{o.service_name || o.service_id}</td>
                <td>{o.quantity}</td>
                <td>${o.total_price.toFixed(2)}</td>
                <td>{o.order_date}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(o.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No service orders yet.</p>}
      </div>
    </>
  )
}

