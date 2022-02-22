import axios from "axios";
import React from "react";
import { Line } from "react-chartjs-2";
import { Context } from "../Context";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import SelectButton from "./SelectButton";

export default function CoinChart({ coin }) {
  const [chartData, setChartData] = React.useState();
  const [days, setDays] = React.useState(1);
  const { currency } = React.useContext(Context);
  const chartDays = [
    {
      label: "24 Hours",
      value: 1,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "3 Months",
      value: 90,
    },
    {
      label: "1 Year",
      value: 365,
    },
  ];

  React.useEffect(() => {
    coin &&
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=${currency}&days=${days}`)
        .then((response) => {
          setChartData(response.data.prices);
        });
  }, [days]);

  return (
    <div>
      {!chartData ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div>
            <Line
              data={{
                labels: chartData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: chartData.map((coin) => coin[1]),
                    label: `Price in ${currency.toUpperCase()}, Past ${days} Days`,
                    borderColor: "#2b41a1",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </div>
          <div>
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
  );
}
