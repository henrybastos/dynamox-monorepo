import './global.css';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import ReduxProvider from '../components/ReduxProvider';
import NextAuthProvider from '../components/NextAuthProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dynamox Monitoring System',
  description: 'Industrial monitoring and telemetry dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ReduxProvider>
            <ThemeRegistry>
              {children}
            </ThemeRegistry>
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
