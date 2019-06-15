import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const App = props => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("reacthooks");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchData();
  };

  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <h1 className="text-grey-darkest font-thin">Hooks News</h1>
      <form className="mb-2" onSubmit={handleSubmit}>
        <input
          value={query}
          type="text"
          onChange={event => setQuery(event.target.value)}
          ref={searchInputRef}
          className="border p-1 rounded"
        />
        <button className="bg-orange rounded m-1 p-1" type="submit">
          Search
        </button>
        <button
          className="bg-teal text-white p-1 rounded"
          type="button"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <p className="font-bold text-orange-dark">Loading...</p>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                className="text-indigo-dark hover:text-indigo-darkest"
                href={result.url}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && <div className="text-red font-bold">{error.message}</div>}
    </div>
  );
};

export default App;
