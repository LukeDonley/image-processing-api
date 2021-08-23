import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 5000;

const logStream = fs.createWriteStream(
  path.join(__dirname, '../log/access.log'),
  {
    flags: 'a'
  }
);

app.use(morgan('common', { stream: logStream }));
app.use('/api', routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
