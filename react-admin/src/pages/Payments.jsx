import { useEffect, useState } from 'react'
import { getPayments, createPayment, deletePayment, getInvoices } from '../api'

export default function Payments() {
  const [payments, setPayments] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ invoice_id: '', payment_method: '', amount: '' })

  const load = () => {
    setLoading(true)
    setError('')
    Promise.all([getPayments(), getInvoices()])
      .then(([pay, inv]) => {
        setPayments(pay)
        setInvoices(inv)
      })
      .catch(e => setError(e.message || 'Failed to load payments'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.invoice_id || !form.payment_method || !form.amount) {
      setError('Please select invoice, method and amount.')
      return
    }
    try {
      await createPayment({
        invoice_id: Number(form.invoice_id),
        payment_method: form.payment_method,
        amount: Number(form.amount),
      })
      setForm({ invoice_id: '', payment_method: '', amount: '' })
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this payment?')) return
    try {
      await deletePayment(id)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div className="page-title">Loading...</div>

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Payments</h1>
      </div>
      {error && (
        <div className="card" style={{ color: 'var(--danger)', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Record Payment</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-field-2col">
              <label>Invoice</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 3h10a2 2 0 0 1 2 2v14l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.invoice_id}
                  onChange={e => setForm(f => ({ ...f, invoice_id: e.target.value }))}
                >
                  <option value="">Select invoice</option>
                  {invoices.map(inv => (
                    <option key={inv.id} value={inv.id}>
                      #{inv.id} – {inv.customer_name || '-'} (total ${inv.total_amount.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-field-2col">
              <label>Payment method</label>
              <div className="inline-input-wrap">
                <div className="inline-input-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M2 7h20v10H2z" />
                    <path d="M2 9h20" />
                  </svg>
                </div>
                <select
                  className="inline-input"
                  value={form.payment_method}
                  onChange={e => setForm(f => ({ ...f, payment_method: e.target.value }))}
                >
                  <option value="">Select method</option>
                  <option value="Cash">Cash</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-grid-2" style={{ marginTop: '0.75rem' }}>
            <div className="form-field-2col">
              <label>Amount</label>
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
                  value={form.amount}
                  onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn-primary">Save Payment</button>
          </div>
        </form>
      </div>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Payment date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>#{p.invoice_id}</td>
                <td>{p.customer_name || '-'}</td>
                <td>{p.payment_method}</td>
                <td>${p.amount.toFixed(2)}</td>
                <td>{p.payment_date}</td>
                <td>
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && <p style={{ padding: '1rem', color: 'var(--muted)' }}>No payments yet.</p>}
      </div>
    </>
  )
}

