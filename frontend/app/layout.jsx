import { Cinzel, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata = {
  title: 'OlimpoHub - Greek Mythology Explorer',
  description: 'Explore the gods, myths, and temples of ancient Greek mythology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
