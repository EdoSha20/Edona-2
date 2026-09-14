import mysql from 'mysql2/promise';

import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
} from '$env/static/private';

// Connection pool for our MySQL database
const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

export default db;