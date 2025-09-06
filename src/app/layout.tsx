import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TISZA adó kalkulátor',
  description: 'Számítsa ki az SZJA változásokat a TISZA javaslat alapján',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body>{children}</body>
    </html>
  );
}