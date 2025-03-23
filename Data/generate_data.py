import random
import pandas as pd
from datetime import datetime, timedelta

# List of popular restaurant dishes
dishes = [
    'Spaghetti Bolognese', 'Caesar Salad', 'Margherita Pizza', 'Chicken Curry',
    'Grilled Salmon', 'Beef Burger', 'Vegan Wrap', 'Eggplant Parmesan', 'Pasta Primavera', 'Chicken Alfredo'
]

# Generate a date range for 3 months
start_date = datetime(2024, 12, 1)
end_date = start_date + timedelta(days=90)  # 3 months
dates = pd.date_range(start_date, end_date)

# Function to get the day of the week
def get_day_of_week(date):
    return date.strftime('%A')

# Simulate restaurant order trends for each hour
def get_order_quantity(hour, day_of_week):
    if hour < 9 or hour >= 21:  # Restaurant is closed outside of 9 AM to 9 PM
        return 0
    elif 11 <= hour < 14:  # Peak lunch time (more orders)
        return random.randint(5, 20)
    elif 18 <= hour < 21:  # Peak dinner time (more orders)
        return random.randint(8, 25)
    else:
        return random.randint(1, 8)  # Off-peak hours (lesser orders)

# Generate the data
data = []

for date in dates:
    day_of_week = get_day_of_week(date)
    
    for hour in range(24):  # For each hour of the day
        for dish in dishes:
            quantity = get_order_quantity(hour, day_of_week)
            data.append([date.date(), day_of_week, dish, hour, quantity])

# Convert to DataFrame for easy manipulation
df = pd.DataFrame(data, columns=['Date', 'Day of Week', 'Dish Name', 'Hour', 'Quantity'])

# Save to CSV (you can adjust the file path)
df.to_csv('restaurant_sales_data.csv', index=False)

print("Dataset has been generated and saved as 'restaurant_sales_data.csv'.")
