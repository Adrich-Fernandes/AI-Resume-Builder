const db = require('../config/db');

class Resume {
  static async create({ user_id, filename, raw_text }) {
    const [result] = await db.execute(
      'INSERT INTO resumes (user_id, filename, raw_text) VALUES (?, ?, ?)',
      [user_id, filename, raw_text]
    );
    return { id: result.insertId, user_id, filename };
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM resumes WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }

  static async findByUser(user_id) {
    const [rows] = await db.execute(
      'SELECT id, filename, uploaded_at FROM resumes WHERE user_id = ? ORDER BY uploaded_at DESC',
      [user_id]
    );
    return rows;
  }

  static async deleteById(id, user_id) {
    const [result] = await db.execute(
      'DELETE FROM resumes WHERE id = ? AND user_id = ?',
      [id, user_id]
    );
    return result.affectedRows > 0;
  }
}

module.exports = Resume;