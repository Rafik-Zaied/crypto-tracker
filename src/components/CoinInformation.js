import React from "react";
import parse from "html-react-parser";
import { Context } from "../Context";
import styles from "../css/coinPage.module.css";

export default function CoinInformation({ coin }) {
  const { currency, symbol } = React.useContext(Context);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (!coin) return "";
  return (
    <div className={styles.coinInformation}>
      <div className={styles.coinInformation_title}>
        <img className={styles.coinInformation_title_img} src={coin.image.large} alt="coin-logo" />
        <h1>{coin.name}</h1>
      </div>
      <p>{parse(coin.description.en.split(". ")[0])}.</p>
      <h2>Rank: {coin.market_cap_rank}</h2>
      <h2>
        Current Price: {numberWithCommas(coin.market_data.current_price[currency].toFixed(2))} {symbol}
      </h2>
      <h2>Market Cap: {numberWithCommas(coin.market_data.market_cap[currency].toString().slice(0, -6))}M</h2>
    </div>
  );
}
