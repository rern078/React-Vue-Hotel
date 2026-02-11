import { useState, useEffect, useMemo } from 'react'
import { getStats, getBookings } from '../api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [s, b] = await Promise.all([getStats(), getBookings()])
        if (!cancelled) {
          setStats(s)
          setRecent(b.slice(0, 5))
        }
      } catch (e) {
        if (!cancelled) setError(e.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const safeStats = stats || {
    totalRooms: 0,
    availableRooms: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
  }

  const bookingDistribution = useMemo(() => {
    const confirmed = safeStats.confirmedBookings || 0
    const pending = safeStats.pendingBookings || 0
    const cancelled = Math.max(0, safeStats.totalBookings - confirmed - pending)
    const total = confirmed + pending + cancelled || 1
    return {
      confirmed,
      pending,
      cancelled,
      confirmedPct: Math.round((confirmed / total) * 100),
      pendingPct: Math.round((pending / total) * 100),
      cancelledPct: Math.round((cancelled / total) * 100),
    }
  }, [safeStats])

  if (loading) return <div className="page-title">Loading...</div>
  if (error) return <div className="page-title" style={{ color: 'var(--danger)' }}>{error}</div>

  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      {/* Top summary cards */}
      <div className="dashboard-kpi-row">
        <div className="dashboard-kpi-card kpi-earnings">
          <div className="kpi-label">All Earnings</div>
          <div className="kpi-value">
            ${ (safeStats.totalBookings * 120).toLocaleString() }
          </div>
          <div className="kpi-footer">10% change on profit</div>
        </div>
        <div className="dashboard-kpi-card kpi-tasks">
          <div className="kpi-label">Pending Bookings</div>
          <div className="kpi-value">{safeStats.pendingBookings}</div>
          <div className="kpi-footer">Follow up pending guests</div>
        </div>
        <div className="dashboard-kpi-card kpi-views">
          <div className="kpi-label">Available Rooms</div>
          <div className="kpi-value">{safeStats.availableRooms} / {safeStats.totalRooms}</div>
          <div className="kpi-footer">Live room availability</div>
        </div>
        <div className="dashboard-kpi-card kpi-downloads">
          <div className="kpi-label">Total Bookings</div>
          <div className="kpi-value">{safeStats.totalBookings}</div>
          <div className="kpi-footer">All-time reservations</div>
        </div>
      </div>

      {/* Main dashboard row: fake chart + donut + traffic */}
      <div className="dashboard-main-row">
        <div className="dashboard-panel dashboard-panel-wide">
          <div className="dashboard-panel-header">
            <div>
              <div className="panel-title">Sales Per Day</div>
              <div className="panel-subtitle">Last 7 days (simulated)</div>
            </div>
            <div className="panel-indicator positive">+3%</div>
          </div>
          <div className="dashboard-linechart">
            <div className="linechart-curve" />
            <div className="linechart-footer">
              <div>
                <div className="linechart-label">Total Revenue</div>
                <div className="linechart-value">
                  ${ (safeStats.totalBookings * 120).toLocaleString() }
                </div>
              </div>
              <div>
                <div className="linechart-label">Today Bookings</div>
                <div className="linechart-value">
                  {Math.max(1, Math.round(safeStats.totalBookings * 0.05))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-panel dashboard-panel-medium">
          <div className="dashboard-panel-header">
            <div className="panel-title">Booking Status</div>
            <div className="panel-subtitle">Confirmed vs Pending vs Cancelled</div>
          </div>
          <div className="dashboard-donut-wrap">
            <div className="dashboard-donut">
              <div className="donut-center">
                <div className="donut-value">{bookingDistribution.confirmedPct}%</div>
                <div className="donut-label">Confirmed</div>
              </div>
            </div>
            <ul className="donut-legend">
              <li>
                <span className="legend-dot confirmed" />
                Confirmed
                <span className="legend-value">{bookingDistribution.confirmed} ({bookingDistribution.confirmedPct}%)</span>
              </li>
              <li>
                <span className="legend-dot pending" />
                Pending
                <span className="legend-value">{bookingDistribution.pending} ({bookingDistribution.pendingPct}%)</span>
              </li>
              <li>
                <span className="legend-dot cancelled" />
                Cancelled
                <span className="legend-value">{bookingDistribution.cancelled} ({bookingDistribution.cancelledPct}%)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="dashboard-panel dashboard-panel-medium">
          <div className="dashboard-panel-header">
            <div className="panel-title">Traffic Sources</div>
            <div className="panel-subtitle">Where bookings are coming from</div>
          </div>
          <ul className="traffic-list">
            <TrafficItem label="Direct" value={80} />
            <TrafficItem label="Social" value={50} />
            <TrafficItem label="Referral" value={20} />
            <TrafficItem label="OTA / Agents" value={60} />
            <TrafficItem label="Website" value={40} />
          </ul>
        </div>
      </div>

      {/* Recent bookings table */}
      <div className="card dashboard-recent-card">
        <h2 className="dashboard-section-title">Recent Bookings</h2>
        {recent.length === 0 ? (
          <p style={{ color: 'var(--main-muted)' }}>No bookings yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((b) => (
                <tr key={b.id}>
                  <td>{b.guestName}</td>
                  <td>{b.room?.name}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>
                    <span className={`badge ${b.status}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}

function TrafficItem({ label, value }) {
  return (
    <li className="traffic-item">
      <div className="traffic-item-header">
        <span>{label}</span>
        <span className="traffic-value">{value}%</span>
      </div>
      <div className="traffic-bar">
        <div className="traffic-bar-fill" style={{ width: `${value}%` }} />
      </div>
    </li>
  )
}
