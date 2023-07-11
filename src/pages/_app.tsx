import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { store } from '@/store';

import '@/styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 600000,
      refetchInterval: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onError(error: AxiosError) {
        toast.error(`에러가 발생했습니다. ${error.message}`);
      },
    },
    mutations: {
      retry: 0,
      onError(error: AxiosError) {
        toast.error(`에러가 발생했습니다. ${error.message}`);
      },
    },
  },
});

const App = ({ Component, pageProps, }: AppProps) => (
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <Head>
          <meta charSet='UTF-8' />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
          />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </QueryClientProvider>
  </>
);

export default App;
