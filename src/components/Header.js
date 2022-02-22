import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context";
import styles from "../css/header.module.css";

export default function Header() {
  const [selectedCurrency, setSelectedCurrency] = React.useState("eur");

  const { setCurrency, watchlist } = React.useContext(Context);

  function handleChange(event) {
    setSelectedCurrency(event.target.value);
    setCurrency(event.target.value);
  }

  function starIcon() {
    return watchlist.length ? <i className="star fa-solid fa-star"></i> : <i className="star fa-regular fa-star"></i>;
  }

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        <h3>Crypto Tracker</h3>
      </Link>
      <div className={styles.col}>
        <Link to="/watchlist" className={styles.link}>
          {starIcon()}
        </Link>
        <select value={selectedCurrency} onChange={handleChange} className={styles.select}>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
        </select>
      </div>
    </header>
  );
}
