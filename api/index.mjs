import express from 'express';
import Assistant from '../assistant/index.mjs';
import {
  APP_DEBUG,
  APP_PORT,
} from '../config/index.mjs';

const assistant = new Assistant();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/webhook', async (req, res) => {
  await assistant.handleEvents(req.body.events);
  assistant.debug();
  res.sendStatus(200);
});

if (APP_DEBUG) {
  app.listen(APP_PORT);
}

export default app;