import React from "react";
import { Context } from "../Context";
import Table from "../components/Table";
import LoadMoreButton from "../components/LoadMoreButton";
import styles from "../css/homepage.module.css";

import axios from "axios";

export default function Homepage() {
  const { currency, numberOfCoins } = React.useContext(Context);
  const [coinList, setCoinList] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCoinList(response.data);
        setLoading(false);
      });
  }, [currency]);

  return (
    <main>
      <section className={styles.header}>
        <h1>Crypto Tracker</h1>
        <h3>Get the main infos regarding your favorite crypto currencies or search for a specific one</h3>
        <input
          placeholder="Search!"
          className={styles.searchbar}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </section>
      {loading ? (
        <h2 className={styles.loading}>Loading...</h2>
      ) : (
        <>
          <Table coinList={coinList} userInput={userInput} numberOfCoins={numberOfCoins} />
          <LoadMoreButton />
        </>
      )}
    </main>
  );
}
