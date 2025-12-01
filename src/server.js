import './utils/env-validator.js';
import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dbConnection from '#@/config/dbConnection.js';
import authRoutes from '#@/routes/auth.route.js';
import startServer from '#@/utils/start-server.js';
import cors from '#@/middleware/cors.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors);

// Database Connection
const dbStatus = await dbConnection();

// Public folder
app.use(express.static('public'));

// API Routes
app.use('/api/v1', authRoutes);
app.get('/', (request, response) => {
  response.send('Express.js Boilerplate by zyin-jessie!');
});

// Start the server
startServer(app, PORT, { 
    hasApiDocs: false,
    dbConnected: dbStatus.connected
});
