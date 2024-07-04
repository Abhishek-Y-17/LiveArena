import {
  ClerkProvider,

} from '@clerk/nextjs'
import {Toaster} from 'sonner'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { dark } from '@clerk/themes';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme:dark }}>
    <html lang='en'>
      <body>
        <ThemeProvider
          attribute='class'
          forcedTheme='dark'
          storageKey='gamehub-theme'
        >
          <Toaster theme='light' position='bottom-center' />
           {children}
        </ThemeProvider>
          
      </body>
    </html>
  </ClerkProvider>
      
  );
}
