import sharp, { Sharp } from 'sharp';

export const resizeImage = (
  filename: string,
  width: number,
  height: number
): Sharp => {
  const resizeParams = {
    ...(width && { width }),
    ...(height && { height })
  };

  return sharp(`assets/${filename}`).resize(resizeParams);
};

export const trimImage = (imageData: Sharp): Sharp => {
  return imageData.trim();
};
