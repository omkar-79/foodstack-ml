import pandas as pd
from pymongo import MongoClient

# Load the CSV file
csv_file = "./data/mongodb_est_data.csv"  # Replace with the path to your CSV file
data = pd.read_csv(csv_file)

# MongoDB Atlas connection string
MONGO_URI = "mongodb+srv://omkar:admin@cluster1.l7x2q.mongodb.net/?retryWrites=true&w=majority&appName=cluster1"  # Replace with your MongoDB connection string

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client["foodstack"]  # Replace with your database name
collection = db["actual_data"]  # Replace with your collection name

# Convert DataFrame to a list of dictionaries
data_dict = data.to_dict(orient="records")

# Insert data into the collection
result = collection.insert_many(data_dict)

print(f"Inserted {len(result.inserted_ids)} documents into the collection.")
