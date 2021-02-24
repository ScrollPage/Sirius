import Head from 'next/head';
import nprogress from 'nprogress/nprogress.css';
import { SWRConfig } from 'swr';
import NProgress from 'nprogress';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import axios from 'axios';
import App, { AppContext, AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { Router } from 'next/router';
import { createWrapper } from 'next-redux-wrapper';
import { Provider } from 'react-redux';
import Cookie from 'js-cookie';
import store from '@/store/store';
import Alert from '@/components/Alert';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      <DefaultSeo {...SEO} />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <>
        <GlobalStyle />
        <SWRConfig
          value={{
            revalidateOnFocus: false,
            fetcher: (url: string) =>
              axios({
                url: url,
                baseURL: process.env.DB_HOST,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${Cookie.get('token')}`,
                },
              }).then((r) => r.data),
          }}
        >
          <Provider store={store}>
            <ChakraProvider resetCSS theme={theme}>
              <Alert />
              <Component {...pageProps} />
            </ChakraProvider>
          </Provider>
        </SWRConfig>
      </>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    ...(await App.getInitialProps(appContext)),
  };
};

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
  }
  #__next {
    height: 100% !important;
    width: 100%;
    position: relative;
  }
  p {
    margin: 0;
  }
  html {
    box-sizing: border-box;
  }
  body {
    height: 100% !important;
    width: 100%;
    overscroll-behavior: none;
    overflow-x: hidden;
    overflow-y: scroll;
    &.no-scroll {
      overflow-y: hidden;
    }
    &::-webkit-scrollbar {
        width: 5px;
        background-color: #f5f5f5;
        @media (max-width: 575.98px) {
            width: 0px;
        }
    }
    &::-webkit-scrollbar-track {
        height: 90%;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #000;
    }
  }
  #nprogress .bar {
    background: #000 !important;
  }
`;
