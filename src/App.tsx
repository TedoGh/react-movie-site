import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import MovieSingleItem from "./pages/MovieSingleItem/MovieSingleItem";
import NotFound from "./pages/NotFound/NotFound";
import GenreMovies from "./pages/GenreMovies/GenreMovies";
import ActorMovies from "./pages/ActorMovies/ActorMovies";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:title/:movieId" element={<MovieSingleItem />} />
          <Route path="genre/:genreId/:movies" element={<GenreMovies />} />
          <Route path="actor/:title/:actorId" element={<ActorMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
