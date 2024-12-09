export const endPoints = {
    crypto: {
        CoinList: `/markets?vs_currency`,
        SingleCoin: `/`,
        // HistoricalChart: `/market_chart?vs_currency`,
        TrendingCoins: `/markets?vs_currency`
    }
}

export const HistoricalChart = (id, days = 365, currency) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;