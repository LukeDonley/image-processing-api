import express from 'express';
const teachers = express.Router();
import { logger } from '../../utilities/logger';

teachers.get('/', logger, (req, res) => {
  res.send('teachers route');
});

export default teachers;
