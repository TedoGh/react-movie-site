import { Link } from "react-router-dom";
import "./MovieItemCard.css";
import { strToNum, titleToSlug } from "../../helpers/helper";
import { IoPlayCircleOutline } from "react-icons/io5";

interface IProps {
  id: number;
  date: string;
  title: string;
  imdbRating: string;
  imgUrl: string;
}
export default function MovieItemCard({
  id,
  date,
  title,
  imgUrl,
  imdbRating,
}: IProps) {
  const newLinkTitle = titleToSlug(title);

  const imdb = strToNum(imdbRating);

  return (
    <div>
      <Link to={`/movie/${newLinkTitle}/${id}`}>
        <div className="movie-card-item">
          <div className="movie-card-content">
            <div className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
                alt={title}
                className="movie-card-img"
              />
              <div className="play-button">
                <IoPlayCircleOutline color="#fff" size={64} />
              </div>
              <div>
                <span className="movie-card-imdb">
                  IMDB : {imdb.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="movie-card-details">
              <p className="movie-card-year">{date?.slice(0, 4)}</p>
              <h1 className="movie-card-title">{title}</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
