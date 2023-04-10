import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

import '@/styles/globals.css';

import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

export const metadata = {
  title: {
    default: 'Examples',
    template: '%s | Examples',
  },
  description: 'Here, examples for react-hook-forms with various libraries are provided.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className="scroll-smooth antialiased motion-reduce:scroll-auto"
      suppressHydrationWarning
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body className={cn('min-h-screen font-sans', inter.variable)}>
          <div className="flex min-h-screen flex-col">
            <div className="container flex-1">{children}</div>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
