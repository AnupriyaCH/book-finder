import { useState } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import "./index.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/books?title=${query}`);
      setBooks(res.data.books);
    } catch (err) {
      alert("Error fetching books");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>📚 Book Finder</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchBooks()}
        />
        <button onClick={searchBooks}>Search</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="book-grid">
          {books.map((book, i) => (
            <BookCard key={i} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
