const NoteModel = require("../models/Notes");

class NoteController {
  /**
   * Mengambil semua catatan milik pengguna yang sedang login.
   */
  static async getNotes(req, res) {
    try {
      const userId = req.user.id; // Mengambil ID pengguna dari request
      const notes = await NoteModel.getUserNotes(userId); // Mengambil semua catatan berdasarkan ID pengguna
      res.json(notes);
    } catch (error) {
      console.error("Kesalahan saat mengambil catatan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }

  /**
   * Membuat catatan baru untuk pengguna.
   */
  static async createNote(req, res) {
    try {
      const { title, note, mark, noteDate } = req.body; // Mengambil data catatan dari request
      const userId = req.user.id; // Mengambil ID pengguna dari request

      // Validasi jika title atau note kosong
      //   if (!title || !note) {
      //     return res
      //       .status(400)
      //       .json({ message: "Judul dan isi catatan wajib diisi." });
      //   }

      const newNote = await NoteModel.createNote(
        userId,
        title,
        note,
        mark,
        noteDate
      ); // Menyimpan catatan ke database
      res
        .status(201)
        .json({ message: "Catatan berhasil dibuat.", note: newNote });
    } catch (error) {
      console.error("Kesalahan saat membuat catatan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }

  /**
   * Memperbarui catatan berdasarkan ID.
   */
  static async updateNote(req, res) {
    try {
      const { id } = req.params; // Mengambil ID catatan dari parameter URL
      const { title, note, mark, noteDate } = req.body; // Mengambil data baru catatan dari request
      const userId = req.user.id; // Mengambil ID pengguna dari request

      const updatedNote = await NoteModel.updateNote(
        userId,
        id,
        title,
        note,
        mark,
        noteDate
      );
      if (!updatedNote) {
        return res
          .status(404)
          .json({ message: "Catatan tidak ditemukan atau tidak diizinkan." });
      }

      res.json({ message: "Catatan berhasil diperbarui.", note: updatedNote });
    } catch (error) {
      console.error("Kesalahan saat memperbarui catatan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }

  /**
   * Menghapus catatan berdasarkan ID.
   */
  static async deleteNote(req, res) {
    try {
      const { id } = req.params; // Mengambil ID catatan dari parameter URL

      const isDeleted = await NoteModel.deleteNote(id);
      if (!isDeleted) {
        return res.status(404).json({ message: "Catatan tidak ditemukan." });
      }

      res.json({ message: "Catatan berhasil dihapus." });
    } catch (error) {
      console.error("Kesalahan saat menghapus catatan:", error);
      res.status(500).json({ message: "Terjadi kesalahan pada server." });
    }
  }
}

module.exports = NoteController;
