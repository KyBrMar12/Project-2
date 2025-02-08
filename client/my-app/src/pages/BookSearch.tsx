import { useState } from 'react';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/books/search?query=${query}`);
    const data = await response.json();
    setBooks(data.items || []);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-4">Search Books</h2>
      <input className="border p-2" placeholder="Enter book title" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={handleSearch}>Search</button>
      <div className="mt-6">
        {books.map((book: any) => (
          <div key={book.id} className="border p-4 mb-2">
            <h3 className="text-xl">{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
