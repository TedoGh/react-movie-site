import "./MovieDetails.css";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { strToNum, titleToSlug, toHrsMins } from "../../helpers/helper";
import WatchTrailer from "../WatchTrailer/WatchTrailer";
import { IMovieList } from "../../interfaces/IMovie";
import NotFound from "../../pages/NotFound/NotFound";
import imdbLogo from "../../assets/img/imdb.svg";

interface IProps {
  posterUrl: string;
  title: string;
  imdbRating: string;
  releaseDate: string;
  description: string;
  duration: string;
  movieDetails: IMovieDetails;
}

interface IMovieDetails {
  genres: IMovieList[];
  casts: IMovieList[];
  production_countries: IMovieList[];
}

export default function MovieDetails({
  posterUrl,
  title,
  imdbRating,
  releaseDate,
  description,
  duration,
  movieDetails,
}: IProps) {
  const { movieId } = useParams();
  const apiUrl = `${process.env.REACT_APP_API_URL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const { data: movieCasts, loading, error } = useFetch(apiUrl, "");
  const TrailerUrl = `${process.env.REACT_APP_API_URL}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
  const { data: Trailer } = useFetch(TrailerUrl, []);

  const { hours, minutes } = toHrsMins(parseInt(duration));

  titleToSlug(title);

  const imdbRatingValue = strToNum(imdbRating).toFixed(1);

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="movie-details">
      <div className="movie-detail-left">
        <div className="movie-poster-img">
          <img
            src={`https://image.tmdb.org/t/p/w500/${posterUrl}`}
            width={300}
            height={450}
            alt={title}
          />
        </div>
      </div>
      <div className="movie-detail-right">
        <h1 className="movie-title">{title}</h1>
        <WatchTrailer trailerVideo={Trailer} />
        <div>
          <div style={{ padding: "15px 0" }}>
            <div className="movie-imdb-info">
              <img src={imdbLogo} width={54} alt="imdb" />
              <span>{imdbRatingValue}</span>
            </div>
            <div>
              <p>
                Released : <span>{releaseDate?.slice(0, 4)}</span>
              </p>
              <div className="movie-detail-info">
                Genre :
                {movieDetails.genres &&
                  movieDetails.genres.map(
                    (genre: IMovieList, index: number) => (
                      <div key={genre.id}>
                        <Link to={`/genre/${genre.id}/movies`}>
                          <p>{(index ? ", " : "") + genre.name}</p>
                        </Link>
                      </div>
                    )
                  )}
              </div>
              <div className="movie-detail-info">
                Casts:
                {movieCasts.cast &&
                  movieCasts.cast
                    .slice(0, 6)
                    .map((cast: IMovieList, index: number) => (
                      <div key={cast.id}>
                        <Link
                          to={`/actor/${titleToSlug(cast.name)}/${cast.id}`}
                        >
                          <p>{(index ? ", " : "") + cast.name}</p>
                        </Link>
                      </div>
                    ))}
              </div>
              <p>
                Duration : {""}
                <span>
                  {hours} hours, {minutes} minutes
                </span>
              </p>
              <div className="movie-detail-info">
                Country :
                {movieDetails.production_countries &&
                  movieDetails.production_countries.map(
                    (country: IMovieList, index: number) => (
                      <div key={country.id}>
                        <p>{(index ? ", " : "") + country.name}</p>
                      </div>
                    )
                  )}
              </div>
            </div>
          </div>
          <div>
            <p className="movie-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
