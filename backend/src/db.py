import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
import pandas as pd

load_dotenv()

# Database connection details
def get_db_config():
    return {
        "host": os.getenv("host"),
        "port": os.getenv("port"),
        "database": os.getenv("database"),
        "user": os.getenv("user"),
        "password": os.getenv("password")
    }


def create_db_engine():
    db_config = get_db_config()
    return create_engine(
        f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
    )


# # Function to execute a query and return data as a DataFrame
# def execute_query(query: str):
#     engine = create_db_engine()
#     with engine.connect() as connection:
#         return pd.read_sql_query(text(query), connection)
    

# Function to execute a query and return data as a DataFrame
def execute_query(query: str, params: dict = None):
    engine = create_db_engine()
    with engine.connect() as connection:
        if params:
            return pd.read_sql_query(text(query), connection, params=params)
        else:
            return pd.read_sql_query(text(query), connection)

