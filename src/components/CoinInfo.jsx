import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CircularProgress, createTheme, ThemeProvider, Typography } from "@mui/material";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/endpoints";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";

// Register necessary chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistoricData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
      setHistoricData(data.prices);
      setError(null); // Clear any previous errors
    } catch (error) {
      setError("Error fetching historic data.");
      console.error("Error fetching historic data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricData();
  }, [days, coin.id, currency]); // Added coin.id and currency to dependency list

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // Chart Data Preparation
  const chartData = {
    labels: historicData
      ? historicData.map((coin) => {
          let date = new Date(coin[0]);
          return days === 1 ? date.toLocaleTimeString() : date.toLocaleDateString();
        })
      : [],
    datasets: [
      {
        data: historicData ? historicData.map((coin) => coin[1]) : [],
        label: `Price (Past ${days} Days) in ${currency}`,
        borderColor: "#EEBC1D",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: days === 1 ? "Time" : "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: `Price (${currency})`,
        },
      },
    },
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
        }}
      >
        {loading ? (
          <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          <>
            <Line data={chartData} options={chartOptions} />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
