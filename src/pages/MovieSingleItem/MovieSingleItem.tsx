import "./MovieSingleItem.css";
import { useParams } from "react-router-dom";
import RelatedMovieItems from "../../components/RelatedMovieItems/RelatedMovieItems";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NotFound from "../NotFound/NotFound";
import useFetch from "../../hooks/useFetch";

export default function MovieSingleItem() {
  const { movieId } = useParams();
  const apiUrl = `${process.env.REACT_APP_API_URL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const { data: currentMovieDetail, error } = useFetch(apiUrl, []);

  if (error) {
    return <NotFound />;
  }

  return (
    <div
      className="movie"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovieDetail?.backdrop_path})`,
      }}
    >
      <div>
        <div className="movie-wrapper">
          <MovieDetails
            posterUrl={currentMovieDetail?.poster_path}
            title={currentMovieDetail?.title}
            imdbRating={currentMovieDetail?.vote_average}
            releaseDate={currentMovieDetail?.release_date}
            description={currentMovieDetail?.overview}
            duration={currentMovieDetail?.runtime}
            movieDetails={currentMovieDetail}
          />
          <RelatedMovieItems />
        </div>
      </div>
    </div>
  );
}
