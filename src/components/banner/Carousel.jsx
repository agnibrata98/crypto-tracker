import React from 'react';
import { CryptoState } from '../../CryptoContext';
import { useQuery } from '@tanstack/react-query'; 
import axiosInstance from '../../config/axios';
import { endPoints } from '../../config/endpoints';
import { Link } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import { numberWithCommas } from '../CoinsTable';

const Carousel = () => {
  const { currency, symbol } = CryptoState(); // Fetch currency from context

  const getCoinList = async (currency) => {
    const res = await axiosInstance.get(
      `${endPoints.crypto.TrendingCoins}=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
    );
    return res.data; // Return only the data from the response
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['TRENDING-COINS', currency], // Add currency as part of queryKey
    queryFn: () => getCoinList(currency), // Fetch function with currency
  });

  if (isLoading) return <div>Loading...</div>; // Display loading state
  if (isError) return <div>Error: {error.message}</div>; // Display error state

//   console.log(data, 'Fetched Coin List');

  const items = data.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link style={{display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer", textTransform: "uppercase", color: "white",}} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
        <div style={{ height: "50%", display: "flex", alignItems: "center",}}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={800}
                animationDuration={500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    );
};

export default Carousel;
