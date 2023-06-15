const queries = {
  students: {
    getAll: `SELECT n.id, n.name, m.math, h.history, w.wf
          FROM NameTable n
          JOIN MathTable m ON n.id = m.id
          JOIN HistoryTable h ON n.id = h.id
          JOIN WfTable w ON n.id = w.id`,
    getById: `SELECT n.id, n.name, m.math, h.history, w.wf
          FROM NameTable n
          JOIN MathTable m ON n.id = m.id
          JOIN HistoryTable h ON n.id = h.id
          JOIN WfTable w ON n.id = w.id
          WHERE n.id = @student_id`,
    deleteById: `BEGIN TRANSACTION;
          DELETE FROM MathTable WHERE id = @student_id;
          DELETE FROM HistoryTable WHERE id = @student_id;
          DELETE FROM WfTable WHERE id = @student_id;
          DELETE FROM NameTable WHERE id = @student_id;
          COMMIT;`,
    updateMathGrade: `UPDATE MathTable SET math = @math WHERE id = @id; SELECT * FROM MathTable WHERE id = @id;`,
    updateHistoryGrade: `UPDATE HistoryTable SET history = @history WHERE id = @id; SELECT * FROM HistoryTable WHERE id = @id;`,
    updateWFGrade: `UPDATE WfTable SET wf = @wf WHERE id = @id; SELECT * FROM WfTable WHERE id = @id;`,
    addStudent: `BEGIN TRANSACTION;
          INSERT INTO NameTable (id, name) VALUES (@id, @name);
          INSERT INTO MathTable (id, math) VALUES (@id, @math);
          INSERT INTO HistoryTable (id, history) VALUES (@id, @history);
          INSERT INTO WfTable (id, wf) VALUES (@id, @wf);
          COMMIT;`,
  },
};

module.exports = queries;
