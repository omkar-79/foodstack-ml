'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Container, Paper, Grid, Text, Group, Title as MantineTitle, Select, SegmentedControl } from '@mantine/core';
import { IconCash, IconChartBar, IconUsers, IconShoppingBag } from '@tabler/icons-react';
import DishSelector from '@/components/DishSelector';
import WeeklyChart from '@/components/WeeklyChart';
import DailyDishList from '@/components/DailyDishList';
import HourlyChart from '@/components/HourlyChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtitle?: string;
}

// Stats card component
const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, subtitle = '' }) => (
  <motion.div {...fadeInUp}>
    <Paper shadow="sm" radius="md" p="md" withBorder>
      <Group>
        <div 
          style={{ 
            color,
            backgroundColor: `${color}15`,
            padding: '12px',
            borderRadius: '50%'
          }}
        >
          {icon}
        </div>
        <div>
          <Text size="sm" c="dimmed">
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value}
          </Text>
          {subtitle && (
            <Text size="xs" c="dimmed">
              {subtitle}
            </Text>
          )}
        </div>
      </Group>
    </Paper>
  </motion.div>
);

export default function Home() {
  const [selectedDish, setSelectedDish] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [showHourlyChart, setShowHourlyChart] = useState(false);
  const [selectedDishForHourly, setSelectedDishForHourly] = useState('');
  const [timeFrame, setTimeFrame] = useState('day');

  // Mock revenue data - replace with actual data
  const revenueData = {
    day: { value: '$2,456', orders: 145 },
    week: { value: '$15,789', orders: 834 },
    month: { value: '$45,235', orders: 2567 }
  };

  return (
    <Container size="xl" py="xl" className="mt-16">
      <AnimatePresence mode="wait">
        <motion.div 
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Group justify="space-between" className="mb-8">
            <MantineTitle order={1} c="#211C84">
              Restaurant Sales Dashboard
            </MantineTitle>
            <SegmentedControl
              value={timeFrame}
              onChange={setTimeFrame}
              data={[
                { label: 'Day', value: 'day' },
                { label: 'Week', value: 'week' },
                { label: 'Month', value: 'month' },
              ]}
              color="#211C84"
            />
          </Group>

          {/* Stats Cards */}
          <Grid className="mb-8">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <StatsCard
                title={`${timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}ly Revenue`}
                value={revenueData[timeFrame].value}
                icon={<IconCash size={24} />}
                color="#211C84"
                subtitle={`${new Date().toLocaleDateString()}`}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <StatsCard
                title={`Total Orders (${timeFrame})`}
                value={revenueData[timeFrame].orders}
                icon={<IconShoppingBag size={24} />}
                color="#7A73D1"
                subtitle={`Avg ${Math.round(revenueData[timeFrame].orders / (timeFrame === 'day' ? 24 : timeFrame === 'week' ? 7 : 30))} orders/${timeFrame === 'day' ? 'hour' : timeFrame === 'week' ? 'day' : 'day'}`}
              />
            </Grid.Col>
          </Grid>

          {/* Weekly Prediction Section */}
          <Paper shadow="sm" radius="md" p="xl" className="mb-8">
            <MantineTitle order={2} c="#211C84" className="mb-4">
              Weekly Sales Prediction
            </MantineTitle>
            <DishSelector 
              selectedDish={selectedDish} 
              onSelectDish={setSelectedDish} 
            />
            {selectedDish && <WeeklyChart dishName={selectedDish} />}
          </Paper>

          {/* Daily Analysis Section */}
          <Paper shadow="sm" radius="md" p="xl">
            <MantineTitle order={2} c="#211C84" className="mb-4">
              Daily Sales Analysis
            </MantineTitle>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="mb-4 p-2 border rounded-md"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            
            <DailyDishList 
              day={selectedDay} 
              onDishClick={(dish) => {
                setSelectedDishForHourly(dish);
                setShowHourlyChart(true);
              }}
            />
          </Paper>

          {/* Hourly Chart Modal */}
          {showHourlyChart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4"
              >
                <Group justify="space-between" className="mb-4">
                  <MantineTitle order={3}>Hourly Sales - {selectedDishForHourly}</MantineTitle>
                  <button 
                    onClick={() => setShowHourlyChart(false)}
                    className="text-gray-500 hover:text-[#211C84]"
                  >
                    ×
                  </button>
                </Group>
                <HourlyChart 
                  dish={selectedDishForHourly} 
                  day={selectedDay} 
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
