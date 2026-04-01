import db from "../config/db.js";

export async function serviceRegister(req, res) {
  try {
    const { serviceId, service_name, service_price } = req.body;

    // Check if service already exists
    const [existing] = await db.query(
      "SELECT * FROM services WHERE serviceId = ?",
      [serviceId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Service already exists" });
    }

    // Insert new service
    await db.query(
      `INSERT INTO services (serviceId, service_name, service_price)
       VALUES (?, ?, ?)`,
      [serviceId, service_name, service_price]
    );

    res.status(201).json({ message: "Service added successfully" });

  } catch (error) {
    console.error("Error occurred in serviceRegister:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getService(req, res) {
  try {
    const [rows] = await db.query("SELECT * FROM services");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error occurred in getService:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

