import '../styles/globals.css';
import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary.tsx';

export const metadata = {
  title: 'My App',
  description: 'A Next.js App Router example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ErrorBoundary>
            <main className={'main-container'}>{children}</main>
          </ErrorBoundary>
        </StoreProvider>
      </body>
    </html>
  );
}
