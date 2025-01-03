# MEXC Trading Data API

This FastAPI application provides real-time trading data for cryptocurrencies on the MEXC exchange.

## Features

* **Real-time Prices:** Get the latest prices for a list of cryptocurrencies.
* **Moving Averages:** Calculate 20, 50, 100, and 200 period moving averages.
* **Highs and Lows:** Get the 24-hour and 1-week high and low prices.
* **Precision Matching:** Calculated values are rounded to match the precision of the current price.

## Endpoints

* **`/prices`:**
    * Get trading data for a list of symbols.
    * **Query Parameter:** `symbols_list` (optional, comma-separated string of symbols)
    * **Example:** `/prices?symbols_list=BTCUSDT,ETHUSDT,SOLUSDT`

## Usage

1. **Clone the repository:** `git clone https://github.com/your-username/your-repo-name.git`
2. **Install dependencies:** `pip install -r requirements.txt`
3. **Run the application:** `uvicorn main:app --reload`

## Supported Symbols

* BTCUSDT
* ETHUSDT
* SOLUSDT
* XRPUSDT
* ADAUSDT
* DOGEUSDT
* MATICUSDT
* DOTUSDT
* LTCUSDT
* BNBUSDT

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is licensed under the MIT License.