import os
import sys
import logging
from datetime import datetime

logging_str = "[%(asctime)s: %(levelname)s: %(filename)s: %(module)s: %(message)s]"
log_dir = "logs"
# Add a timestamp to the log file name
log_filename = f"{datetime.now().strftime('%Y-%m-%dT%H-%M-%S')}.log"
log_filepath = os.path.join(log_dir, log_filename)
os.makedirs(log_dir, exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format=logging_str,
    handlers=[logging.FileHandler(log_filepath), logging.StreamHandler(sys.stdout)],
)

# logger object will be used to log messages and import in other modules
logger = logging.getLogger("FoodStackLogger")
