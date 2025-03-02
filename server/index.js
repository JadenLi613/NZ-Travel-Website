const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// 创建数据库连接
const db = new sqlite3.Database('feedback.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to the SQLite database.');
    // 创建反馈表
    db.run(`CREATE TABLE IF NOT EXISTS feedback (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

app.use(cors());
app.use(express.json());

// 处理提交反馈的路由
app.post('/api/feedback', (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        success: false 
      });
    }
    
    const sql = `INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)`;
    db.run(sql, [name, email, message], function(err) {
      if (err) {
        console.error('Error saving feedback:', err);
        return res.status(500).json({ 
          error: 'Failed to save feedback', 
          success: false 
        });
      }
      
      res.status(200).json({ 
        id: this.lastID, 
        success: true 
      });
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ 
      error: 'Server error', 
      success: false 
    });
  }
});

// 添加一个错误处理中间件
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Something went wrong', 
    success: false 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 