import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

if (!dbName) {
  throw new Error('Database name is not defined in environment variables');
}

class DatabaseService {
  constructor() {
    this.client = new MongoClient(uri);
    this.dbConnection = null;
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("MongoDB connection successful");
      this.dbConnection = this.client.db(dbName);
      return this.dbConnection;
    } catch (err) {
      console.error("MongoDB connection error:", err);
      throw err;
    }
  }

  async getCollection(collectionName) {
    if (!this.dbConnection) {
      throw new Error("Database connection not established yet");
    }
    return this.dbConnection.collection(collectionName);
  }

  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log("MongoDB connection closed");
    }
  }
}

export const databaseService = new DatabaseService();