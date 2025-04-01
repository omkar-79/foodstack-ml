'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TextInput,
  NumberInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Table,
  Text,
  Select,
  LoadingOverlay,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

const dishes = [
  'Pizza Margherita',
  'Burger Classic',
  'Pasta Carbonara',
  'Caesar Salad',
  'Sushi Roll',
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newOrder, setNewOrder] = useState({
    date: '',
    dish: '',
    quantity: '',
    price: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setOrders([...orders, { 
      ...newOrder, 
      id: Date.now(),
      quantity: Number(newOrder.quantity),
      price: Number(newOrder.price)
    }]);
    
    setNewOrder({ date: '', dish: '', quantity: '', price: '' });
    setLoading(false);
  };

  const handleDelete = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const rows = orders.map((order) => (
    <Table.Tr key={order.id} className="hover:bg-gray-50 transition-colors">
      <Table.Td>{new Date(order.date).toLocaleDateString()}</Table.Td>
      <Table.Td>{order.dish}</Table.Td>
      <Table.Td align="right">{order.quantity}</Table.Td>
      <Table.Td align="right">${order.price}</Table.Td>
      <Table.Td align="right">${(order.quantity * order.price).toFixed(2)}</Table.Td>
      <Table.Td>
        <Button
          variant="subtle"
          color="red"
          size="sm"
          onClick={() => handleDelete(order.id)}
        >
          <IconTrash size={16} />
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" className="pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Title order={1} c="#211C84" className="mb-8">
          Orders Management
        </Title>

        <Paper shadow="sm" radius="md" p="xl" className="mb-8" pos="relative">
          <LoadingOverlay 
            visible={loading} 
            zIndex={1000}
            blur={2}
          />
          <Title order={2} c="#211C84" mb="md">
            Add New Order
          </Title>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                type="date"
                label="Date"
                placeholder="Pick a date"
                value={newOrder.date ? new Date(newOrder.date).toISOString().split('T')[0] : ''}
                onChange={(e) => setNewOrder({
                  ...newOrder,
                  date: e.target.value
                })}
                required
                styles={(theme) => ({
                  input: {
                    '&:focus': {
                      borderColor: '#211C84',
                    },
                  },
                })}
              />

              <Select
                label="Dish"
                placeholder="Select dish"
                data={dishes}
                value={newOrder.dish}
                onChange={(value) => setNewOrder({...newOrder, dish: value || ''})}
                searchable
                required
              />

              <NumberInput
                label="Quantity"
                placeholder="Enter quantity"
                value={newOrder.quantity}
                onChange={(value) => setNewOrder({...newOrder, quantity: value || ''})}
                min={1}
                required
              />

              <NumberInput
                label="Price"
                placeholder="Enter price"
                value={newOrder.price}
                onChange={(value) => setNewOrder({...newOrder, price: value || ''})}
                precision={2}
                min={0}
                prefix="$"
                required
              />
            </div>

            <Group justify="flex-end">
              <Button
                type="submit"
                variant="filled"
                styles={(theme) => ({
                  root: {
                    backgroundColor: '#211C84',
                    '&:hover': {
                      backgroundColor: '#7A73D1',
                    },
                  },
                })}
                leftSection={<IconPlus size={16} />}
              >
                Add Order
              </Button>
            </Group>
          </form>
        </Paper>

        <Paper shadow="sm" radius="md" p="xl">
          <Title order={2} c="#211C84" mb="md">
            Orders History
          </Title>

          {orders.length === 0 ? (
            <Text c="dimmed" ta="center" py="xl">
              No orders yet. Add your first order above.
            </Text>
          ) : (
            <Table striped highlightOnHover withTableBorder>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Dish</Table.Th>
                  <Table.Th align="right">Quantity</Table.Th>
                  <Table.Th align="right">Price</Table.Th>
                  <Table.Th align="right">Total</Table.Th>
                  <Table.Th></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
}