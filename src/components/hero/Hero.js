import './Hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react'; // Import the useUser hook

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const { user, isLoading } = useUser(); // Use the useUser hook to get user info

  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }

  function WatchLists(movieId) {
    navigate(`/WatchLists/${movieId}`);
  }

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies?.map((movie) => {
          return (
            <Paper key={movie.imdbId}>
              <div className='movie-card-container'>
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>
                    <div className="movie-title">
                      <h4>{movie.title}</h4>
                    </div>
                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>

                      {/* Conditional rendering for the Review button */}
                      {!isLoading && user ? (
                        <div className="movie-review-button-container">
                          <Button
                            variant="info"
                            onClick={() => reviews(movie.imdbId)}
                          >
                            Reviews
                          </Button>
                        </div>
                      ) : null}

                      {/* Conditional rendering for the Watchlist button */}
                      {!isLoading && user ? (
                        <div className="movie-watchlist-button-container">
                          <Link to={`/WatchList/${movie.imdbId}`}>
                            <div className="custom-tooltip">Add to WatchList</div>
                            <FontAwesomeIcon
                              className="add-button-icon"
                              icon={faCirclePlus}
                            />
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
