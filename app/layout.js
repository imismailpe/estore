import { HeaderComp } from '../components/header';
import '../styles/globals.css';

export default function RootLayout({Component, pageProps, children}) {
  return <html lang="en">
    <body>
      <header><HeaderComp /></header>
      <main>{children}</main>
    </body>
  </html>
};
export const metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}