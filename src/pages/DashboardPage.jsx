import Dashboard from '../components/Dashboard';

/**
 * Dashboard page component
 * Admin view for managing orders
 */
export default function DashboardPage() {
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[250px_1fr]">
        <aside className="hidden rounded-[28px] border border-stone-200 bg-white/80 p-5 shadow-[0_20px_40px_rgba(28,27,27,0.08)] lg:block">
          <p className="font-serif text-2xl font-bold text-sacimak-primary">Atelier</p>
          <p className="mt-2 text-sm text-sacimak-variant">Order management and production flow.</p>
          <div className="mt-6 space-y-2 text-sm font-semibold">
            <p className="rounded-xl bg-sacimak-primary/10 px-3 py-2 text-sacimak-primary">Orders</p>
            <p className="rounded-xl px-3 py-2 text-sacimak-variant">Inventory</p>
            <p className="rounded-xl px-3 py-2 text-sacimak-variant">Settings</p>
          </div>
        </aside>

        <div>
          <header className="mb-6 rounded-[28px] border border-stone-200 bg-white/80 p-6 shadow-[0_20px_40px_rgba(28,27,27,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sacimak-secondary">SACIMAK Back Office</p>
            <h1 className="mt-3 font-serif text-4xl text-sacimak-on-surface">Admin Dashboard</h1>
            <p className="mt-2 text-sacimak-variant">
              Track incoming custom orders, material choices, and status transitions.
            </p>
          </header>

          <div className="rounded-[28px] border border-stone-200 bg-sacimak-container/60 p-4 shadow-[0_20px_40px_rgba(28,27,27,0.08)] sm:p-6">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}
