
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./config/query-client";
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from "@tanstack/react-query";
import "./style/global.css";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import theme from "./services/theme";
import createEmotionCache from "./services/createEmotionCache";
import RequestInterceptor from "./config/RequestInterceptor";
import ResponseInterceptor from "./config/ResponseInterceptor";

const clientSideEmotionCache = createEmotionCache();


export default function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <CacheProvider value={clientSideEmotionCache}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            maxSnack={5}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
          >
            <RequestInterceptor />
            <ResponseInterceptor />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            <CssBaseline />
            <Toaster />
            <Outlet />
            <Meta />
            <Links />
            <ScrollRestoration />
            <Scripts />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}