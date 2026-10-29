import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { label: 'Watch', to: '/#week' },
  { label: 'Connect', to: '/connect' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '/#give' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <nav className="navigation" aria-label="Main navigation">
          <Link className="logo" to="/" onClick={() => setMenuOpen(false)}>
            Encounter Ministries
          </Link>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul id="primary-navigation" className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
            {navigation.map(({ label, to }) => (
              <li key={label}>
                {to.includes('#') ? (
                  <Link to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
                ) : (
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => isActive ? 'is-active' : undefined}
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <p>Encounter Ministries<br />645 N Grand, Pullman, WA <span aria-hidden="true">|</span> 509-715-1500</p>
        <div className="footer-links">
          <a href="https://www.facebook.com/EMPalouse/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://www.youtube.com/channel/UCECIy1zJmZWYAqKruTIBB-w/videos" target="_blank" rel="noreferrer">YouTube</a>
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main id="top"><Outlet /></main>
      <SiteFooter />
    </>
  );
}