import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import MovieSingleItem from "../pages/MovieSingleItem/MovieSingleItem";
import GenreMovies from "../pages/GenreMovies/GenreMovies";
import ActorMovies from "../pages/ActorMovies/ActorMovies";
import NotFound from "../pages/NotFound/NotFound";
import ScrollUpTop from "../components/ScrollUpTop/ScrollUpTop";

const Layout = () => {
  return (
    <>
      <ScrollUpTop />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <MovieSingleItem />,
        path: "movie/:title/:movieId",
      },
      {
        element: <GenreMovies />,
        path: "genre/:genreId/:movies",
      },
      {
        element: <ActorMovies />,
        path: "actor/:title/:actorId",
      },
      {
        element: <NotFound />,
        path: "*",
      },
    ],
  },
] as RouteObject[]);

export default router;
