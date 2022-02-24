import React from "react";
import styles from "../css/table.module.css";
import TableRow from "./TableRow";

export default function Table({ coinList, userInput, numberOfCoins }) {
  function tableHeader() {
    return ["#", "Coin", "Price", "24h%", "Market Cap"].map((element) => <th key={element}>{element}</th>);
  }

  //returns only the coins that contains in the name or the shorthand characters typed in the text input
  function search() {
    return coinList.filter(
      (coin) => coin.name.toLowerCase().includes(userInput) || coin.symbol.toLowerCase().includes(userInput)
    );
  }

  //creates the table body returning a table row component that displays the coin information, the coins displayed
  //are only the one returned by the search function
  function tableBody() {
    return search().map((coin, index) => <TableRow key={coin.id} coin={coin} index={index} />);
  }

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead>
          <tr>{tableHeader()}</tr>
        </thead>
        {/*display the coins in the array from the index 0 to the current value of cumberOfCoins*/}
        <tbody>{tableBody().slice(0, numberOfCoins)}</tbody>
      </table>
    </div>
  );
}
