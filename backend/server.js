import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { databaseService } from './services/database.service.js';
import authRoutes from './routes/auth.routes.js';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api', authRoutes);

// Connect to database and start server
databaseService.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend API running at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await databaseService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await databaseService.disconnect();
  process.exit(0);
});