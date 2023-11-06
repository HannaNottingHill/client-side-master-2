import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

const ProfileView = ({ user, movies, onUserUpdate, onUserDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState(""); // Password should be empty by default
  const [newEmail, setNewEmail] = useState(user.email);
  const [newDOB, setNewDOB] = useState(user.birthday);

  // Handle user information update
  const handleUserUpdate = async () => {
    const updateUser = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
      birthday: newDOB,
    };

    try {
      // Send a PUT request to update user information
      const response = await axios.put(`/users/${user.username}`, updateUser);

      // If the update is successful, call the onUserUpdate function to update the state
      onUserUpdate(response.data);
      // Reset the password field after a successful update
      setNewPassword("");
    } catch (error) {
      // Handle any errors, such as displaying an error message to the user
      console.error("Error updating user information:", error);
    }
  };

  // Handle user deregistration
  const handleUserDeregister = async () => {
    try {
      // Send a DELETE request to delete the user's account
      await axios.delete(`/users/${user.username}`);

      // After a successful deregistration, you can redirect to the login page or perform further actions
      onUserDeregister();
    } catch (error) {
      // Handle any errors, such as displaying an error message to the user
      console.error("Error deregistering user:", error);
    }
  };

  // Handle adding and removing favorite movies
  const handleFavoriteMovie = (movieId) => {
    // Check if the movie is already in the user's favorite list
    if (user.favorites.includes(movieId)) {
      // Change user.favoriteMovies to user.favorites
      // Remove the movie from the favorites
      const updatedFavorites = user.favorites.filter((id) => id !== movieId);
      updateUserFavorites(updatedFavorites);
    } else {
      // Add the movie to the favorites
      const updatedFavorites = [...user.favorites, movieId];
      updateUserFavorites(updatedFavorites);
    }
  };

  // Update the user's favorite movies
  const updateUserFavorites = async (favorites) => {
    try {
      const updateUser = { favorites }; // Change user.favoriteMovies to favorites
      const response = await axios.put(`/users/${user.username}`, updateUser);
      onUserUpdate(response.data);
    } catch (error) {
      console.error("Error updating user favorites:", error);
    }
  };

  return (
    <div>
      <h2>Profile Information</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input
          type="date"
          value={newDOB}
          onChange={(e) => setNewDOB(e.target.value)}
        />
      </div>
      <button onClick={handleUserUpdate}>Update Information</button>
      <button onClick={handleUserDeregister}>Deregister</button>

      <h2>Favorite Movies</h2>
      <Row>
        {movies
          .filter((movie) => user.favorites.includes(movie._id))
          .map((favoriteMovie) => (
            <Col className="mb-4" key={favoriteMovie._id} md={3}>
              <MovieCard
                movie={favoriteMovie}
                onToggleFavorite={() => handleFavoriteMovie(favoriteMovie._id)}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProfileView;
