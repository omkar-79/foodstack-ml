from sklearn.linear_model import SGDRegressor
from datetime import datetime
import time
import pandas as pd

def initial_prediction(model, preprocessor, X):
    """
    Generate initial predictions based on all combinations of days, hours, and dishes.

    Parameters:
    - model: The trained model (XGBRegressor)
    - preprocessor: The fitted ColumnTransformer for preprocessing
    - X: Original DataFrame to extract unique dishes

    Returns:
    - prediction_data: DataFrame with predictions for all combinations
    """
    # Get unique dishes
    dishes = X['Dish'].unique()
    print(f"Number of unique dishes: {len(dishes)}")

    # Generate all combinations of Day, Hour, and Dish
    prediction_data = []
    for day_of_week in range(7):  # 7 days in a week
        for hour in range(24):  # 24 hours in a day
            for dish in dishes:  # Loop through unique dishes
                prediction_data.append([day_of_week, hour, dish])
    
    # Create DataFrame
    prediction_data = pd.DataFrame(prediction_data, columns=["Day", "Hour", "Dish"])

    # Preprocess the prediction data to match training features
    transformed_data = preprocessor.transform(prediction_data)

    # Make predictions
    prediction_data["Predicted Amount"] = model.predict(transformed_data)

    print("\nInitial Predictions:")
    return prediction_data


# Main function for data ingestion and transformation

def main():
    # Connect to MongoDB
    collection = connect_to_mongo(mongo_uri, database_name, collection_name)

    # Fetch all data from MongoDB
    fetched_data = fetch_all_data_from_mongo(collection)
    print(f"Fetched Data:\n{fetched_data.head()}")

    # Transform the data
    print("\nDividing Data into Features and Target...")
    X, y = divide_data(fetched_data, target_column="Amount")

    print("\nPreprocessing Feature Data...")
    processed_X, preprocessor = preprocess_data(X)

    model = SGDRegressor(max_iter=1000, tol=1e-3, learning_rate="adaptive")

    # Train the model
    model.fit(processed_X, y)
    print(processed_X.shape)
    print("Initial model training complete.")

    dishes = X['Dish'].unique()
    print(len(dishes))

    # Generate predictions
    predicted_df = initial_prediction(model, preprocessor, X)
    print("\nInitial Predictions:")
    print(predicted_df)

    # # Connect to MongoDB for sending data
    collection_pred = connect_to_mongo(mongo_uri, database_name, collection_name_send)

    # # Insert the predicted DataFrame into MongoDB
    insert_dataframe_to_mongo(collection_pred, predicted_df)
    print("Predicted data sent.")

    return model

if __name__ == "__main__":
    model  = main()


def update_model(model_partial_fit, today_data):
    """
    Update the model using new data from today and adjust predictions in the predicted_data MongoDB collection.

    Parameters:
    - model_partial_fit: The partially trained model (e.g., SGDRegressor with partial_fit)
    - today_data: DataFrame containing today's data
    - preprocessor: Fitted ColumnTransformer for preprocessing

    Returns:
    - model_partial_fit: Updated model
    """
    # Step 1: Connect to the predicted_data collection
    predicted_data_collection = connect_to_mongo(mongo_uri, database_name, collection_name_send)

    # Step 2: Prepare today's data for training
    X_today = today_data[["Day", "Hour", "Dish"]]
    y_today = today_data["Amount"]

    # Preprocess data before partial fitting
    X_today_preprocessed, preprocessor = preprocess_data(X_today)

    # Perform partial fit (online learning)
    model_partial_fit.partial_fit(X_today_preprocessed, y_today)
    print("Model updated with today's data.")

    # Predict the amounts for today's data
    today_data["Predicted Amount"] = model_partial_fit.predict(X_today_preprocessed)

    day_mapping = {
    "Monday": 0,
    "Tuesday": 1,
    "Wednesday": 2,
    "Thursday": 3,
    "Friday": 4,
    "Saturday": 5,
    "Sunday": 6
    }
    today_data = today_data.copy()  # Avoid modifying the original DataFrame
    today_data["Day"] = today_data["Day"].map(day_mapping)

    # Step 3: Update MongoDB with new predictions
    for _, row in today_data.iterrows():
        day_of_week = row["Day"]
        hour = row["Hour"]
        dish = row["Dish"]
        predicted_amount = row["Predicted Amount"]

        # Update the corresponding document in MongoDB
        result = predicted_data_collection.update_one(
            {"Day": day_of_week, "Hour": hour, "Dish": dish},  # Match criteria
            {"$set": {"Predicted Amount": predicted_amount}}  # Update the predicted amount
        )

        # Optional: Print update status
        if result.matched_count > 0:
            print(f"Updated Predicted Amount for Day: {day_of_week}, Hour: {hour}, Dish: {dish}")
        else:
            print(f"No matching document found for Day: {day_of_week}, Hour: {hour}, Dish: {dish}")

    print("MongoDB predictions updated for the current day.")
    return model_partial_fit


while True:
    current_time = datetime.now()

    # Check if it's 11:55 PM
    if current_time.hour == 5 and current_time.minute == 46:
        print(f"\n[{current_time}] Fetching today's data for model update...")

        # Fetch today's data from MongoDB (actual data for the current date)
        collection = connect_to_mongo(mongo_uri, database_name, collection_name)
        today_data = fetch_current_date_data(collection)

        if not today_data.empty:
            print("Today's data fetched successfully. Updating the model...")

            # Update the model and predictions using today's data
            model= update_model(model, today_data)

            print("Model updated and predictions stored for the day.")

        else:
            print("No new data available for today. Skipping update.")

        # Wait for the next day
        time.sleep(86400)  # Sleep for 24 hours
    else:
        # Sleep for a minute and recheck
        time.sleep(60)

if _name_ == "_main_":
    continuous_training_pipeline()