import "./profile-view.scss";
import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";

function ProfileView({
  user,
  favoriteMovies,
  onAddFavorite,
  onRemoveFavorite,
  onUserUpdate,
  onUserDeregister,
}) {
  const [userData, setUserData] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editBirthday, setEditBirthday] = useState("");

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/${user.username}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setUserData(data);
      setEditUsername(data.username);
      setEditEmail(data.email);
      setEditBirthday(data.birthday);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      username: editUsername,
      email: editEmail,
      birthday: editBirthday,
    };

    if (editPassword) {
      updatedData.password = editPassword;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/users/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Error in updating profile");
      }

      const data = await response.json();
      setUserData(data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmation) {
      try {
        const response = await fetch(
          `http://localhost:8080/users/${user.username}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.ok) {
          alert("Account deleted successfully");
          onLoggedOut();
        } else {
          // Handle error scenario
          const errorData = await response.json();
          console.error("Error deleting account:", errorData.message);
          alert("Failed to delete account: " + errorData.message);
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="profile-view-container">
      <div className="user-info">
        <h2>User Profile</h2>
        {userData ? (
          <div>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Birthday: {new Date(userData.birthday).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>

      <h3>Favorites</h3>
      <div className="favorites-container">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onAddFavorite={onAddFavorite}
              onRemoveFavorite={onRemoveFavorite}
              isFavorite={true}
            />
          ))
        ) : (
          <p>No favorites added.</p>
        )}
      </div>

      <div className="updateUserAccount">
        <h3>Update Account</h3>
        <form onSubmit={handleProfileUpdate}>
          <input
            type="text"
            placeholder="New Username"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setEditPassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="New Email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <input
            type="date"
            placeholder="Date of Birth"
            value={editBirthday}
            onChange={(e) => setEditBirthday(e.target.value)}
          />
          <button type="submit" className="update-profile-button">
            Update Profile
          </button>
        </form>
        <button
          id="deleteAccountButton"
          className="delete-account-button"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default ProfileView;
