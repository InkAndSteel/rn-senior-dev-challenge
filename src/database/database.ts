import * as SQLite from 'expo-sqlite';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    this.db = await SQLite.openDatabaseAsync('health_tracker.db');
    await this.runMigrations();
  }

  private async runMigrations(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  async getUserByEmail(email: string): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');
    
    const result = await this.db.getFirstAsync(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return result;
  }

  async createUser(email: string, password: string): Promise<any> {
    if (!this.db) throw new Error('Database not initialized');
    
    const result = await this.db.runAsync(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, password]
    );
    return result;
  }

  async authenticate(email: string, password: string): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');
    
    const user = await this.db.getFirstAsync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    return !!user;
  }
}

export const databaseService = new DatabaseService();