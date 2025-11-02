// api/getlog.js
const fs = require('fs');
const path = require('path');

module.exports = function (req, res) {
  const logPath = path.join(__dirname, 'data', 'log.json');
  if (fs.existsSync(logPath)) {
    try {
      const data = fs.readFileSync(logPath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      res.status(500).json({ error: 'Read failed' });
    }
  } else {
    res.status(200).json([]);
  }
};