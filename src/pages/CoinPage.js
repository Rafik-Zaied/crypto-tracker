import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import CoinInformation from "../components/CoinInformation";
import CoinChart from "../components/CoinChart";
import styles from "../css/coinPage.module.css";

export default function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = React.useState();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}`).then((response) => {
      setCoin(response.data);
      setLoading(false);
    });
  }, [id]);

  function display() {
    return loading ? (
      <h2 className={styles.loading}>Loading...</h2>
    ) : (
      <>
        <CoinInformation coin={coin} />
        <CoinChart coin={coin} />
      </>
    );
  }

  return <main>{display()}</main>;
}
