import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("react hooks");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, [""]);

  const getResults = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(response.data.hits);
      console.log(response.data.hits);
    } catch (err) {
      setErr(err);
    }

    setLoading(false);
  };

  const handleSetQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getResults();
  };

  const handleClearQuery = () => {
    setQuery("");
    searchInputRef.current.focus();
  };

  return (
    <div className="container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded">
      <h1 className="text-grey-darkest font-thin">Ketan's Hooks News</h1>

      <form onSubmit={handleFormSubmit} className="mb-2">
        <input
          type="text"
          value={query}
          onChange={handleSetQuery}
          ref={searchInputRef}
          className="border p-1 rounded m-2"
        />
        <button
          className="bg-teal text-white p-1 rounded"
          type="button"
          onClick={handleClearQuery}
        >
          Clear
        </button>
      </form>
      {loading ? (
        <h1 className="font-bold text-orange-dark">Loading Results ...</h1>
      ) : (
        <ul className="list-reset leading-normal">
          {results.map((result) => (
            <li key={result.objectID}>
              <a
                className="text-indigo-dark gover:text-indigo-darkest"
                href={result.url}
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {err && <div className="text-red font-bold">{err.message}</div>}
    </div>
  );
}
