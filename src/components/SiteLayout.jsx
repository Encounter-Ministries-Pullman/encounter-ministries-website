import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { CONTAINER_CLASSES } from '../constants';
import { CHURCH_CONTACT } from '../constants/site';

const NAV_LIST_CLASSES = {
  open: 'm-0 flex list-none items-center gap-[1.3rem] p-0 max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-stretch max-[820px]:gap-0 max-[820px]:pb-4',
  closed: 'm-0 flex list-none items-center gap-[1.3rem] p-0 max-[820px]:hidden max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-stretch max-[820px]:gap-0 max-[820px]:pb-4',
};
const NAV_LINK_CLASSES = {
  active: 'text-[0.95rem] font-medium text-sea-ink no-underline hover:text-sea-ink max-[820px]:block max-[820px]:py-[0.55rem]',
  inactive: 'text-[0.95rem] font-medium text-brand no-underline hover:text-sea-ink max-[820px]:block max-[820px]:py-[0.55rem]',
};

const navigation = [
  { label: 'Watch', to: '/#week' },
  { label: 'Connect', to: '/connect' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '/#give' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-[5] max-[820px]:relative max-[820px]:bg-surface-soft">
      <div className={CONTAINER_CLASSES}>
        <nav className="flex min-h-[76px] items-center justify-between gap-4 max-[820px]:min-h-[70px] max-[820px]:flex-wrap" aria-label="Main navigation">
          <Link className="font-display text-[1.4rem] font-semibold text-brand no-underline max-[520px]:text-[1.2rem]" to="/" onClick={() => setMenuOpen(false)}>
            Encounter Ministries
          </Link>
          <button
            className="hidden h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-md border border-line bg-transparent max-[820px]:flex"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="h-0.5 w-[19px] bg-brand" />
            <span className="h-0.5 w-[19px] bg-brand" />
            <span className="h-0.5 w-[19px] bg-brand" />
          </button>
          <ul id="primary-navigation" className={NAV_LIST_CLASSES[menuOpen ? 'open' : 'closed']}>
            {navigation.map(({ label, to }) => (
              <li key={label}>
                {to.includes('#') ? (
                  <Link to={to} onClick={() => setMenuOpen(false)}>{label}</Link>
                ) : (
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) => NAV_LINK_CLASSES[isActive ? 'active' : 'inactive']}
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
    <footer className="bg-brand-deep py-10 text-[0.95rem] text-paper-muted">
      <div className="relative mx-auto flex w-[calc(100%-3rem)] max-w-265 flex-wrap justify-between gap-8 max-[820px]:w-[calc(100%-2rem)] max-[520px]:flex-col max-[520px]:gap-4">
        <p className="m-0">{CHURCH_CONTACT.name}<br />{CHURCH_CONTACT.address}, {CHURCH_CONTACT.city}, {CHURCH_CONTACT.state} <span aria-hidden="true">|</span> {CHURCH_CONTACT.phone}</p>
        <div className="flex gap-4">
          <a className="text-paper" href="https://www.facebook.com/EMPalouse/" target="_blank" rel="noreferrer">Facebook</a>
          <a className="text-paper" href="https://www.youtube.com/channel/UCECIy1zJmZWYAqKruTIBB-w/videos" target="_blank" rel="noreferrer">YouTube</a>
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