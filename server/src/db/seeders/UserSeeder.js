import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tyler@gmail.com",
        password: "123",
      },
      {
        email: "skylfw@launch.com",
        password: "skyIsCool",
      },
      {
        email: "ej@aol.com",
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
