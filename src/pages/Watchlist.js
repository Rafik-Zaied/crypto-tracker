import React from "react";
import { Context } from "../Context";
import axios from "axios";
import styles from "../css/watchlist.module.css";
import Table from "../components/Table";
import LoadMoreButton from "../components/LoadMoreButton";

export default function Watchlist() {
  const { watchlist, currency, numberOfCoins } = React.useContext(Context);
  const [loading, setLoading] = React.useState(false);
  const [coinList, setCoinList] = React.useState([]);
  const [watchlistIsEmpty, setWatchlistIsEmpty] = React.useState(false);

  React.useEffect(() => {
    if (watchlist.length) {
      setWatchlistIsEmpty(false);
      setLoading(true);
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${watchlist}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((response) => {
          setCoinList(response.data);
          setLoading(false);
        });
    } else {
      setWatchlistIsEmpty(true);
    }
  }, [currency, watchlist]);
  console.log(coinList);

  function display() {
    if (loading) {
      return <h2 className={styles.errorMessage}>Loading...</h2>;
    } else if (watchlistIsEmpty === true) {
      return <h2 className={styles.errorMessage}>Watchlist is empty</h2>;
    } else {
      return (
        <>
          <h2>Your favorite coins</h2>
          <Table coinList={coinList} userInput={""} numberOfCoins={numberOfCoins} />
          {watchlist.length > 10 && <LoadMoreButton />}
        </>
      );
    }
  }

  return <main>{display()}</main>;
}
