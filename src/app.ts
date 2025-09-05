import express from 'express';
import v1Routes from './routes/v1/index.js';
import { globalErrorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { responseHandler } from './middlewares/responseHandler.js';

const app = express();
app.use(express.json());

// Global Response Handler
app.use(responseHandler);

app.use('/api', v1Routes);

// Handle 404
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

export default app;
