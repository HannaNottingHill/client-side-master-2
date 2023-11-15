import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";

function ProfileView({
  user,
  movies,
  favorites,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const favoriteMovies = movies.filter((movie) =>
    favorites.includes(movie._id)
  );
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data from the /users endpoint
    if (user) {
      fetch(`http://localhost:8080/users/${user.username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [user]);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Birthday: {userData.birthday}</p>
          {/* You can display more user information as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

      <h3>Favorites</h3>
      {favoriteMovies.length > 0 ? (
        <div>
          {favoriteMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <p>No favorites added.</p>
      )}
    </div>
  );
}

export default ProfileView;
