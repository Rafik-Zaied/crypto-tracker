import React from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [currency, setCurrency] = React.useState("eur");
  const [symbol, setSymbol] = React.useState("€");
  const [watchlist, setWatchlist] = React.useState([]);
  const [numberOfCoins, setNumberOfCoins] = React.useState(10);

  React.useEffect(() => {
    if (currency === "eur") setSymbol("€");
    else if (currency === "usd") setSymbol("$");
  }, [currency]);

  React.useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (storedWatchlist) {
      setWatchlist(storedWatchlist);
    } else setWatchlist([]);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(newCoin) {
    setWatchlist((prevItems) => [...prevItems, newCoin]);
  }

  function removeFromWatchlist(newCoin) {
    setWatchlist((preItems) => preItems.filter((coin) => coin !== newCoin));
  }

  function loadMoreCoins() {
    setNumberOfCoins((prevValue) => prevValue + 10);
  }
  return (
    <Context.Provider
      value={{
        currency,
        setCurrency,
        symbol,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        numberOfCoins,
        loadMoreCoins,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
