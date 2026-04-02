import db from "../config/db.js";

export async function insertPayment(req, res) {
  try {
    const { payment_id, amount_paid, payment_date, recordId } = req.body;


    const [existing] = await db.query(
      "SELECT * FROM payment WHERE payment_id = ?",
      [payment_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Payment already exists" });
    }

    
    const [record] = await db.query(
      "SELECT recordId FROM record WHERE recordId = ?",
      [recordId]
    );

    if (record.length === 0) {
      return res.status(400).json({ message: "Record not found" });
    }

   
    await db.query(
      `INSERT INTO payment (payment_id, amount_paid, payment_date, recordId)
       VALUES (?, ?, ?, ?)`,
      [payment_id, amount_paid, payment_date, recordId]
    );

    res.status(201).json({ message: "Payment created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getDailyReport(req, res) {
  try {
    const date = req.query.date;

    const [rows] = await db.query(`
      SELECT 
        payment.payment_id,
        payment.payment_date,
        payment.amount_paid,
        car.plate_number,
        service.serviceName
      FROM payment
      JOIN record ON payment.recordId = record.recordId
      JOIN car ON record.car_id = car.car_id
      JOIN service ON record.serviceId = service.serviceId
      WHERE DATE(payment.payment_date) = ?
    `, [date]);

    const totalCollected = rows.reduce(
      (sum, r) => sum + Number(r.amount_paid), 
      0
    );

    res.status(200).json({
      date,
      totalCollected,
      rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating report" });
  }
}