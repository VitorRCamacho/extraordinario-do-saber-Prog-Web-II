const db = require('./db');

exports.findByEmail = (email) => new Promise((resolve, reject) => {
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return reject(err);
    resolve(row);
  });
});

exports.findById = (id) => new Promise((resolve, reject) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return reject(err);
    resolve(row);
  });
});

exports.create = ({ name, email, password_hash, is_admin = 0 }) => new Promise((resolve, reject) => {
  db.run('INSERT INTO users (name, email, password_hash, is_admin) VALUES (?, ?, ?, ?)',
    [name, email, password_hash, is_admin],
    function (err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, name, email, is_admin });
    });
});