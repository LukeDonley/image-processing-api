import express from 'express';
import sharp from 'sharp';
import { existsSync } from 'fs';
import { resolve } from 'path';

const images = express.Router();

interface imageParams {
  query: {
    filename: string;
    width: string;
    height: string;
  };
}

images.get('/', async (req: imageParams, res) => {
  const { filename, width, height } = req.query;

  if (!filename) {
    return res.send('images endpoint');
  }

  if (!existsSync(`assets/${filename}`)) {
    return res.status(404).send('Error: Image Not Found');
  }

  if (!width || !height) {
    return res.sendFile(resolve(`assets/${filename}`));
  }

  const path = resolve(`assets/${filename}(${width}x${height}).jpg`);

  // Check if resized file already exists
  if (!existsSync(path)) {
    // If not, resize original file
    sharp(`assets/${filename}`)
      .resize(parseInt(width), parseInt(height))
      // Save resized file and send it
      .toFile(path, (err) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.sendFile(resolve(path));
        }
      });
  } else {
    // If file exists, send it
    res.sendFile(resolve(path));
  }
});

export default images;
