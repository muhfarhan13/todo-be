const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const AuthService = {
  /**
   * Mendaftarkan pengguna baru ke database setelah memastikan username belum digunakan.
   */
  async register(username, password) {
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      throw { status: 400, message: "Username sudah digunakan" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, hashedPassword]
    );

    return newUser.rows[0];
  },

  /**
   * Memeriksa username dan password lalu mengembalikan token JWT jika valid.
   */
  async login(username, password) {
    const user = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (user.rows.length === 0) {
      throw { status: 400, message: "User tidak ditemukan" };
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      throw { status: 400, message: "Password salah" };
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  },
};

module.exports = AuthService;
