const AuthService = require("../services/authService");

const AuthController = {
  /**
   * Daftar pengguna barui
   */
  async register(req, res) {
    try {
      const { username, password } = req.body;

      // Validasi input: Pastikan username dan password diisi
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username dan password wajib diisi." });
      }

      // Proses registrasi pengguna baru
      const user = await AuthService.register(username, password);
      return res
        .status(201)
        .json({ message: "Pengguna berhasil dibuat.", user });
    } catch (error) {
      console.error("Kesalahan saat mendaftar:", error);
      res
        .status(error.status || 500)
        .json({ message: error.message || "Terjadi kesalahan pada server." });
    }
  },

  /**
   * Login menggunakan username dan password
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validasi input: Pastikan username dan password diisi
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username dan password wajib diisi." });
      }

      // Proses autentikasi dan pembuatan token
      const token = await AuthService.login(username, password);
      return res.json({ message: "Login berhasil.", token });
    } catch (error) {
      console.error("Kesalahan saat login:", error);
      res
        .status(error.status || 500)
        .json({ message: error.message || "Terjadi kesalahan pada server." });
    }
  },
};

module.exports = AuthController;
