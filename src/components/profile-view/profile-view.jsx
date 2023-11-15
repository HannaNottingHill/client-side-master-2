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

  // Initialize state variables for form fields
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBirthday, setEditBirthday] = useState("");

  // Populate form fields with user data when available
  useEffect(() => {
    if (userData) {
      setEditUsername(userData.username);
      setEditEmail(userData.email);
      setEditBirthday(userData.birthday);
    }
  }, [userData]);

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

  const handleProfileUpdate = (e) => {
    e.preventDefault(); // Prevent default form submission
    fetch(`http://localhost:8080/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        username: editUsername,
        password: editPassword, // Handle empty password appropriately
        email: editEmail,
        birthday: editBirthday,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update user data and potentially update local storage or user state
        setUserData(data);
      })
      .catch((error) => console.error("Error updating profile: ", error));
  };

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

      <form onSubmit={handleProfileUpdate}>
        <input
          type="text"
          value={editUsername}
          onChange={(e) => setEditUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password (leave blank to keep current)"
          onChange={(e) => setEditPassword(e.target.value)}
        />
        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
        />
        <input
          type="date"
          value={editBirthday}
          onChange={(e) => setEditBirthday(e.target.value)}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileView;
