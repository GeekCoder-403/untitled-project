
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
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

const clientSideEmotionCache = createEmotionCache();


export default function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />
        <Outlet />
        <Meta />
        <Links />
        <ScrollRestoration />
        <Scripts />
      </ThemeProvider>
    </CacheProvider>
  );
}