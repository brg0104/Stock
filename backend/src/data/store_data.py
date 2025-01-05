import sys
import os
import pandas as pd
from sqlalchemy import create_engine
from dotenv import load_dotenv
from stock_data import get_data


df = get_data()

load_dotenv()

# Get the absolute path of the parent directory
# parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# sys.path.append(parent_dir)

# Now you can import from the 'data' module


# Database connection details
db_config = {
    "host": os.getenv('host'),
    "port": os.getenv('port'),
    "database": os.getenv('database'),
    "user": os.getenv('user'),
    "password": os.getenv('password')
}


import pandas as pd

def store_df_to_postgres(df, db_config, table_name='stock_data', if_exists='replace'):
    """
    Store a pandas DataFrame to PostgreSQL database using SQLAlchemy
    
    Parameters:
    -----------
    df : pandas.DataFrame
        The DataFrame to store
    db_config : dict
        Dictionary containing database connection details
    table_name : str
        Name of the table to create/update
    if_exists : str
        How to behave if the table already exists
        - 'fail': Raise a ValueError
        - 'replace': Drop the table before inserting new values
        - 'append': Insert new values to the existing table
    """
    try:
        # Create the connection string
        connection_string = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
        
        # Create SQLAlchemy engine
        engine = create_engine(connection_string)
        
        # Store DataFrame to PostgreSQL
        df.to_sql(
            name=table_name,
            con=engine,
            index=False,  # Don't store the index
            if_exists=if_exists,
            schema='public'  # Default schema
        )
        
        print(f"Successfully stored DataFrame to {table_name} table")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    
    finally:
        # Close the engine connection
        if 'engine' in locals():
            engine.dispose()

# Using your existing configuration and DataFrame
try:
    store_df_to_postgres(
        df=df,
        db_config=db_config,
        table_name='stock_data',  # You can change this to your preferred table name
        if_exists='replace'  # Change to 'append' if you want to add to existing table
    )
except Exception as e:
    print(f"Failed to store DataFrame: {str(e)}")