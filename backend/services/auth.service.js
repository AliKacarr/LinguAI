import bcrypt from 'bcrypt';
import { databaseService } from './database.service.js';

class AuthService {
  async registerUser(name, email, password) {
    const userCollection = await databaseService.getCollection("user");
    
    // Check if email already exists
    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
      throw new Error("Bu e-posta adresi zaten kayıtlı. Lütfen başka bir e-posta adresi kullanın.");
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
    
    // Return user info (excluding password)
    return {
      message: "Registration successful",
      user: {
        _id: result.insertedId.toString(),
        name,
        email,
        createdAt: new Date()
      }
    };
  }

  async loginUser(email, password) {
    const userCollection = await databaseService.getCollection("user");
    
    // Find user
    const user = await userCollection.findOne({ email });
    if (!user) {
      throw new Error("Bu e-posta adresi kayıtlı değil. Lütfen önce kayıt olun.");
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Girdiğiniz şifre yanlış. Lütfen tekrar deneyin.");
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