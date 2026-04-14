import { useState } from 'react';
import useOrderStore from '../store/useOrderStore';

const ORDER_FILTERS = ['all', 'tote', 'clutch', 'pending', 'confirmed', 'completed'];
const DATE_FILTERS = ['all time', 'today', 'last 7 days'];

/**
 * Admin dashboard component.
 * Displays order stats and a premium order management table.
 * @returns {JSX.Element} Dashboard layout with filters and table.
 */
export default function Dashboard() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [orderFilter, setOrderFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all time');

  /**
   * Computes dashboard stat card values.
   * @returns {{title: string, value: number, color: string}[]} Stat card data.
   */
  const getStats = () => [
    { title: 'Total Orders', value: orders.length, color: 'text-sacimak-primary' },
    { title: 'Pending', value: orders.filter((order) => order.status === 'pending').length, color: 'text-yellow-700' },
    { title: 'Confirmed', value: orders.filter((order) => order.status === 'confirmed').length, color: 'text-cyan-700' },
    { title: 'Completed', value: orders.filter((order) => order.status === 'completed').length, color: 'text-emerald-700' },
  ];

  /**
   * Checks if order timestamp matches selected date filter.
   * @param {string} timestamp - ISO order timestamp.
   * @returns {boolean} True when order should be included.
   */
  const matchesDateFilter = (timestamp) => {
    if (dateFilter === 'all time') return true;
    const createdAt = new Date(timestamp).getTime();
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    return dateFilter === 'today' ? now - createdAt <= day : now - createdAt <= 7 * day;
  };

  /**
   * Returns filtered orders for current filter controls.
   * @returns {Array<Object>} Visible orders.
   */
  const getFilteredOrders = () =>
    orders.filter((order) => {
      const matchesOrderType =
        orderFilter === 'all' ||
        (orderFilter === 'tote' && order.bagType === 'tote') ||
        (orderFilter === 'clutch' && order.bagType === 'clutch') ||
        order.status === orderFilter;
      return matchesOrderType && matchesDateFilter(order.timestamp);
    });

  /**
   * Formats order timestamp for table display.
   * @param {string} timestamp - ISO timestamp.
   * @returns {string} Formatted human-readable date.
   */
  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  /**
   * Resolves classes for status selector.
   * @param {'pending' | 'confirmed' | 'completed'} status - Order status.
   * @returns {string} Tailwind classes for status style.
   */
  const getStatusStyle = (status) =>
    ({
      pending: 'border-yellow-600/35 bg-yellow-100 text-yellow-800',
      confirmed: 'border-cyan-600/35 bg-cyan-100 text-cyan-800',
      completed: 'border-emerald-600/35 bg-emerald-100 text-emerald-800',
    })[status] || 'border-stone-300 bg-white text-sacimak-variant';

  const stats = getStats();
  const filteredOrders = getFilteredOrders();

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-2xl border border-stone-200 bg-white/80 p-5 shadow-[0_14px_28px_rgba(28,27,27,0.08)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">{stat.title}</p>
            <p className={`mt-2 text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </article>
        ))}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white/80 p-4 shadow-[0_14px_28px_rgba(28,27,27,0.08)]">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Bag / Status</p>
            <div className="flex flex-wrap gap-2">
              {ORDER_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setOrderFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    orderFilter === filter
                      ? 'bg-gradient-to-r from-sacimak-primary to-sacimak-primary-container text-white'
                      : 'border border-stone-300 bg-white text-sacimak-variant hover:border-sacimak-secondary/60'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-variant">Date</p>
            <div className="flex flex-wrap gap-2">
              {DATE_FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setDateFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                    dateFilter === filter
                      ? 'bg-gradient-to-r from-sacimak-secondary to-cyan-500 text-white'
                      : 'border border-stone-300 bg-white text-sacimak-variant hover:border-sacimak-secondary/60'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white/80 shadow-[0_14px_28px_rgba(28,27,27,0.08)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-sm">
            <thead className="border-b border-stone-200 bg-stone-100/80">
              <tr className="text-left text-xs uppercase tracking-[0.15em] text-sacimak-variant">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Bag Type</th>
                <th className="px-5 py-4">Configuration</th>
                <th className="px-5 py-4">Qty</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-5 py-14 text-center text-sacimak-variant">
                    No matching orders found yet.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="bg-white/50 transition hover:bg-white">
                    <td className="px-5 py-4 font-mono text-xs text-sacimak-variant">{order.id}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-sacimak-on-surface">{order.customerName}</p>
                      <p className="text-xs text-sacimak-variant">{order.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-sacimak-primary/30 bg-sacimak-primary/10 px-3 py-1 text-xs font-semibold uppercase text-sacimak-primary">
                        {order.bagType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sacimak-variant">
                      {order.bagType === 'tote' ? (
                        <span className="inline-flex items-center gap-2">
                          <span
                            className="h-4 w-4 rounded-full border border-stone-300"
                            style={{ backgroundColor: order.config.sequinColor }}
                          />
                          {order.config.sequinStyle}
                        </span>
                      ) : (
                        <span className="capitalize">{order.config.frameColor} frame</span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-semibold text-sacimak-on-surface">{order.quantity}</td>
                    <td className="px-5 py-4 text-xs text-sacimak-variant">{formatDate(order.timestamp)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide outline-none ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
