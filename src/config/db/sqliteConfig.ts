import sqlite3, { Database } from 'sqlite3';

const dbPath: string = String( process.env.FILE_DB_PATH );

export const db: Database = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error to connect SQLite: ', err.message);
  } else {
    console.log('Connect to DB SQLite success: ', dbPath);
  }
});



