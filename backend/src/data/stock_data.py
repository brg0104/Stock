import yfinance as yf
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# List of stock symbols
stocks = os.getenv('stocks').split(',')

def get_stock_data(stocks):
    all_stock_data=[]
    for stock in stocks:
        ticker = yf.Ticker(stock)
        stock_df = ticker.history(period="1y")  # Fetch one-day data
        stock_df['Stock'] = stock  # Add a column for stock symbol
        all_stock_data.append(stock_df)

    # Combine all stock data into a single DataFrame
    combined_df = pd.concat(all_stock_data)


    # Reset the index to make 'Date' a column
    combined_df = combined_df.reset_index()

    return combined_df


def get_data():
    df = get_stock_data(stocks)

    df = df[['Date', 'Open', 'High', 'Low', 'Close', 'Volume', 'Stock']]

    # Round the price columns to 2 decimal places
    price_columns = ['Open', 'High', 'Low', 'Close']
    df[price_columns] = df[price_columns].round(2) 

    return df 

 


# print(df)

df = get_data()

df.to_csv('stock-data.csv', index=False)  # Save to CSV file 


    