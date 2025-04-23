/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { StrictMode } from "react";

import createEmotionCache from "./services/createEmotionCache";
import theme from "./services/theme";

const cache = createEmotionCache();

hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RemixBrowser />
      </ThemeProvider>
    </CacheProvider>
  </StrictMode>
);

