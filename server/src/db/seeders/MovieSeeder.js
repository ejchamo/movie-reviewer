import { Movie } from "../../models/index.js";

class MovieSeeder {
  static async seed() {
    const moviesData = [
      {
        title: "Dune 2",
      },
      {
        title: "Five Nights at Freddy's",
      },
      {
        title: "The Exorcist",
      },
    ];

    for (const movie of moviesData) {
      const currentMovie = await Movie.query().findOne(movie);
      if (!currentMovie) {
        await Movie.query().insert(movie);
      }
    }
  }
}

export default MovieSeeder;
