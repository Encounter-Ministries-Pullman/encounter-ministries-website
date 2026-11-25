'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CONTAINER_CLASSES } from '../constants';
import { ActionLink } from './ContentBlocks';

const NAV_LIST_CLASSES = 'm-0 flex list-none items-center gap-[1.3rem] p-0 max-[820px]:w-full max-[820px]:flex-col max-[820px]:items-end max-[820px]:gap-2';

type NavigationItem =
  | { label: string; kind: 'internal'; to: string }
  | { label: string; kind: 'external'; href: string };

const navigation: NavigationItem[] = [
  { label: 'Watch', kind: 'internal', to: '/#week' },
  { label: 'Connect', kind: 'internal', to: '/connect' },
  { label: 'About', kind: 'internal', to: '/about' },
  { label: 'Give', kind: 'external', href: 'https://www.easytithe.com/encounterpullman' },
];

export function PageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-4 z-[5] max-[820px]:relative max-[820px]:top-0 max-[820px]:bg-surface-soft max-[820px]:pt-4">
      <div className={CONTAINER_CLASSES}>
        <nav className="flex min-h-[76px] items-center justify-between gap-4 max-[820px]:min-h-[70px] max-[820px]:flex-wrap max-[820px]:gap-y-0 max-[820px]:content-center" aria-label="Main navigation">
          <Link className="font-display text-[1.4rem] font-semibold text-brand no-underline max-[520px]:text-[1.2rem]" href="/" onClick={() => setMenuOpen(false)}>
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
            {navigation.map((item) => (
              <li key={item.label}>
                {item.kind === 'external' ? (
                  <ActionLink
                    href={item.href}
                    variant="accent"
                    onClick={() => setMenuOpen(false)}
                    target="_blank"
                    rel="noreferrer"
                  >{item.label}</ActionLink>
                ) : (
                  <ActionLink
                    to={item.to}
                    variant="accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
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
