import React from "react";
import { Context } from "../Context";
import Table from "../components/Table";
import LoadMoreButton from "../components/LoadMoreButton";
import styles from "../css/homepage.module.css";

import axios from "axios";

export default function Homepage() {
  const { currency, numberOfCoins, networkError, setNetworkError } = React.useContext(Context);
  //array that holds the fetched coins
  const [coinList, setCoinList] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  //fetching coins ordered by market cap, the coins are saved in the coinList array.
  //if it occurs an error networkError it's set to true
  React.useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      )
      .then((response) => {
        setCoinList(response.data);
        setLoading(false);
        setNetworkError(false);
      })
      .catch((error) => setNetworkError(true));
  }, [currency, setNetworkError]);

  //display the table cointaining the fetched coins when the data fetch it's over, if an error occous another message is displayed.
  function display() {
    if (networkError) {
      return <h2 className={styles.alert}>Network Error, we can't retrieve the informations at the moment :(</h2>;
    } else if (loading) {
      <h2 className={styles.alert}>Loading...</h2>;
    } else {
      return (
        <>
          {/*display the table component that recuires an array of coins(objects) the userinput and the number of coins to display */}
          <Table coinList={coinList} userInput={userInput} numberOfCoins={numberOfCoins} />
          <LoadMoreButton />
        </>
      );
    }
  }

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
      {display()}
    </main>
  );
}
