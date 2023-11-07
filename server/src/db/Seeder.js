/* eslint-disable no-console */
import { connection } from "../boot.js";
import MovieSeeder from "./seeders/MovieSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here

    console.log("seeding users...");
    await UserSeeder.seed();

    console.log("seeding movies");
    await MovieSeeder.seed();

    console.log("seeding reviews");
    await ReviewSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
