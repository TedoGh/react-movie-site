import "./Search.css";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useHideScrollBar from "../../hooks/useHideScrollBar";
import { Link, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { titleToSlug } from "../../helpers/helper";
import { IMovieList } from "../../interfaces/IMovie";
import axios from "axios";

interface ISearchResult {
  results: IMovieList[];
  total_results: number;
}

const Search = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [searchItem, setSearchItem] = useState<string>("");
  const [searchMovie, setSearchMovie] = useState<ISearchResult>({
    results: [],
    total_results: 0,
  });
  const [error, setError] = useState<boolean>(false);
  const path = useLocation();
  const searchApi = `${process.env.REACT_APP_API_URL}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchItem}`;
  const debouncedSearch = useDebounce(searchApi, 1000);
  useHideScrollBar(isActive);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchData = async () => {
    try {
      const response = await axios.get(debouncedSearch);
      setSearchMovie(response.data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (searchItem.length > 0) {
      handleSearchData();
    } else {
      setSearchMovie({
        results: [],
        total_results: 0,
      });
    }
  }, [debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive]);

  useEffect(() => {
    setIsActive(false);
    setSearchItem("");
  }, [path]);

  titleToSlug("");

  return (
    <>
      <FaSearch
        size={22}
        color="#E7E9EA"
        onClick={() => setIsActive(true)}
        style={{ cursor: "pointer" }}
      />

      {isActive && (
        <div className="movie-search">
          <div
            ref={searchRef}
            className={
              searchMovie.results && searchMovie.results.length > 0
                ? "movie-search-wrapper height-500 overflow-auto"
                : "movie-search-wrapper"
            }
          >
            <input
              type="text"
              value={searchItem}
              onChange={handleInputChange}
              placeholder="Search Movie..."
            />
            {error && <p>Error: {error}</p>}
            {searchMovie.results && searchMovie.results.length > 0 && (
              <div className="movie-results-items">
                {searchMovie &&
                  searchMovie.results &&
                  searchMovie.results.map((movie: IMovieList) => (
                    <div key={movie.id}>
                      <div className="movie-results-item">
                        <Link
                          to={`/movie/${titleToSlug(movie.title)}/${movie.id}`}
                        >
                          <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                          />
                          <p>{movie.title}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {searchItem.length > 0 && searchMovie.total_results === 0 && (
              <p className="no-results">No results found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
