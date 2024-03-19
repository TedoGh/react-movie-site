import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieItemCard from "../../components/MovieItemCard/MovieItemCard";
import useFetch from "../../hooks/useFetch";
import MovieItemCardsWrapper from "../../components/MovieItemCardsWrapper/MovieItemCardsWrapper";
import { IMovieList } from "../../interfaces/IMovie";
import NotFound from "../NotFound/NotFound";
import Pagination from "../../components/Pagination/Pagination";

export default function GenreMovies() {
  const { genreId } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentMovieDetail, setCurrentMovieDetail] = useState<IMovieList[]>(
    []
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const apiUrl = `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=${genreId}&page=${currentPage}`;
  const { data, error } = useFetch(apiUrl, []);

  useEffect(() => {
    if (data) {
      setCurrentMovieDetail(data.results);
      setTotalPages(70);
    }
  }, [data, genreId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [genreId]);

  useEffect(() => {
    window.scroll(0, 0);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {currentMovieDetail && (
        <>
          <MovieItemCardsWrapper>
            {currentMovieDetail.map((movie: IMovieList) => (
              <div key={movie.id}>
                <MovieItemCard
                  id={movie.id}
                  date={movie.release_date}
                  imdbRating={movie.vote_average}
                  title={movie.title}
                  imgUrl={movie.poster_path}
                />
              </div>
            ))}
          </MovieItemCardsWrapper>

          <Pagination
            setCurrentPage={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
}
