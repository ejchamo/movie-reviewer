/* eslint-disable no-console */
import { connection } from "../boot.js";
import MovieSeeder from "./seeders/MovieSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here

    console.log("seeding movies");
    await MovieSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
