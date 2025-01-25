import os
from pathlib import Path
import logging

logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s"
)

project_name = "foodstack_ml"

list_of_files = [
    ".github.com/workflows/.gitkeep",
    f"src/{project_name}/__init__.py",
    f"src/{project_name}/components/__init__.py",
    f"src/{project_name}/utils/__init__.py",
    f"src/{project_name}/logging/__init__.py",
    f"src/{project_name}/config/__init__.py",
    f"src/{project_name}/config/config.py",
    f"src/{project_name}/pipeline/__init__.py",
    f"src/{project_name}/constants/__init__.py",
    "main.py",
    "research/trials.ipynb",
]

for filepath in list_of_files:
    filepath = Path(filepath)  # to handle slashes w.r.t. OS
    filedir, filename = os.path.split(filepath)  # get the directory path and filename

    if filedir != "":  # if directory path is not empty
        os.makedirs(filedir, exist_ok=True)
        logging.info(f"Creating directory: {filedir} for the file: {filename}")

    # while creating files
    # if the file does not exist, it will create an empty file
    # if the file exists but the file size is 0, it will create an empty file
    # if the file exists and the file size is not 0, it will not create the file
    if (not os.path.exists(filepath)) or (
        os.path.getsize(filepath) == 0
    ):  # if file does not exist or file size is 0
        with open(filepath, "w") as f:
            pass
            logging.info(f"Creating empty file: {filepath}")
    else:
        logging.info(f"File already exists: {filepath}")
