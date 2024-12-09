import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CoinInfo from '../components/CoinInfo';
import { CryptoState } from '../CryptoContext';
import { Typography, CircularProgress, Grid } from '@mui/material';
import { numberWithCommas } from '../components/CoinsTable';
import parse from 'html-react-parser';
import axiosInstance from '../config/axios';

const Coinpage = () => {
  const { id } = useParams();
  const { currency, symbol } = CryptoState();

  const coinDetailsAPICall = async (id) => {
    const res = await axiosInstance.get(`/${id}`);
    return res.data; // Return only the data from the response
  };

  const { data: coin, isLoading, isError, error } = useQuery({
    queryKey: ['COIN-DETAILS', id],
    queryFn: () => coinDetailsAPICall(id),
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ textAlign: 'center', paddingTop: '50px' }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <Grid container spacing={4} style={{ width: '100%' }}>
        {/* Coin Details Section */}
        <Grid item xs={12} md={3}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 25,
              borderRight: '2px solid grey',
              padding: 25,
            }}
          >
            <img
              src={coin?.image.large}
              alt={coin?.name}
              height="200"
              style={{ marginBottom: 20 }}
            />
            <Typography variant="h3" style={{ fontWeight: 'bold', marginBottom: 20 }}>
              {coin?.name}
            </Typography>
            <Typography variant="subtitle1" style={{ textAlign: 'justify', padding: 25 }}>
              {parse(coin?.description.en.split('. ')[0])}.
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: '100%',
                padding: 25,
                paddingTop: 10,
              }}
            >
              <span style={{ display: 'flex' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  Rank:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                  {numberWithCommas(coin?.market_cap_rank)}
                </Typography>
              </span>

              <span style={{ display: 'flex' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  Current Price:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                  {symbol}{' '}
                  {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                </Typography>
              </span>

              <span style={{ display: 'flex' }}>
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                  Market Cap:
                </Typography>
                &nbsp; &nbsp;
                <Typography variant="h5" style={{ fontFamily: 'Montserrat' }}>
                  {symbol}{' '}
                  {numberWithCommas(
                    coin?.market_data.market_cap[currency.toLowerCase()]
                      .toString()
                      .slice(0, -6)
                  )}
                  M
                </Typography>
              </span>
            </div>
          </div>
        </Grid>

        {/* Coin Info Section */}
        <Grid item xs={12} md={9}>
          <CoinInfo coin={coin} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Coinpage;
