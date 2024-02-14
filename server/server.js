// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Google@25622002',
  database: 'images',
});

db.connect((err) => {
  if (err) {
    console.error('Unable to connect to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Implement your signup logic here

  // Example query to insert user into the database
  const signupQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(signupQuery, [email, password], (signupErr) => {
    if (signupErr) {
      console.error('MySQL error:', signupErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json({ success: true, message: 'Signup successful' });
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  // Implement your login logic here

  // Example query to fetch user from the database
  const loginQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(loginQuery, [email, password], (loginErr, loginResults) => {
    if (loginErr) {
      console.error('MySQL error:', loginErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (loginResults.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    res.json({ success: true, message: 'Login successful', userId: loginResults[0].id });
  });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  // Implement your upload logic here

  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

  // Example query to insert image into the database
  const insertImageQuery = 'INSERT INTO image (user_id, url) VALUES (?, ?)';
  db.query(insertImageQuery, [userId, imageUrl], (insertErr) => {
    if (insertErr) {
      console.error('MySQL error:', insertErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json({ success: true, message: 'Image uploaded successfully' });
  });
});

app.get('/api/images/:userId', (req, res) => {
  const userId = req.params.userId;

  // Implement your fetch images logic here

  // Example query to fetch images for a specific user
  const fetchImagesQuery = 'SELECT * FROM image WHERE user_id = ?';
  db.query(fetchImagesQuery, [userId], (fetchErr, images) => {
    if (fetchErr) {
      console.error('MySQL error:', fetchErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json({ success: true, images });
  });
});

app.delete('/api/delete/:imageId', (req, res) => {
  const imageId = req.params.imageId;

  // Implement your delete image logic here

  // Example query to delete the image from the database
  const deleteImageQuery = 'DELETE FROM image WHERE id = ?';
  db.query(deleteImageQuery, [imageId], (deleteErr) => {
    if (deleteErr) {
      console.error('MySQL error:', deleteErr);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    res.json({ success: true, message: 'Image deleted successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
