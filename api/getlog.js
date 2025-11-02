// api/getlog.js
const fs = require('fs');

module.exports = function (req, res) {
  const logPath = '/tmp/log.json';

  if (fs.existsSync(logPath)) {
    try {
      const data = fs.readFileSync(logPath, 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (e) {
      console.error('Read error:', e);
      res.status(500).json({ error: 'Read failed' });
    }
  } else {
    // Создаём пустой лог при первом запуске
    fs.writeFileSync(logPath, '[]');
    res.status(200).json([]);
  }
};