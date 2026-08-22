const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Safely load the User model (handles both ts-node and compiled dist/src builds)
let User;
try {
  User = require("./src/models/user").default || require("./src/models/user");
} catch (e) {
  try {
    User = require("./models/user").default || require("./models/user");
  } catch (err) {
    try {
      User = require("./dist/models/user").default || require("./dist/models/user");
    } catch (finalErr) {
      console.error("Could not locate the User model file. Please check your models directory path.");
      process.exit(1);
    }
  }
}

async function seedUser() {
  try {
    const connString = process.env.MONGODB_CONNECTION_STRING;
    if (!connString) {
      console.error("MONGODB_CONNECTION_STRING is missing from .env");
      process.exit(1);
    }

    await mongoose.connect(connString);
    
    // Hash password '12345678' to match the project README
    const hashedPassword = await bcrypt.hash("12345678", 10);
    
    const testAccounts = [
      { email: "test@user.com", firstName: "Test", lastName: "Admin", role: "admin" },
      { email: "owner@hotel.com", firstName: "Hotel", lastName: "Owner", role: "admin" },
      { email: "guest@user.com", firstName: "Test", lastName: "Guest", role: "user" },
    ];

    for (const acc of testAccounts) {
      let user = await User.findOne({ email: acc.email });
      if (user) {
        user.password = hashedPassword;
        user.role = acc.role;
        await user.save();
        console.log(`Updated ${acc.email} successfully!`);
      } else {
        user = new User({
          email: acc.email,
          password: hashedPassword,
          firstName: acc.firstName,
          lastName: acc.lastName,
          role: acc.role
        });
        await user.save();
        console.log(`Created ${acc.email} successfully!`);
      }
    }
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedUser();