import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CONTAINER_CLASSES } from '../constants';
import { ActionLink } from './ContentBlocks.jsx';

const NAV_LIST_CLASSES = 'm-0 flex list-none items-center gap-[1.3rem] p-0 max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-end max-[820px]:gap-2';

const navigation = [
  { label: 'Watch', to: '/#week' },
  { label: 'Connect', to: '/connect' },
  { label: 'About', to: '/about' },
  { label: 'Give', to: '', href: 'https://www.easytithe.com/encounterpullman' },
];

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-4 z-[5] max-[820px]:relative max-[820px]:top-0 max-[820px]:bg-surface-soft max-[820px]:pt-4">
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
                  <ActionLink
                    href={href}
                    variant="accent"
                    onClick={() => setMenuOpen(false)}
                    target="_blank"
                    rel="noreferrer"
                  >{label}</ActionLink>
                ) : (
                  <ActionLink
                    to={to}
                    navLink
                    variant="accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </ActionLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
