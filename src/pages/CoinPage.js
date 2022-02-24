import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import CoinInformation from "../components/CoinInformation";
import CoinChart from "../components/CoinChart";
import { Context } from "../Context";
import styles from "../css/coinPage.module.css";

export default function CoinPage() {
  //id of the current coin
  const { id } = useParams();
  const [coin, setCoin] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const { networkError, setNetworkError } = React.useContext(Context);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCoin(response.data);
        setLoading(false);
        setNetworkError(false);
      })
      .catch((error) => setNetworkError(true));
  }, [id, setNetworkError]);

  function display() {
    if (networkError) {
      return <h2 className={styles.alert}>Network Error, we can't retrieve the informations at the moment :(</h2>;
    } else if (loading) {
      return <h2 className={styles.alert}>Loading...</h2>;
    } else {
      return (
        <>
          <CoinInformation coin={coin} />
          <CoinChart coin={coin} />
        </>
      );
    }
  }

  return <main>{display()}</main>;
}
