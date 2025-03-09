import '../styles/globals.css';
import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import { ThemeProvider } from '@/context/ThemeContext.tsx';

export const metadata = {
  title: 'My App',
  description: 'A Next.js App Router example',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <main className={'main-container'}>{children}</main>
            </ErrorBoundary>
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
