import React from "react";

import { Context } from "../Context";
import styles from "../css/loadMoreButton.module.css";

export default function LoadMoreButton() {
  //on click changes the value of the loadMoreCoins state, that determins the number of coins displayed
  const { loadMoreCoins } = React.useContext(Context);
  return (
    <button className={styles.load_btn} onClick={loadMoreCoins}>
      Load more
    </button>
  );
}
