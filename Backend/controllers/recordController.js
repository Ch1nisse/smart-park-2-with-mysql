import db from "../config/db.js";

export async function insertRecord(req, res) {
  try {
    const { recordId, service_date, car_id, serviceId } = req.body;

    // Check duplicate
    const [existing] = await db.query(
      "SELECT * FROM record WHERE recordId = ?",
      [recordId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Record already exists" });
    }

    // Get car id
    const [car] = await db.query(
      "SELECT car_id FROM car WHERE plate_number = ?",
      [car_id]
    );

    if (car.length === 0) {
      return res.status(400).json({ message: "Car not found" });
    }

    // Insert record
    await db.query(
      `INSERT INTO record (recordId, service_date, car_id, serviceId)
       VALUES (?, ?, ?, ?)`,
      [recordId, service_date, car[0].car_id, serviceId]
    );

    res.status(201).json({ message: "Record inserted successfully" });

  } catch (error) {
    console.error("Error inserting record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getRecord(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT 
        record.*, 
        car.plate_number, 
        service.serviceName
      FROM record
      JOIN car ON record.car_id = car.car_id
      JOIN service ON record.serviceId = service.serviceId
    `);

    res.status(200).json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching records" });
  }
}

export async function getRecordById(req, res) {
  try {
    const { recordId } = req.params;

    const [rows] = await db.query(`
      SELECT 
        record.*, 
        car.plate_number, 
        service.serviceName
      FROM record
      JOIN car ON record.car_id = car.car_id
      JOIN service ON record.serviceId = service.serviceId
      WHERE record.recordId = ?
    `, [recordId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json(rows[0]);

  } catch (error) {
    res.status(500).json({ message: "Error fetching record" });
  }
}

export async function deleteRecord(req, res) {
  try {
    const { recordId } = req.params;

    const [result] = await db.query(
      "DELETE FROM record WHERE recordId = ?",
      [recordId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error deleting record" });
  }
}