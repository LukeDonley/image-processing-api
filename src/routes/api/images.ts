import express from 'express';
import { existsSync } from 'fs';
import { resolve } from 'path';
import getProcessedPath from '../../utilities/getProcessedPath';
import { resizeImage, trimImage } from '../../utilities/processImage';

const images = express.Router();

interface imageParams extends express.Request {
  query: {
    filename: string;
    width: string;
    height: string;
    trim: string;
  };
}

images.get('/', async (req: imageParams, res: express.Response) => {
  const { filename, trim, width, height } = req.query;

  if (!filename) {
    return res.send('Images Endpoint: Provide Filename');
  }

  // Check that the original file exists
  if (!existsSync(resolve(`assets/${filename}`))) {
    return res.status(404).send('Error: Image Not Found');
  }

  const trimmed: boolean = trim ? true : false;

  const processedPath = getProcessedPath(+width, +height, filename, trimmed);

  // Check if processed file already exists
  if (existsSync(processedPath)) {
    return res.sendFile(resolve(processedPath));
  }

  // If not, process original file
  try {
    let result = resizeImage(filename, +width, +height);
    if (trimmed) {
      result = trimImage(result);
    }
    await result.toFile(processedPath);
    return res.sendFile(processedPath);
  } catch (err) {
    return res.status(500).send(err);
  }
});

export default images;
