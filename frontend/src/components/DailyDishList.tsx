import { motion } from 'framer-motion';
import { Paper, Text, Group, Title } from '@mantine/core';

export default function DailyDishList({ day, onDishClick }) {
  // Replace with actual data fetching
  const dishes = [
    { name: 'Pizza Margherita', sales: 45 },
    { name: 'Burger Classic', sales: 30 },
    { name: 'Pasta Carbonara', sales: 25 },
    { name: 'Caesar Salad', sales: 20 },
    { name: 'Sushi Roll', sales: 15 },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {dishes.map((dish, index) => (
        <motion.div
          key={dish.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Paper
            shadow="sm"
            p="md"
            radius="md"
            onClick={() => onDishClick(dish.name)}
            className="cursor-pointer"
            style={{
              borderLeft: '4px solid #211C84',
              transition: 'all 0.2s ease',
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(122, 115, 209, 0.1)',
              },
            }}
          >
            <Title order={4} c="#211C84" mb={4}>
              {dish.name}
            </Title>
            <Group position="apart">
              <Text size="sm" c="dimmed">
                Total Sales
              </Text>
              <Text size="lg" fw={700} c="#7A73D1">
                {dish.sales}
              </Text>
            </Group>
          </Paper>
        </motion.div>
      ))}
    </div>
  );
}