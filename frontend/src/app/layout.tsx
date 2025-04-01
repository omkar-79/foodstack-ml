'use client';

import { MantineProvider, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import Navigation from '@/components/Navigation';

const theme = createTheme({
  primaryColor: 'indigo',
  colors: {
    primary: [
      '#F0EFFF',
      '#E1E0FF',
      '#C3C1FF',
      '#A5A2FF',
      '#8784FF',
      '#6A66FF',
      '#211C84', // [6] Primary
      '#1A166A',
      '#131050',
      '#0C0B37'
    ],
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <Navigation>
            {children}
          </Navigation>
        </MantineProvider>
      </body>
    </html>
  );
}
