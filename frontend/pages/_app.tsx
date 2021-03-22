import Head from "next/head";
import nprogress from "nprogress/nprogress.css";
import Router from "next/router";
import NProgress from "nprogress";
import { AppProps } from "next/app";
import { SWRProvider } from "@/utils/setup-swr";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/utils/theme";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <style dangerouslySetInnerHTML={{ __html: nprogress }} />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <SWRProvider>
          <Component {...pageProps} />
        </SWRProvider>
      </ChakraProvider>
    </>
  );
};

export default MyApp;
