const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'prisma/dev.db');
const db = new Database(dbPath);

const email = 'student@badar.ai';
const password = 'password123';
const hashedPassword = bcrypt.hashSync(password, 10);
const name = 'Mahasiswa Badar';
const role = 'student';
const id = 'cleu' + Math.random().toString(36).substr(2, 9);

try {
  // Check if table exists
  const table = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='User'").get();
  if (!table) {
    console.error('Table User does not exist. Did you run npx prisma db push?');
    process.exit(1);
  }

  const studentId = '12345678';
  const stmt = db.prepare('INSERT OR REPLACE INTO User (id, email, password, name, role, studentId) VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run(id, email, hashedPassword, name, role, studentId);
  console.log('Seed successful!');
  console.log('NIM (Student ID):', studentId);
  console.log('Email:', email);
  console.log('Password:', password);
} catch (err) {
  console.error('Error seeding user:', err);
} finally {
  db.close();
}
