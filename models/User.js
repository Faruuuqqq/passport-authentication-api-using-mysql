const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
    
    static async create({ name, email, password }) {
        try {
      // Hash password untuk keamanan
      const hashedPassword = await bcrypt.hash(password, 10);

      // Query ke database
      const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
      const [result] = await db.promise().query(query, [name, email, hashedPassword]);

      // Return ID user yang baru saja dibuat
      return result.insertId;
    } catch (err) {
      throw new Error('Database error: ' + err.message);
    }
  }
}

module.exports = User;