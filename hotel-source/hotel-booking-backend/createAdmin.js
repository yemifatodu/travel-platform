const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Load the User model (adjust path if needed, e.g., ./src/models/user or ./models/user)
const User = require("./src/models/user");

async function createAdmin() {
  try {
    const connString = process.env.MONGODB_CONNECTION_STRING;
    if (!connString) {
      console.error("MONGODB_CONNECTION_STRING is missing from .env");
      process.exit(1);
    }

    await mongoose.connect(connString);
    
    const hashedPassword = await bcrypt.hash("YourSecurePassword123!", 10);
    
    const existingUser = await User.findOne({ email: "admin@hotel.com" });
    if (existingUser) {
      existingUser.role = "admin";
      existingUser.password = hashedPassword;
      await existingUser.save();
      console.log("Existing user updated to admin with new password!");
    } else {
      const adminUser = new User({
        email: "admin@hotel.com",
        password: hashedPassword,
        firstName: "Admin",
        lastName: "User",
        role: "admin"
      });
      await adminUser.save();
      console.log("Admin account (admin@hotel.com) created successfully!");
    }
  } catch (error) {
    console.error("Error creating admin account:", error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
