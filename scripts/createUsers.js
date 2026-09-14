import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
});

const userPassword = await bcrypt.hash('user123', 10);
const adminPassword = await bcrypt.hash('admin123', 10);

await db.execute(
    `INSERT INTO users (email, password, role)
     VALUES (?, ?, ?)`,
    ['user@test.at', userPassword, 'USER']
);

await db.execute(
    `INSERT INTO users (email, password, role)
     VALUES (?, ?, ?)`,
    ['admin@test.at', adminPassword, 'ADMIN']
);

console.log('Users created.');

await db.end();