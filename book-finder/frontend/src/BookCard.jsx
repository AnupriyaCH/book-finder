function BookCard({ book }) {
  return (
    <div className="book-card">
      {book.cover ? (
        <img src={book.cover} alt={book.title} />
      ) : (
        <div className="no-cover">No Cover</div>
      )}
      <h3>{book.title}</h3>
      <p>👤 {book.author}</p>
      <p>📅 {book.year || "Unknown"}</p>
    </div>
  );
}

export default BookCard;
