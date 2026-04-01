import db from "../config/db.js";
import bcrypt from "bcrypt";



export async function RegisterUser(req, res) {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO user (username, password) VALUES (?, ?)",
      [username, hashed]
    );

    res.status(201).json({ message: "User registered" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function LoginUser(req, res) {
  try {
    const { username, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM user WHERE username = ?",
      [username]
    );

    const user = rows[0]; 


    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    
    req.session.user = {
      id: user.id,
      username: user.username
    };

    res.status(200).json({ message: "Logged in successfully" });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export async function Logout(req, res) {
  try {
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}