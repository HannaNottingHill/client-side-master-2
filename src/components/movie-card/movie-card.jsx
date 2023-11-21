import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({
  movie,
  onAddFavorite,
  onRemoveFavorite,
  isFavorite,
}) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <div
          className={`heart-icon ${isFavorite ? "favorite" : ""}`}
          onClick={() =>
            isFavorite ? onRemoveFavorite(movie._id) : onAddFavorite(movie._id)
          }
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        ></div>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onAddFavorite: PropTypes.func.isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
};
