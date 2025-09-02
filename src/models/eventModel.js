const db = require('./db');

exports.all = () => new Promise((resolve, reject) => {
  db.all('SELECT * FROM events ORDER BY date ASC', [], (err, rows) => {
    if (err) return reject(err);
    resolve(rows);
  });
});

exports.create = ({ title, description, location, date }) => new Promise((resolve, reject) => {
  db.run('INSERT INTO events (title, description, location, date) VALUES (?, ?, ?, ?)',
    [title, description, location, date],
    function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, title, description, location, date });
    });
});

exports.findById = (id) => new Promise((resolve, reject) => {
  db.get('SELECT * FROM events WHERE id = ?', [id], (err, row) => {
    if (err) return reject(err);
    resolve(row);
  });
});

exports.update = ({ id, title, description, location, date }) => new Promise((resolve, reject) => {
  db.run('UPDATE events SET title=?, description=?, location=?, date=? WHERE id=?',
    [title, description, location, date, id],
    function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
});

exports.remove = (id) => new Promise((resolve, reject) => {
  db.run('DELETE FROM events WHERE id=?', [id], function (err) {
    if (err) return reject(err);
    resolve(this.changes > 0);
  });
});