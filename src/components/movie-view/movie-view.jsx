import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId);

  console.log("movieId:", movieId); // Check if the movieId is correct.
  console.log("movies:", movies); // Check the contents of the movies array.

  if (!movie) {
    // Handle the case where the movie is not found.
    return <div>Movie not found</div>;
  }

  console.log("movie title:", movie.title); // Corrected to access movie.title
  console.log("movie director:", movie.director.name); // Corrected to access movie.director.name

  return (
    <div className="movie-view-container">
      <div>
        <img className="movie-image" src={movie.imagePath} />
      </div>
      <div className="movie-details">
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.name}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
