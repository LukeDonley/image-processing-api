import sizeOf from 'image-size';
import { resolve, parse as pathParse } from 'path';

const getProcessedPath = (
  width: number | undefined,
  height: number | undefined,
  filename: string,
  trimmed: boolean
): string => {
  // Get dimensions of original file
  const dimensions: { height: number | undefined; width: number | undefined } =
    sizeOf(`assets/${filename}`);

  // If either resize parameter is not
  // provided, return original file
  if (!width && !height) {
    if (!trimmed) {
      return `assets/${filename}`;
    } else {
      width = dimensions.width;
      height = dimensions.height;
    }
  }

  if (
    typeof dimensions.height !== 'number' ||
    typeof dimensions.width !== 'number'
  ) {
    return `assets/${filename}`;
  }

  if (
    !trimmed &&
    ((!height && width === dimensions.width) ||
      (!width && height === dimensions.height))
  ) {
    return `assets/${filename}`;
  }

  // Get values for scaling if height or width are not provided
  if (!width && height) {
    width = Math.ceil(dimensions.width * (height / dimensions.height));
  } else if (!height && width) {
    const ratio = width / dimensions.width;
    height = Math.ceil(dimensions.height * ratio);
  }

  const baseName = pathParse(filename).name;
  const extension = pathParse(filename).ext;
  const ProcessedPath = resolve(
    trimmed
      ? `assets/${baseName}(${width}x${height})_trimmed${extension}`
      : `assets/${baseName}(${width}x${height})${extension}`
  );

  return ProcessedPath;
};

export default getProcessedPath;
