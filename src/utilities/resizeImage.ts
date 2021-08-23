import sharp, { OutputInfo } from 'sharp';

const resizeImage = async (
  filename: string,
  width: number,
  height: number,
  trimmed: boolean,
  resizedPath: string
): Promise<OutputInfo> => {
  const resizeParams = {
    ...(width && { width }),
    ...(height && { height })
  };

  let sharpResult = sharp(`assets/${filename}`).resize(resizeParams);
  if (trimmed) {
    sharpResult = sharpResult.trim();
  }
  // Save resized file
  return await sharpResult.toFile(resizedPath);
};

export default resizeImage;
