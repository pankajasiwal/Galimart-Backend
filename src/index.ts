import express from 'express';
import { config } from './config/config.ts';

const app = express();
const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`listening at port: ${PORT}`);
});
