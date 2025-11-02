// api/log.js
const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const value = req.query.a || 'NO DATA';
  const timestamp = new Date().toISOString();

  // Путь в /tmp — РАЗРЕШЕНО
  const logPath = '/tmp/log.json';

  let logs = [];
  if (fs.existsSync(logPath)) {
    try {
      logs = JSON.parse(fs.readFileSync(logPath, 'utf8'));
    } catch (e) {
      console.error('Parse error:', e);
      logs = [];
    }
  }

  logs.push({ timestamp, value });
  if (logs.length > 1000) logs = logs.slice(-1000);

  try {
    fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
  } catch (e) {
    console.error('Write error:', e);
    return res.status(500).json({ error: 'Save failed' });
  }

  res.status(200).json({ message: 'OK', value, timestamp });
};