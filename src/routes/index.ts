import express from 'express';
import teachers from './api/teachers';
import students from './api/students';
import images from './api/images';

import { logger } from '../utilities/logger';

const routes = express.Router();

routes.get('/', logger, (req, res) => {
  res.send('connected!');
});

routes.use('/teachers', teachers);
routes.use('/students', students);
routes.use('/images', images);

export default routes;
