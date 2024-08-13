import "./ActorMovies.css";
import { useParams } from "react-router-dom";
import MovieItemCard from "../../components/MovieItemCard/MovieItemCard";
import ActorDetail from "../../components/ActorDetail/ActorDetail";
import NotFound from "../NotFound/NotFound";
import useFetch from "../../hooks/useFetch";
import MovieItemCardsWrapper from "../../components/MovieItemCardsWrapper/MovieItemCardsWrapper";
import { IMovieList } from "../../interfaces/IMovie";

export default function ActorMovies() {
  const { actorId } = useParams<string>();
  const actorinfoUrl = `${process.env.REACT_APP_API_URL}/person/${actorId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const apiUrl = `${process.env.REACT_APP_API_URL}/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const { data: personInfo, error: personInfoError } = useFetch(
    actorinfoUrl,
    ""
  );
  const { data: personMovieDetail } = useFetch(apiUrl, []);

  if (personInfoError) {
    return <NotFound />;
  }

  return (
    <div>
      <ActorDetail personInfo={personInfo} />
      <MovieItemCardsWrapper>
        {personMovieDetail.cast &&
          personMovieDetail.cast.map((movie: IMovieList) => {
            return (
              <MovieItemCard
                key={movie.id}
                id={movie.id}
                date={movie.release_date}
                title={movie.title}
                imdbRating={movie.vote_average}
                imgUrl={movie.poster_path}
              />
            );
          })}
      </MovieItemCardsWrapper>
    </div>
  );
}
