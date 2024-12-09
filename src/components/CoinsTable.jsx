import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import axiosInstance from '../config/axios';
import { endPoints } from '../config/endpoints';
import { useQuery } from '@tanstack/react-query';
import { Container, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();
  const [search, setSearch] = useState("");
const [page, setPage] = useState(1);
const navigate = useNavigate();


  const fetchCoins = async (currency) => {
    const res = await axiosInstance.get(`${endPoints.crypto.CoinList}=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
    return res.data; // Return only the data from the response
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['COINS-LIST', currency], // Add currency as part of queryKey
    queryFn: () => fetchCoins(currency), // Fetch function with currency
  });
  console.log(data, 'Fetched Coin List');

//   const handleSearch = () => {
//     if (!data) return [];
//     return data.filter(
//       (coin) =>
//         coin.name.toLowerCase().includes(search) ||
//         coin.symbol.toLowerCase().includes(search)
//     );
//   };

const handleSearch = () => {
    if (!data || !Array.isArray(data)) return [];
    return data.filter(
        (coin) =>
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
};

    const paginatedData = handleSearch().slice((page - 1) * 10, page * 10);
    const totalPages = Math.ceil(handleSearch().length / 10);

    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [handleSearch, page, totalPages]);


  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer component={Paper}>
          {isLoading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        style={{
                            backgroundColor: "#16171a",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#131111",
                            },
                            fontFamily: "Montserrat",
                        }}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        {/* <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        /> */}
        <Pagination
    count={totalPages}
    page={page}
    onChange={(_, value) => setPage(value)}
    style={{
        padding: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }}
/>
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable