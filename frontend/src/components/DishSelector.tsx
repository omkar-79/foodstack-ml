import { motion } from 'framer-motion';
import { Button, Group } from '@mantine/core';

const dishes = ['Pizza Margherita', 'Burger Classic', 'Pasta Carbonara', 'Caesar Salad', 'Sushi Roll'];

export default function DishSelector({ selectedDish, onSelectDish }) {
  return (
    <Group gap="sm" wrap="wrap" mb="lg">
      {dishes.map((dish) => (
        <motion.div
          key={dish}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant={selectedDish === dish ? 'filled' : 'light'}
            onClick={() => onSelectDish(dish)}
            styles={(theme) => ({
              root: {
                backgroundColor: selectedDish === dish ? '#211C84' : 'rgba(122, 115, 209, 0.1)',
                color: selectedDish === dish ? 'white' : '#211C84',
                '&:hover': {
                  backgroundColor: selectedDish === dish ? '#7A73D1' : 'rgba(122, 115, 209, 0.2)',
                },
              },
            })}
          >
            {dish}
          </Button>
        </motion.div>
      ))}
    </Group>
  );
}