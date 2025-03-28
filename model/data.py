from pymongo import MongoClient
from datetime import datetime
import pandas as pd
import pandas as pd
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer


# Connect to MongoDB
def connect_to_mongo(uri, db_name, collection_name):
    """
    Connect to MongoDB and return a collection object.
    """
    client = MongoClient(uri)
    db = client[db_name]
    collection = db[collection_name]
    print(f"Connected to MongoDB collection: {collection_name}")
    return collection

# Fetch all data from MongoDB
def fetch_all_data_from_mongo(collection):
    """
    Fetch all historical data from MongoDB up to the current date.
    """

    # Query all documents
    cursor = collection.find()
    data = pd.DataFrame(list(cursor))
    
    # Convert the 'Date' field from string to datetime
    data['Date'] = pd.to_datetime(data['Date'])
    
    # Filter rows where the 'Date' is before the current date
    filtered_data = data[data['Date'] < datetime.now()]
    return filtered_data

def fetch_current_date_data(collection):
    """
    Fetch only the data for the current date from MongoDB.

    Parameters:
    - collection: MongoDB collection object

    Returns:
    - current_date_data: Pandas DataFrame containing data for the current date
    """
    # Query all documents
    cursor = collection.find()
    data = pd.DataFrame(list(cursor))
    
    # Safeguard: Check if the 'Date' column exists
    if 'Date' in data.columns:
        # Convert the 'Date' field from string to datetime
        data['Date'] = pd.to_datetime(data['Date'], errors='coerce')  # Handle invalid dates gracefully

        # Get today's date in YYYY-MM-DD format
        today = datetime.now().date()

        # Filter rows where the 'Date' matches today's date
        current_date_data = data[data['Date'].dt.date == today]
    else:
        print("Warning: 'Date' column not found in the fetched data.")
        current_date_data = pd.DataFrame()  # Return an empty DataFrame if 'Date' column is missing

    return current_date_data

def insert_dataframe_to_mongo(collection, dataframe):
    data_dict = dataframe.to_dict("records")  # Convert DataFrame to list of dictionaries
    collection.insert_many(data_dict)        # Insert into MongoDB