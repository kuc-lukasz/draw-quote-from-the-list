import { useState } from "react";
import { useEffect } from "react";

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quotes, setQuotes] = useState("");

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuotes(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    console.log(quotes);

    const random = quotes[Math.floor(Math.random() * quotes.length) + 1];
    const lastQuote = [];
    return (
      <div>
        <ul>
          <li>{JSON.stringify(random)}</li>
        </ul>
        <button
          onClick={() => {
            console.log();
          }}
        >
          Poprzedni cytat
        </button>
        <button
          onClick={() => {
            window.location.reload(false);

            // setQuotes(quotes.reload(true));
            // console.log(setQuotes());
          }}
        >
          Losuj
        </button>
      </div>
    );
  }
}

export default MyComponent;
