import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { PageFooter } from '../components/PageFooter';
import { PageHeader } from '../components/PageHeader';
import '../styles.css';

export const metadata: Metadata = {
	title: {
		default: 'Encounter Ministries | A church family in Pullman, Washington',
		template: '%s | Encounter Ministries, Pullman WA',
	},
	description: 'Encounter Ministries is a non-denominational, Spirit-filled church at 645 N Grand in Pullman, WA. Sundays at 10:00 AM.',
};

export const viewport: Viewport = {
	themeColor: '#d6e4e0',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
			</head>
			<body>
				<PageHeader />
				<main id="top">{children}</main>
				<PageFooter />
			</body>
		</html>
	);
}
import '../styles.css'