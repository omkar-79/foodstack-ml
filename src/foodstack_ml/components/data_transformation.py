from foodstack_ml.logging import logger
from abc import ABC, abstractmethod
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from typing import Union


class DataStrategy(ABC):
    """
    An abstract base class for data strategies.
    """

    @abstractmethod
    def handle_data(self, data: pd.DataFrame) -> Union[pd.DataFrame, pd.Series]:
        """
        Abstract method to handle the data.
        """
        pass


class DataDivideStrategy(DataStrategy):
    """
    Data dividing strategy which divides the data into train features and targert features.
    Dynamically identifies feature and target columns.
    """

    def handle_data(self, data: pd.DataFrame) -> Union[pd.DataFrame, pd.Series]:
        """
        Divides the data into X and y.
        """
        try:
            target_column = "Amount Ordered"
            feature_columns = [col for col in data.columns if col != target_column]
            X = data[feature_columns]
            y = data[target_column]
            logger.info("Dataset divided into train and test data successfully")
            return X, y
        except Exception as e:
            logger.error("Error in Data Division: ", e)
            raise e


class DataPreprocessStrategy(DataStrategy):
    """
    Data preprocessing strategy which preprocesses the data.
    """

    def handle_data(self, data: pd.DataFrame) -> Union[pd.DataFrame, pd.Series]:
        """
        Preprocesses the data.
        """
        try:

            # Initialize OneHotEncoder
            encoder = OneHotEncoder()  # Drop first to avoid multicollinearity

            # One-hot encode 'Day of the Week'
            day_encoded = pd.DataFrame(
                encoder.fit_transform(data[["Day of the Week"]]),
                columns=encoder.get_feature_names_out(["Day of the Week"]),
            )

            # One-hot encode 'Hour'
            hour_encoded = pd.DataFrame(
                encoder.fit_transform(data[["Hour"]]),
                columns=encoder.get_feature_names_out(["Hour"]),
            )

            # One-hot encode 'Dish Name'
            dish_encoded = pd.DataFrame(
                encoder.fit_transform(data[["Dish Name"]]),
                columns=encoder.get_feature_names_out(["Dish Name"]),
            )

            # Combine encoded features with the original data (dropping encoded columns)
            processed_data = pd.concat(
                [day_encoded, hour_encoded, dish_encoded], axis=1
            )

            # Log success
            logger.info("Data Preprocessing completed successfully")

            # Return processed features and target
            return processed_data

        except Exception as e:
            logger.error("Error in Data Preprocessing: ", e)
            raise e


class DataTransformation:
    """
    Central class that delegates data handling to a specific strategy.
    """

    def __init__(self, data: pd.DataFrame, strategy: DataStrategy) -> None:
        """Initializes the DataCleaning class with a specific strategy."""
        self.df = data
        self.strategy = strategy

    def handle_data(self) -> Union[pd.DataFrame, pd.Series]:
        """Handle data based on the provided strategy"""
        return self.strategy.handle_data(self.df)
