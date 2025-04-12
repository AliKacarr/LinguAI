import bcrypt from 'bcrypt';
import { databaseService } from './database.service.js';

class AuthService {
  async registerUser(name, email, password) {
    const userCollection = await databaseService.getCollection("user");
    
    // Check if email already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      throw new Error("This email is already registered");
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Add new user
    const result = await userCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    return { message: "Registration successful" };
  }

  async loginUser(email, password) {
    const userCollection = await databaseService.getCollection("user");
    
    // Find user
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw new Error("Email or password incorrect");
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Email or password incorrect");
    }
    
    // Return user info (excluding password)
    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };
  }
}

export const authService = new AuthService();