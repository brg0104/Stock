// utils/api.ts

export interface StockData {
    Date: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
    Stock: string;
  } 
  
  export interface LatestDataResponse {
    latest_data: StockData[];
  }

  export interface StockDataResponse {
    stock_data: { Date: string; Close: number }[];
  }
  
  export async function fetchLatestData(): Promise<LatestDataResponse> {
    try {
      const response = await fetch("http://localhost:8000/latest-data");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch latest data:", error);
      throw error;
    }
  }


export async function fetchStockData(
    stockname: string,
    period: string = "1y"
  ): Promise<StockDataResponse> {
    try {
      const response = await fetch(
        `http://localhost:8000/stock-data/${stockname}/${period}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error("Failed to fetch stock data:", error);
      throw error;
    }
  }


  
  