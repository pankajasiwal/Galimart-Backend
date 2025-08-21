import express from 'express';
import v1Routes from './routes/v1/index.js';
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

app.use('/api', v1Routes);

// Handle 404
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
