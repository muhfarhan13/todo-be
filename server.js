// Memuat variabel lingkungan dari file .env
require("dotenv").config();

// Mengimpor modul yang diperlukan
const express = require("express");
const cors = require("cors");

// Membuat instance aplikasi Express
const app = express();

// Middleware untuk mengizinkan permintaan dari domain lain (CORS)
app.use(cors());

// Middleware untuk parsing data JSON dalam request
app.use(express.json());

// Mengimpor file route
const authRoutes = require("./src/routes/authRoutes"); // Rute untuk autentikasi
const serviceRoutes = require("./src/routes/serviceRoutes"); // Rute untuk fitur utama aplikasi

// Menggunakan route yang telah diimpor
app.use("/api/auth", authRoutes); // Semua rute autentikasi akan berada di /api/auth
app.use("/api", serviceRoutes); // Semua rute layanan utama akan berada di /api

// Menentukan port server
const PORT = 5001; // Menggunakan port 5001

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di port ${PORT}`);
});
