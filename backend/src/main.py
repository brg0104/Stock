from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text
import pandas as pd
from dotenv import load_dotenv
import os
import sys
from db import execute_query


# parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# sys.path.append(parent_dir)


load_dotenv()

app = FastAPI()

# Allow CORS for localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend's URL
    allow_credentials=True,  # To allow cookies or authentication headers
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}


# Function to fetch latest stock data
def get_latest_stock_data():
    query = """
    SELECT DISTINCT ON ("Stock") *
    FROM stock_data
    ORDER BY "Stock", "Date" DESC;
    """
    try:
        df = execute_query(query)
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/latest-data")
def latest_data():
    """API to fetch the latest stock data."""
    data = get_latest_stock_data()
    if not data:
        raise HTTPException(status_code=404, detail="No data found.")
    return {"latest_data": data}


from datetime import datetime, timedelta
from fastapi import HTTPException

# Function to get date based on the period
def get_date_from_period(period: str):
    today = datetime.now()
    
    if period == "1w":
        return today - timedelta(weeks=1)
    elif period == "1m":
        return today - timedelta(days=30)
    elif period == "6m":
        return today - timedelta(days=180)
    elif period == "1y":
        return today - timedelta(days=365)
    else:
        raise ValueError(f"Invalid period: {period}")

# Function to fetch specific stock data based on period
def get_stock_data(stockname: str, period: str):
    # Get the date range based on the period
    start_date = get_date_from_period(period)
    
    query = """
    SELECT "Date", "Close"
    FROM stock_data
    WHERE "Stock" = :stockname AND "Date" >= :start_date
    ORDER BY "Date" ASC;
    """
    
    try:
        # Pass stockname and start_date as parameters
        df = execute_query(query, {"stockname": stockname, "start_date": start_date})
        return df.to_dict(orient="records")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stock-data/{stockname}")
@app.get("/stock-data/{stockname}/{period}")
def stock_data(stockname: str, period: str = "1y"):
    """API to fetch specific stock data based on period (default: 1y)."""
    data = get_stock_data(stockname, period)
    if not data:
        raise HTTPException(status_code=404, detail=f"No data found for stock: {stockname} in period: {period}.")
    return {"stock_data": data}


