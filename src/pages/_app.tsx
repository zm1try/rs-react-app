import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import '../../src/styles/globals.css';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/context/ThemeContext.tsx';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
