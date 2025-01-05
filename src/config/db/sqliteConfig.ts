import path from 'path';
import sqlite3, { Database } from 'sqlite3';

const dbName = "movies.db";
const currentDir = __dirname;
const rootDir = path.resolve(currentDir,'../../../')
const dbPath: string = path.join(rootDir, dbName)


export const db: Database = new sqlite3.Database(dbPath, (err: Error | null) => {
  if (err) {
    console.error('Error to connect SQLite: ', err.message);
  } else {
    console.log('Connect to DB SQLite success: ', dbPath);
  }
});



