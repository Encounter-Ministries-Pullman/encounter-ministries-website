import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteLayout } from './components/SiteLayout.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ConnectPage } from './pages/ConnectPage.jsx';
import { HomePage } from './pages/HomePage.jsx';

function RouteEffects() {
  const location = useLocation();

  useEffect(() => {
    const pageTitles = {
      '/': 'Encounter Ministries | A church family in Pullman, Washington',
      '/about': 'About | Encounter Ministries, Pullman WA',
      '/connect': 'Get Connected | Encounter Ministries, Pullman WA',
    };
    document.title = pageTitles[location.pathname] ?? pageTitles['/'];

    if (location.hash) {
      requestAnimationFrame(() => {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}