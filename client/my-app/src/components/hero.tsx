import { useEffect, useState } from "react";

const HeroSection = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        console.log("Fetching top books..."); // Debugging step

        const response = await fetch("/api/books/search?query=best+selling");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Books fetched:", data); // Debugging step
        setBooks(data.items || []);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchTopBooks();
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20 rounded-lg p-2">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Share your thoughts! Leave a review and discover what others are saying about your 
        <span className="bg-gradient-to-r from-blue-500 to-blue-800 text-transparent bg-clip-text">
          {" "}
          favorite books!
        </span>
      </h1>

      {/* ✅ Display the list of top books */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-3xl text-center font-bold">Top Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {books.length > 0 ? (
            books.map((book: any) => (
              <div key={book.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold">{book.volumeInfo.title}</h3>
                <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(", ")}</p>
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128"}
                  alt={book.volumeInfo.title}
                  className="mt-2 w-full h-40 object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No books found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
