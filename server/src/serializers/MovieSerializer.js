class MovieSerializer {
  static getDetails(movie) {
    const allowedAttributes = ["title"];

    const serializedMovie = {};
    for (const attribute of allowedAttributes) {
      serializedMovie[attribute] = movie[attribute];
    }
    return serializedMovie;
  }
}

export default MovieSerializer;
