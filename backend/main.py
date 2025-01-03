from fastapi import FastAPI
from mexc_sdk import Spot
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

# from pprint import pprint

app = FastAPI()
spot_client = Spot()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello Arash"}


symbols = [
    'BTCUSDT',
    'ETHUSDT',
    'SOLUSDT',
    'XRPUSDT',
    'ADAUSDT',
    'DOGEUSDT',
    'DOTUSDT',
    'LTCUSDT',
    'BNBUSDT',
    'ATOMUSDT',
]


@app.get("/prices")
async def get_prices(symbols_list: str = None):
    if symbols_list:
        symbols_list = symbols_list.split(',')
    else:
        symbols_list = symbols

    results = {}
    try:
        all_tickers = spot_client.ticker_price()
        # pprint(all_tickers)
        filtered_tickers = [ticker for ticker in all_tickers if ticker['symbol'] in symbols_list]
        # pprint(filtered_tickers)

        for ticker in filtered_tickers:
            symbol = ticker['symbol']
            index = symbols.index(symbol)
            current_price = float(ticker['price'])

            # Get klines for calculations
            klines = spot_client.klines(symbol=symbol, interval='60m')
            close_prices = [float(kline[4]) for kline in klines]

            # Calculate MAs
            ma_20 = np.mean(close_prices[-20:])
            ma_50 = np.mean(close_prices[-50:])
            ma_100 = np.mean(close_prices[-100:])
            ma_200 = np.mean(close_prices[-200:])

            # Calculate 24h high/low from existing klines
            high_24h = max([float(kline[2]) for kline in klines[-24:]])
            low_24h = min([float(kline[3]) for kline in klines[-24:]])

            # Calculate 1-week high/low (approx. using 168 hours) from existing klines
            high_1w = max([float(kline[2]) for kline in klines[-168:]])
            low_1w = min([float(kline[3]) for kline in klines[-168:]])

            precision = len(str(current_price).split('.')[1])

            results[index] = {
                "symbol": symbol,
                "current_price": current_price,
                "ma_20": round(ma_20, precision),
                "ma_50": round(ma_50, precision),
                "ma_100": round(ma_100, precision),
                "ma_200": round(ma_200, precision),
                "high_24h": round(high_24h, precision),
                "low_24h": round(low_24h, precision),
                "high_1w": round(high_1w, precision),
                "low_1w": round(low_1w, precision)
            }

    except Exception as e:
        results["error"] = str(e)  # Return error for the entire request

    return results
