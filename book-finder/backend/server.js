const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/books", async (req, res) => {
  const { title } = req.query;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );
    const books = response.data.docs.slice(0, 10).map((book) => ({
      title: book.title,
      author: book.author_name ? book.author_name.join(", ") : "Unknown",
      year: book.first_publish_year,
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
    }));

    res.json({ books });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
