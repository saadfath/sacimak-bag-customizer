import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
];

/**
 * Navigation bar component
 * Displays brand name and navigation links
 */
export default function Navbar() {
  const location = useLocation();

  /**
   * Checks if route is active
   * @param {string} path - Route path to check
   * @returns {boolean} True if current route matches path
   */
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-sacimak-surface/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group">
          <p className="font-serif text-3xl font-black text-sacimak-primary transition group-hover:text-sacimak-secondary">
            SACIMAK
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-sacimak-variant">
            Digital Atelier
          </p>
        </Link>

        <div className="flex items-center gap-2 rounded-full border border-stone-300 bg-white/85 p-1 shadow-sm">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(item.to)
                  ? 'bg-gradient-to-r from-sacimak-primary to-sacimak-primary-container text-white shadow-[0_10px_26px_rgba(164,60,18,0.25)]'
                  : 'text-sacimak-variant hover:bg-stone-100 hover:text-sacimak-primary'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
