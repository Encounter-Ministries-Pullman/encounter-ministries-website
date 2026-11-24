import { Outlet } from 'react-router-dom';
import { PageFooter } from './PageFooter.jsx';
import { PageHeader } from './PageHeader.jsx';

export function SiteLayout() {
  return (
    <>
      <PageHeader />
      <main id="top"><Outlet /></main>
      <PageFooter />
    </>
  );
}