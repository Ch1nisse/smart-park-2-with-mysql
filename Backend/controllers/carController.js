import db from "../config/db.js";

export async function createCar(req, res) {
  try {
    const { id,} = req.body;
ts
    const [existing] = await db.query(
      "SELECT * FROM car WHERE plate_number = ?",
      [plate_number]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Car already exists" });
    }

    // Insert car
    await db.query(
      `INSERT INTO car (plate_number, type, model, manufactured_year, driver_phone, mechanic_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [plate_number, type, model, manufactured_year, driver_phone, mechanic_name]
    );

    res.status(201).json({ message: "Car created successfully" });

  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}