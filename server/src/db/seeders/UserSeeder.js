import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tyler@gmail.com",
        username: "Tyler",
        cryptedPassword: "123",
      },
      {
        email: "skylfw@launch.com",
        username: "SKY",
        cryptedPassword: "skyIsCool",
      },
      {
        email: "ej@aol.com",
        username: "Eeee Jay",
        cryptedPassword: "hello123",
      },
    ];

    for (const user of usersData) {
      const currentUser = await User.query().findOne(user);
      if (!currentUser) {
        await User.query().insert(user);
      }
    }
  }
}

export default UserSeeder;
