import { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-4">Your Favorite Books</h2>
      {favorites.map((fav: any) => (
        <div key={fav.id} className="border p-4 mb-2">
          <h3 className="text-xl">{fav.book.title}</h3>
          <p>{fav.book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
