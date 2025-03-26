require('dotenv').config();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const axios = require('axios');
const express = require('express');
const path = require("path");
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

//Koleksiyona bağlanma
async function getCollection(collectionName) {
    try {
        await client.connect();
        const db = client.db(dbName);
        return db.collection(collectionName);
    } catch (err) {
        console.error("Veritabanı bağlantı hatası:", err.message);
        throw new Error("Veritabanına bağlanılamadı.");
    }
}

app.listen(port, () => {
  console.log(`Server http://localhost:${port} adresinde çalışıyor.`);
});