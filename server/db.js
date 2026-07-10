import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let pool;
let initError = null;

export const initDb = async () => {
  try {
    const cloudUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;
    
    if (cloudUrl) {
      // Connect directly using Railway URL
      pool = mysql.createPool(cloudUrl);
    } else {
      // Local fallback
      const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
      };
      const databaseName = process.env.DB_NAME || 'siva_website';
      
      const connection = await mysql.createConnection(dbConfig);
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
      await connection.end();

      pool = mysql.createPool({
        ...dbConfig,
        database: databaseName,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }

    const poolConnection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');

    // Create users table
    await poolConnection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create profiles table
    await poolConnection.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id VARCHAR(36) NOT NULL,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        age INT,
        purpose TEXT,
        gender VARCHAR(50),
        height VARCHAR(50),
        weight VARCHAR(50),
        health_challenges TEXT,
        medical_history TEXT,
        lifestyle TEXT,
        additional_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables initialized.');
    poolConnection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
    initError = error;
  }
};

// Export a proxy or getter for the pool so it can be used in routes
export const query = async (sql, params) => {
  if (initError) {
    throw new Error(`Database connection failed: ${initError.message}`);
  }
  if (!pool) {
    throw new Error('Database pool has not been initialized yet.');
  }
  return pool.query(sql, params);
};

export default { query };
