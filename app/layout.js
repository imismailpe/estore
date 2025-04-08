"use client"
import { SessionProvider } from "next-auth/react";
import { HeaderComp } from "../components/header";
import StoreProvider from "../redux/StoreProvider";
import "../styles/globals.css";

export default function RootLayout({ Component, pageProps, children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <StoreProvider>
            <header>
              <HeaderComp />
            </header>
            <main>{children}</main>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
