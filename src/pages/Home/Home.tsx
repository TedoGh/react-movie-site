import MovieList from "../../components/MovieList/MovieList";

export default function Home() {
  return (
    <>
      <div>
        <MovieList title="Popular Movies" type="popular" />
        <MovieList title="Top Rated Movies" type="top_rated" />
        <MovieList title="Now Playing Movies" type="now_playing" />
        <MovieList title="Up Coming Movies" type="upcoming" />
      </div>
    </>
  );
}
