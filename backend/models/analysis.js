const db = require('../config/db');

class Analysis {
  static async create({ resume_id, user_id, job_description, match_score, summary, suggestions_add, suggestions_remove, suggestions_keep }) {
    const [result] = await db.execute(
      `INSERT INTO analyses
        (resume_id, user_id, job_description, match_score, summary, suggestions_add, suggestions_remove, suggestions_keep)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        resume_id,
        user_id,
        job_description,
        match_score,
        summary,
        JSON.stringify(suggestions_add),
        JSON.stringify(suggestions_remove),
        JSON.stringify(suggestions_keep),
      ]
    );
    return { id: result.insertId };
  }

  static async findById(id) {
    const [rows] = await db.execute(
      'SELECT * FROM analyses WHERE id = ? LIMIT 1',
      [id]
    );
    if (!rows[0]) return null;
    return Analysis._parse(rows[0]);
  }

  static async findByUser(user_id) {
    const [rows] = await db.execute(
      `SELECT a.*, r.filename
       FROM analyses a
       JOIN resumes r ON a.resume_id = r.id
       WHERE a.user_id = ?
       ORDER BY a.created_at DESC`,
      [user_id]
    );
    return rows.map(Analysis._parse);
  }

  static async findByResume(resume_id, user_id) {
    const [rows] = await db.execute(
      'SELECT * FROM analyses WHERE resume_id = ? AND user_id = ? ORDER BY created_at DESC',
      [resume_id, user_id]
    );
    return rows.map(Analysis._parse);
  }

  static _parse(row) {
    return {
      ...row,
      suggestions_add:    typeof row.suggestions_add    === 'string' ? JSON.parse(row.suggestions_add)    : row.suggestions_add,
      suggestions_remove: typeof row.suggestions_remove === 'string' ? JSON.parse(row.suggestions_remove) : row.suggestions_remove,
      suggestions_keep:   typeof row.suggestions_keep   === 'string' ? JSON.parse(row.suggestions_keep)   : row.suggestions_keep,
    };
  }
}

module.exports = Analysis;