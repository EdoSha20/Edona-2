import mysql from 'mysql2/promise';

import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD_BEFORE,
    DB_PASSWORD_AFTER,
    DB_NAME,
    DB_PORT
} from '$env/static/private';

const db = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD_BEFORE + '$' + DB_PASSWORD_AFTER,
    database: DB_NAME,
    port: Number(DB_PORT)
});

export default db;