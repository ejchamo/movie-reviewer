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
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1694553743/amc-cdn/production/2/movies/56500/56464/PosterDynamic/157171.jpg",
      },
      {
        title: "Aladin",
      },
      {
        title: "The Little Mermaid",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1682517819/amc-cdn/production/2/movies/73400/73387/PosterDynamic/151764.jpg",
      },
      {
        title: "Pocahontas",
      },
      {
        title: "The Lion King",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1687989175/amc-cdn/production/2/movies/74000/73968/PosterDynamic/154181.jpg",
      },
      {
        title: "Iron Man",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1593636376/amc-cdn/production/2/movies/64700/64662/PosterDynamic/108763.jpg",
      },
      {
        title: "Spiderman",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/amc-cdn/production/2/movies/48200/48153/PosterDynamic/67520.jpg",
      },
      {
        title: "Ant Man",
        imageUrl:
          "https://amc-theatres-res.cloudinary.com/v1673546232/amc-cdn/production/2/movies/62400/62357/PosterDynamic/147794.jpg",
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
