import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'nerészkedők',
  description: 'hogy veri át a Fidesz a magyar polgárokat, miközben a legmagasabb adókat fizetik Európában',
  keywords: 'Fidesz, ner, Orbán, Orbán Viktor, adó, hazugság, Tisza, Tisza párt, 2026, választás, több kulcsos adó, tisza adó',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/imgs/nerbendo.ico',
  },
  openGraph: {
    title: 'nerészkedők',
    description: 'hogy veri át a Fidesz a magyar polgárokat, miközben a legmagasabb adókat fizetik Európában',
    type: 'website',
    locale: 'hu_HU',
  },
  twitter: {
    card: 'summary',
    title: 'nerészkedők',
    description: 'hogy veri át a Fidesz a magyar polgárokat, miközben a legmagasabb adókat fizetik Európában',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <head>
        <meta name="author" content="Tisza Párt" />
        <meta name="theme-color" content="#ff6a00" />
        <link rel="canonical" href="https://nereszkedok.hu" />
        <link rel="icon" href="/imgs/nerbendo.ico" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}