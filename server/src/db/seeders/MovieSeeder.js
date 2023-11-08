import { Movie } from "../../models/index.js";

class MovieSeeder {
  static async seed() {
    const moviesData = [
      {
        title: "Dune 2",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1683055846/amc-cdn/production/2/movies/68100/68123/PosterDynamic/151984.jpg",
      },
      {
        title: "Five Nights at Freddy's",
      },
      {
        title: "The Exorcist",
      },
      {
        title: "No Hard Feelings",
      },
      {
        title: "The Marvels",
      },
      {
        title: "Aladin",
      },
      {
        title: "The Little Mermaid",
      },
      {
        title: "Pocahontas",
      },
      {
        title: "The Lion King",
      },
      {
        title: "Iron Man",
      },
      {
        title: "Spiderman",
      },
      {
        title: "Ant Man",
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
