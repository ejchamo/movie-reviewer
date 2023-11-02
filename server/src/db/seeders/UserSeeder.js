import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tyler@gmail.com",
        username: "Tyler",
        password: "123",
      },
      {
        email: "skylfw@launch.com",
        username: "SKY",
        password: "skyIsCool",
      },
      {
        email: "ej@aol.com",
        username: "Eeee Jay",
        password: "hello123",
      },
    ];

    for (const user of usersData) {
      const currentUser = await User.query().findOne({ email: user.email });
      if (!currentUser) {
        await User.query().insert(user);
      }
    }
  }
}

export default UserSeeder;
