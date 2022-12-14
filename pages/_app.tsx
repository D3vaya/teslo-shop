import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "../themes";
import { CartProvider, UiProvider } from "../context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <UiProvider>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </SWRConfig>
      </UiProvider>
    </CartProvider>
  );
}

export default MyApp;
