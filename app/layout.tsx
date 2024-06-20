import './globals.css';
import { Inter } from 'next/font/google';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import ThemeProvider from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { siteConfig } from '@/site-config';

const inter = Inter({ subsets: ['latin'] });

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const session = await auth();
  //console.log('SESSION FROM LAYOUT', session);
  const themeColor = siteConfig.themeColor;

  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme={themeColor}
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
