import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { CONTAINER_CLASSES } from '../constants';
import { CHURCH_CONTACT } from '../constants/site';

const NAV_LIST_CLASSES = 'm-0 flex list-none items-center gap-[1.3rem] p-0 max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-start max-[820px]:gap-2';
const NAV_BUTTON_CLASSES = 'inline-flex min-h-10 items-center justify-center rounded-md bg-brand px-3 py-2 text-[0.95rem] font-medium text-white no-underline transition-[filter] hover:brightness-110';

const navigation = [
  { label: 'Watch', to: '/#week' },
  { label: 'Connect', to: '/connect' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '', href: 'https://www.easytithe.com/encounterpullman' },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-[5] max-[820px]:relative max-[820px]:bg-surface-soft">
      <div className={CONTAINER_CLASSES}>
        <nav className="flex min-h-[76px] items-center justify-between gap-4 max-[820px]:min-h-[70px] max-[820px]:flex-wrap max-[820px]:gap-y-0 max-[820px]:content-center" aria-label="Main navigation">
          <Link className="font-display text-[1.4rem] font-semibold text-brand no-underline max-[520px]:text-[1.2rem]" to="/" onClick={() => setMenuOpen(false)}>
            <img
              className="block h-[clamp(3rem,5vw,3.5rem)] w-auto max-w-[min(65vw,18rem)] object-contain"
              src="/images/EMLogoTransparent.png"
              alt="Encounter Ministries Logo"
            />
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
          <ul
            id="primary-navigation"
            className={`${NAV_LIST_CLASSES} mobile-navigation`}
            data-open={menuOpen}
          >
            {navigation.map(({ label, to, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    className={NAV_BUTTON_CLASSES}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    target="_blank"
                    rel="noreferrer"
                  >{label}</a>
                ) : (
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={NAV_BUTTON_CLASSES}
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