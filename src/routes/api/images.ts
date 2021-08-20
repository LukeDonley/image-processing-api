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

  const path = resolve(`assets/${width}-${height}-${filename}`);

  // Check if file already exists
  if (!existsSync(path)) {
    // If not, resize original file
    sharp(`assets/${filename}`)
      .resize(parseInt(width), parseInt(height))
      // Save resized file and send it
      .toFile(path, (err) => {
        if (err) {
          res.send(err).status(500);
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
