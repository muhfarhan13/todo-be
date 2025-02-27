const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  // Periksa apakah header Authorization tersedia
  if (!authHeader) {
    return res.status(401).json({ message: "Akses ditolak." });
  }

  // Ambil token setelah "Bearer "
  const token = authHeader.split(" ")[1];

  // Periksa apakah token tersedia
  if (!token) {
    return res.status(401).json({ message: "Format token tidak valid." });
  }

  try {
    // Verifikasi token JWT
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Simpan data pengguna yang sudah diverifikasi di req.user
    next(); // Lanjutkan ke middleware atau handler berikutnya
  } catch (err) {
    console.error("Error jwt:", err.message);
    res.status(400).json({ message: "Token tidak valid." });
  }
};

module.exports = authMiddleware;
