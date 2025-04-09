require('dotenv').config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const axios = require('axios');
const express = require('express');
const path = require("path");
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfayı yönlendirme
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//Api bilgisi
const apiKey = process.env.WORDNIK_API_KEY

// MongoDB bağlantı bilgileri
const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const client = new MongoClient(uri);

// MongoDB bağlantısını başlat
let dbConnection;
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("MongoDB'ye bağlantı başarılı");
        dbConnection = client.db(dbName);
    } catch (err) {
        console.error("MongoDB bağlantı hatası:", err);
        process.exit(1); // Kritik bir hata olduğu için uygulamayı sonlandır
    }
}

//Koleksiyona bağlanma
async function getCollection(collectionName) {
    if (!dbConnection) {
        throw new Error("Veritabanı bağlantısı henüz kurulmadı.");
    }
    return dbConnection.collection(collectionName);
}

// Kullanıcı kaydı endpoint'i
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Kullanıcı koleksiyonunu al
        const userCollection = await getCollection("user");
        
        // E-posta kontrolü
        const existingUser = await userCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Bu e-posta adresi zaten kayıtlı" });
        }
        
        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Yeni kullanıcı ekle
        const result = await userCollection.insertOne({
            name,
            email,
            password: hashedPassword,
            createdAt: new Date()
        });
        
        res.status(201).json({ message: "Kayıt başarılı" });
    } catch (error) {
        console.error("Kayıt hatası:", error);
        res.status(500).json({ message: "Kayıt sırasında bir hata oluştu" });
    }
});

// Kullanıcı girişi endpoint'i
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Giriş denemesi:", email);
        
        // Kullanıcı koleksiyonunu al
        const userCollection = await getCollection("user");
        
        // Kullanıcıyı bul
        const user = await userCollection.findOne({ email });
        if (!user) {
            console.log("Kullanıcı bulunamadı:", email);
            return res.status(400).json({ message: "E-posta veya şifre hatalı" });
        }
        
        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Şifre hatalı:", email);
            return res.status(400).json({ message: "E-posta veya şifre hatalı" });
        }
        
        // Kullanıcı bilgilerini döndür (şifre hariç)
        const userInfo = {
            _id: user._id.toString(), // ObjectId'yi string'e çevir
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };
        
        console.log("Giriş başarılı:", email);
        res.status(200).json({ message: "Giriş başarılı", user: userInfo });
    } catch (error) {
        console.error("Giriş hatası:", error);
        res.status(500).json({ message: "Giriş sırasında bir hata oluştu" });
    }
});

// Veritabanına bağlan ve sunucuyu başlat
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server http://localhost:${port} adresinde çalışıyor.`);
    });
});