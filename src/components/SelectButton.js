import React from "react";
import styles from "../css/coinPage.module.css";

export default function SelectButton({ children, selected, onClick }) {
  const isSelected = selected ? styles.selected : "";

  return (
    <button className={`${styles.coinInformation_button} ${isSelected}`} onClick={onClick}>
      {children}
    </button>
  );
}
