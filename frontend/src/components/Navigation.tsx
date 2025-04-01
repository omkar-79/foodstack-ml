'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppShell, Container, Group, Button, Title } from '@mantine/core';
import { motion } from 'framer-motion';

export default function Navigation({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AppShell>
      <AppShell.Header className="border-b border-gray-200">
        <Container size="xl" h={60}>
          <Group h="100%" justify="space-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Title order={3} c="#211C84">
                FoodStack
              </Title>
            </motion.div>

            <Group>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link href="/" style={{ textDecoration: 'none' }}>
                  <Button
                    variant={pathname === '/' ? 'filled' : 'subtle'}
                    styles={{
                      root: {
                        backgroundColor: pathname === '/' ? '#211C84' : 'transparent',
                        '&:hover': {
                          backgroundColor: pathname === '/' ? '#7A73D1' : 'rgba(122, 115, 209, 0.1)',
                        },
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link href="/orders" style={{ textDecoration: 'none' }}>
                  <Button
                    variant={pathname === '/orders' ? 'filled' : 'subtle'}
                    styles={{
                      root: {
                        backgroundColor: pathname === '/orders' ? '#211C84' : 'transparent',
                        '&:hover': {
                          backgroundColor: pathname === '/orders' ? '#7A73D1' : 'rgba(122, 115, 209, 0.1)',
                        },
                      },
                    }}
                  >
                    Orders
                  </Button>
                </Link>
              </motion.div>
            </Group>
          </Group>
        </Container>
      </AppShell.Header>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}