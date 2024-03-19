import "./RelatedMovieItems.css";
import MovieItemCard from "../MovieItemCard/MovieItemCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useSwiper } from "swiper/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import useFetch from "../../hooks/useFetch";
import { IMovieList } from "../../interfaces/IMovie";

export default function RelatedMovieItems() {
  const { movieId } = useParams<string>();
  const apiUrl = `${process.env.REACT_APP_API_URL}/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const { data: relatedMovies } = useFetch(apiUrl, []);
  const swiper = useSwiper();
  const handleNextClick = () => {
    swiper.slideNext();
  };

  const handlePrevClick = () => {
    swiper.slidePrev();
  };

  return (
    <>
      {relatedMovies.total_results > 0 && (
        <div className="related-items">
          <h1>Related Movies</h1>
          <div style={{ margin: "20px 0", textAlign: "center" }}>
            <Swiper
              slidesPerView={5}
              modules={[Autoplay, Pagination, Navigation]}
              navigation={{
                prevEl: ".related-movie-item-prev-btn",
                nextEl: ".related-movie-item-next-btn",
              }}
              loop
              breakpoints={{
                350: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 70,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
            >
              <div>
                {relatedMovies.results &&
                  relatedMovies.results.map((movie: IMovieList) => (
                    <SwiperSlide key={movie.id}>
                      <div key={movie.id}>
                        <MovieItemCard
                          id={movie.id}
                          date={movie.release_date}
                          imdbRating={movie.vote_average}
                          title={movie.title}
                          imgUrl={movie.poster_path}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
              </div>
              <div className="related-movie-swiper-arrows">
                <button
                  className="related-movie-item-prev-btn"
                  onClick={() => handlePrevClick}
                >
                  <HiChevronLeft size={24} />
                </button>
                <button
                  className="related-movie-item-next-btn"
                  onClick={() => handleNextClick}
                >
                  <HiChevronRight size={24} />
                </button>
              </div>
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
}
