import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // Import MovieCard component
import { Row, Col } from "react-bootstrap";

const ProfileView = ({ user, movies, onUserUpdate, onUserDeregister }) => {
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(user.email);
  const [newDOB, setNewDOB] = useState(user.birthdate);

  // Handle user information update
  const handleUserUpdate = () => {
    // Send a request to the server to update user information
    // Update user information in the state using onUserUpdate
  };

  // Handle user deregistration
  const handleUserDeregister = () => {
    // Send a request to the server to delete the user's account
    // Redirect to the login page or handle further actions
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
          .filter((movie) => user.favoriteMovies.includes(movie._id))
          .map((favoriteMovie) => (
            <Col className="mb-4" key={favoriteMovie._id} md={3}>
              <MovieCard movie={favoriteMovie} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ProfileView;
