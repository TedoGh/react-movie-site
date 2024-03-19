import { ReactNode } from "react";
import "./MovieItemCardsWrapper.css";

type IProps = {
  children: ReactNode;
};

const MovieItemCardsWrapper = ({ children }: IProps) => {
  return (
    <div>
      <div className="container">
        <div className="movie-item-cards">{children}</div>
      </div>
    </div>
  );
};

export default MovieItemCardsWrapper;
