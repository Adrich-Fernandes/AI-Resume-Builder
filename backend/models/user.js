const db = require('../config/db');

class User {
  static async create({ name, email, password }) {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return { id: result.insertId, name, email };
  }

  static async findByEmail(email) {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows[0] || null;
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }

  static async emailExists(email) {
    const [rows] = await db.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );
    return rows.length > 0;
  }
}

module.exports = User;