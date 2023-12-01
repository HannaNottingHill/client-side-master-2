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
      <h1>
        {movie.title} ({movie.year})
      </h1>
      <div>
        <img className="movie-image" src={movie.imagePath} alt={movie.title} />
      </div>
      <div className="movie-details">
        <p>{movie.description}</p>
        <p>
          <strong>Director:</strong> {movie.director.name}
        </p>
        <p>
          <strong>Genre:</strong> {movie.genre.name}
        </p>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};
