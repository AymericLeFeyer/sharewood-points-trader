require('dotenv').config();

const express = require('express');

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware pour lire le JSON
app.use(express.json());

// --- ROUTES API ---
app.use('/api/sharewood', require('./src/controller'));

// --- DÉMARRAGE ---
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});