import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import '../../src/styles/globals.css';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Provider } from 'react-redux';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
