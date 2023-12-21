import Head from '@emedic/lib/components/head';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {Suspense} from 'react';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Toaster} from 'sonner';
import AppRouter from './router';
import {persistor, store} from './store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <Head title="Vendor">
        <meta content="Vendor | Emedic" key="title" property="og:title" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Suspense
            fallback={
              <div className="w-full h-full flex justify-center items-center">
                <p>LOADING</p>
              </div>
            }
          >
            <QueryClientProvider client={queryClient}>
              <AppRouter />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Suspense>
        </PersistGate>
        <Toaster expand={false} position="bottom-right" richColors />
      </Provider>
    </HelmetProvider>
  );
}

export default App;
