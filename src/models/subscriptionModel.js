const db = require('./db');

exports.subscribe = ({ user_id, event_id }) => new Promise((resolve, reject) => {
  db.run('INSERT INTO subscriptions (user_id, event_id) VALUES (?, ?)',
    [user_id, event_id],
    function (err) {
      if (err) return reject(err);
      resolve(true);
    });
});

exports.unsubscribe = ({ user_id, event_id }) => new Promise((resolve, reject) => {
  db.run('DELETE FROM subscriptions WHERE user_id=? AND event_id=?',
    [user_id, event_id],
    function (err) {
      if (err) return reject(err);
      resolve(this.changes > 0);
    });
});

exports.isSubscribed = ({ user_id, event_id }) => new Promise((resolve, reject) => {
  db.get('SELECT 1 FROM subscriptions WHERE user_id=? AND event_id=?', [user_id, event_id], (err, row) => {
    if (err) return reject(err);
    resolve(!!row);
  });
});

exports.byUser = (user_id) => new Promise((resolve, reject) => {
  const sql = `SELECT e.* FROM events e
               JOIN subscriptions s ON s.event_id = e.id
               WHERE s.user_id = ? ORDER BY e.date ASC`;
  db.all(sql, [user_id], (err, rows) => {
    if (err) return reject(err);
    resolve(rows);
  });
});

exports.usersByEvent = (event_id) => new Promise((resolve, reject) => {
  const sql = `SELECT u.id, u.name, u.email FROM users u
               JOIN subscriptions s ON s.user_id = u.id
               WHERE s.event_id = ? ORDER BY u.name ASC`;
  db.all(sql, [event_id], (err, rows) => {
    if (err) return reject(err);
    resolve(rows);
  });
});