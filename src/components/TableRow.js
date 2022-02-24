import React from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import styles from "../css/table.module.css";

export default function TableRow({ coin }) {
  const { symbol, addToWatchlist, removeFromWatchlist, watchlist } = React.useContext(Context);
  const [isFavorited, setIsFavorited] = React.useState(false);
  const navigate = useNavigate();

  function checkPresence(arr, val) {
    return arr.some((arrVal) => val === arrVal);
  }
  //checks if the coin is present inside the watchlist, displays the empty or filled coin based on the result of the
  //checkPresence function
  React.useEffect(() => {
    checkPresence(watchlist, coin.id) ? setIsFavorited(true) : setIsFavorited(false);
  }, [watchlist, coin.id]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //switches the isFavorite state, used to display the star icon based one the presence inside the watchlist
  //adds or removes the coin from the watchlist based on the current state
  function handleStarIconClick() {
    if (isFavorited) {
      setIsFavorited(false);
      removeFromWatchlist(coin.id);
    } else {
      setIsFavorited(true);
      addToWatchlist(coin.id);
    }
  }

  function starIcon() {
    return isFavorited ? (
      <i onClick={handleStarIconClick} className="star fa-solid fa-star"></i>
    ) : (
      <i onClick={handleStarIconClick} className="star fa-regular fa-star"></i>
    );
  }

  function currentPriceColor() {
    return coin.price_change_percentage_24h > 0 ? "green" : "red";
  }

  return (
    <tr key={coin.id}>
      <td className={styles.table_star}>
        <div className={styles.table_star_display}>
          {coin.market_cap_rank}
          {starIcon()}
        </div>
      </td>
      <td className={styles.table_coin}>
        <div className={styles.table_coin_display} onClick={() => navigate(`/coin/${coin.id}`)}>
          <img className={styles.table_coin_img} src={coin.image} alt={coin.name} />
          <span className={styles.table_coin_name}>{coin.name}</span>
          <span className={styles.table_coin_shorthand}>{coin.symbol}</span>
        </div>
      </td>
      <td>
        <p>
          {coin.current_price > 1
            ? numberWithCommas(coin.current_price.toFixed(2))
            : numberWithCommas(coin.current_price.toFixed(3))}
          {symbol}
        </p>
      </td>
      <td style={{ color: currentPriceColor() }}>{coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td>{numberWithCommas(coin.market_cap.toString().slice(0, -6))}M</td>
    </tr>
  );
}
