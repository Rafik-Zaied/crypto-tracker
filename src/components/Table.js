import React from "react";
import styles from "../css/table.module.css";
import TableRow from "./TableRow";

export default function Table({ coinList, userInput, numberOfCoins }) {
  function tableHeader() {
    return ["#", "Coin", "Price", "24h%", "Market Cap"].map((element) => <th key={element}>{element}</th>);
  }

  function search() {
    return coinList.filter(
      (coin) => coin.name.toLowerCase().includes(userInput) || coin.symbol.toLowerCase().includes(userInput)
    );
  }

  function tableBody() {
    return search().map((coin, index) => <TableRow key={coin.id} coin={coin} index={index} />);
  }

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>{tableHeader()}</tr>
        </thead>
        <tbody>{tableBody().slice(0, numberOfCoins)}</tbody>
      </table>
    </div>
  );
}
