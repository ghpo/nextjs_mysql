// api/index.js
import { Router } from 'express';
import mysql from 'mysql2/promise';

const router = Router();

// create a connection to the MySQL database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydatabase'
});

// create a new item
router.post('/items', async (req, res) => {
  const [result] = await db.query(
    'INSERT INTO items SET ?',
    req.body
  );
  res.json({ id: result.insertId });
});

// fetch all items
router.get('/items', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM items'
  );
  res.json(rows);
});

// fetch a single item by id
router.get('/items/:id', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM items WHERE id = ?',
    [req.params.id]
  );
  res.json(rows[0]);
});

// update an item by id
router.put('/items/:id', async (req, res) => {
  await db.query(
    'UPDATE items SET ? WHERE id = ?',
    [req.body, req.params.id]
  );
  res.sendStatus(200);
});

// delete an item by id
router.delete('/items/:id', async (req, res) => {
  await db.query(
    'DELETE FROM items WHERE id = ?',
    [req.params.id]
  );
  res.sendStatus(200);
});

export default router;
