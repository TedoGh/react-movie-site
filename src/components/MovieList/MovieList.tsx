import "./MovieList.css";
import MovieItemCard from "../MovieItemCard/MovieItemCard";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useFetch from "../../hooks/useFetch";
import { IMovieList } from "../../interfaces/IMovie";
import { RiMovie2Line } from "react-icons/ri";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

interface IProps {
  title: string;
  type: string;
}

export default function MovieList({ title, type }: IProps) {
  const apiUrl = `${process.env.REACT_APP_API_URL}/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const { data: moviesList } = useFetch(apiUrl, []);
  const swiper = useSwiper();
  const handleNextClick = () => {
    swiper.slideNext();
  };

  const handlePrevClick = () => {
    swiper.slidePrev();
  };

  return (
    <div>
      <div className="movie-list">
        <div className="container">
          <div className="movie-list-wrapper">
            <div className="flex justify-between items-center">
              <div className="flex items-center" style={{ gap: "8px" }}>
                <RiMovie2Line color="#02254B" size={35} />
                <h1 className="movie-list-title">{title}</h1>
              </div>
              <div className="movie-list-swiper-arrows">
                <button
                  className={`${type}-movies-list-prev-btn`}
                  onClick={() => handlePrevClick}
                >
                  <FaCircleChevronLeft size={32} color="#02254B" />
                </button>
                <button
                  className={`${type}-movies-list-next-btn`}
                  onClick={() => handleNextClick}
                >
                  <FaCircleChevronRight size={32} color="#02254B" />
                </button>
              </div>
            </div>
            <div>
              <Swiper
                spaceBetween={50}
                slidesPerView={1.5}
                modules={[Autoplay, Navigation]}
                navigation={{
                  prevEl: `.${type}-movies-list-prev-btn`,
                  nextEl: `.${type}-movies-list-next-btn`,
                }}
                breakpoints={{
                  420: {
                    slidesPerView: 1.8,
                    spaceBetween: 40,
                  },
                  768: {
                    slidesPerView: 3.5,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4.5,
                    spaceBetween: 50,
                  },
                }}
              >
                {moviesList.results &&
                  moviesList.results.map((movie: IMovieList) => (
                    <div key={movie.id}>
                      <SwiperSlide key={movie.id}>
                        <MovieItemCard
                          id={movie.id}
                          date={movie.release_date}
                          imdbRating={movie.vote_average}
                          title={movie.title}
                          imgUrl={movie.poster_path}
                        />
                      </SwiperSlide>
                    </div>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
