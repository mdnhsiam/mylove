import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@fontsource/cormorant-garamond/400.css';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '@fontsource/cormorant-garamond/700.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/caveat/400.css';

import { AppProvider } from './context/AppContext';
import { AudioProvider } from './context/AudioContext';
import StarField from './components/StarField';
import BonusEffects from './components/BonusEffects';
import NavBar from './components/NavBar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'For Meri Jaan',
  description: 'For Someone Who Changed My Life',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'For Meri Jaan',
    description: 'For Someone Who Changed My Life',
    images: [
      {
        url: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans bg-background text-foreground min-h-screen">
        <AppProvider>
          <AudioProvider>
            <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a1a]">
              <StarField />
              {children}
              <NavBar />
              <BonusEffects />
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    background: 'rgba(26, 11, 46, 0.95)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#fff',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1rem',
                  },
                }}
              />
            </div>
          </AudioProvider>
        </AppProvider>
      </body>
    </html>
  );
}
