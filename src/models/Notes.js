const pool = require("../config/database");

class NoteModel {
  /**
   * Mengambil semua catatan milik pengguna tertentu.
   * Catatan diurutkan berdasarkan mark (pin) dan tanggal pembuatan terbaru.
   */
  static async getUserNotes(userId) {
    const result = await pool.query(
        `SELECT id, user_id, title, note, mark, 
            TO_CHAR(note_date, 'YYYY-MM-DD') AS note_date, 
            created_at 
        FROM notes 
        WHERE user_id = $1 
        ORDER BY mark DESC, created_at DESC`,
        [userId]
    );
    return result.rows;
  }

  /**
   * Membuat catatan baru untuk pengguna.
   */
  static async createNote(userId, title, note, mark, noteDate) {
    const result = await pool.query(
      "INSERT INTO notes (user_id, title, note, mark, note_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, title, note, Boolean(mark), noteDate]
    );
    return result.rows[0];
  }

  /**
   * Memperbarui catatan berdasarkan ID catatan dan ID pengguna.
   */
  static async updateNote(userId, id, title, note, mark, noteDate) {
    const result = await pool.query(
      "UPDATE notes SET title = $1, note = $2, mark = $5, note_date = $6, updated_at = NOW() WHERE id = $3 AND user_id = $4 RETURNING *",
      [title, note, id, userId, Boolean(mark), noteDate]
    );
    return result.rowCount > 0 ? result.rows[0] : null;
  }

  /**
   * Menghapus catatan berdasarkan ID.
   */
  static async deleteNote(id) {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rowCount > 0;
  }
}

module.exports = NoteModel;
