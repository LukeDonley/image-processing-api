import express from 'express';
import { existsSync } from 'fs';
import { resolve, parse as pathParse } from 'path';
import resizeImage from '../../utilities/resizeImage';
import sizeOf from 'image-size';

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
  const { filename, trim } = req.query;
  let { width, height } = req.query;

  if (!filename) {
    return res.send('Images Endpoint: Provide Filename');
  }

  // Check that the original file exists
  if (!existsSync(resolve(`assets/${filename}`))) {
    return res.status(404).send('Error: Image Not Found');
  }

  // If either resize parameter is not
  // provided, return original file
  if (!width && !height) {
    return res.sendFile(resolve(`assets/${filename}`));
  }

  const dimensions: { height: number | undefined; width: number | undefined } =
    sizeOf(`assets/${filename}`);

  if (
    typeof dimensions.height !== 'number' ||
    typeof dimensions.width !== 'number'
  ) {
    return;
  }

  if (!width) {
    const ratio = parseInt(height) / dimensions.height;
    width = `${Math.floor(dimensions.width * ratio)}`;
  } else if (!height) {
    const ratio = parseInt(width) / dimensions.width;
    height = `${Math.floor(dimensions.height * ratio)}`;
  }

  const trimmed: boolean = trim ? true : false;
  const baseName = pathParse(filename).name;
  const extension = pathParse(filename).ext;
  const resizedPath = resolve(
    trimmed
      ? `assets/${baseName}_trimmed(${width}x${height})${extension}`
      : `assets/${baseName}(${width}x${height})${extension}`
  );

  // Check if resized file already exists
  if (!existsSync(resizedPath)) {
    // If not, resize original file
    try {
      const result = await resizeImage(
        filename,
        parseInt(width),
        parseInt(height),
        trimmed,
        resizedPath
      );
      console.log(result);
      return res.sendFile(resizedPath);
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    // If file exists, send it
    return res.sendFile(resizedPath);
  }
});

export default images;
