import React from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [currency, setCurrency] = React.useState("eur");
  //symbol based on current currency
  const [symbol, setSymbol] = React.useState("€");
  //array that hold the users favorite coina
  const [watchlist, setWatchlist] = React.useState([]);
  //number of coins displayed
  const [numberOfCoins, setNumberOfCoins] = React.useState(10);
  //state used to handle conditional rendering based on a possible network error
  const [networkError, setNetworkError] = React.useState(false);

  //sets symbol based on current currency
  React.useEffect(() => {
    if (currency === "eur") setSymbol("€");
    else if (currency === "usd") setSymbol("$");
  }, [currency]);

  //checks for data in local storage, and sets the array of favorite coins with that data
  React.useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    if (storedWatchlist) {
      setWatchlist(storedWatchlist);
    } else setWatchlist([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //updates the data on the local storage every time a coin is added or removed from the watchlist
  React.useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  //function that adds the related coin to the watch list. function used by the star icon in the tablerow component
  function addToWatchlist(newCoin) {
    setWatchlist((prevItems) => [...prevItems, newCoin]);
  }
  //function that remove the related coin from the watch list. function used by the star icon in the tablerow component
  function removeFromWatchlist(newCoin) {
    setWatchlist((preItems) => preItems.filter((coin) => coin !== newCoin));
  }

  //function used by the load more button to increase the number of listed coins
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
        networkError,
        setNetworkError,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
