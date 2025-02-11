import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  buyLink: string;
  image: string;
  title: string;
  author: string;
}

const Home_API = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        console.log("📌 Fetching NYT Best Sellers...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/books/nyt-bestsellers`
        );
        console.log("📚 Books Fetched:", response.data);
        setBooks(response.data);
      } catch (error) {
        console.error("❌ Error fetching bestsellers:", error);
      }
    };
    fetchBestSellers();
  }, []);

  return (
    <div className="bg-[#B99976] text-center p-10">
      <h2 className="text-4xl font-bold mb-6">Top NYT Best Sellers</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {books.length > 0 ? (
          books.map((book, index) => (
            <a
              key={index}
              href={book.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-white p-4 rounded-lg shadow-lg w-[200px] transition-transform transform hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[250px] object-cover border border-black rounded-md"
              />
              <h3 className="text-md font-bold mt-4">{book.title}</h3>
              <p className="text-sm text-gray-300">By {book.author}</p>
              <p className="text-xs mt-2">Click to buy on Amazon</p>
            </a>
          ))
        ) : (
          <p className="text-lg">Loading best sellers...</p>
        )}
      </div>
    </div>
  );
};

export default Home_API;
