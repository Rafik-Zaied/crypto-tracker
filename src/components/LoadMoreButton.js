import React from "react";

import { Context } from "../Context";
import styles from "../css/loadMoreButton.module.css";

export default function LoadMoreButton() {
  const { loadMoreCoins } = React.useContext(Context);
  return (
    <button className={styles.load_btn} onClick={loadMoreCoins}>
      Load more
    </button>
  );
}
