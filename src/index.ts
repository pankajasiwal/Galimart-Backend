import app from './app.js';
import db from './config/db.js';
import { config } from './config/config.js';

const PORT = config.PORT;

async function start() {
  try {
    await db.$connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

start();
