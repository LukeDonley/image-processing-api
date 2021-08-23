# Image Processing API

This API utilized the Sharp Module to provide and endpoint to resize and trim a variety of image files.

## Installation

Clone or download the GitHub repo, then from the root project director, run:

```bash
npm install
```

Then, to run in development mode:

```bash
npm run start
```

To build and run production code:

```bash
npm run build
node /build/index.js
```

## Usage

The API provides a single endpoint, allowing resizing and trimming of an existing image when various URL parameters are provided.

Once the API is running on port 5000, the image processing endpoint can be reached at:

[http://localhost:5000/api/images](http://localhost:5000/api/images)

Available images are located in the assets/ directory, located in the project root.

Processed images will be saved to the assets directory, with the dimensions appended to the filename, and the suffix '\_trimmed' if the file was trimmed.

i.e. `fjord(400x300)_trimmed.jpg`

If only one dimension parameter (height or width) is provided, the image will be scaled with the original ratio preserved.

The available query parameters are as follows:

#### filename

The name of the original file, including extension. Supported formats: JPEG, PNG, WebP, TIFF, GIF, and SVG images.

#### width

The desired width of the resulting image.

#### height

The desired height of the resulting image.

#### trim

Specifies trimming. A trimmed image will have unnecessary pixels removed from the outside of the image, for example solid borders. Set to 1 to apply trimming.

## Examples

Original image 1:

[http://localhost:5000/api/images?filename=fjord.jpg](http://localhost:5000/api/images?filename=fjord.jpg)

Resized to 400x300:

[http://localhost:5000/api/images?filename=fjord.jpg&width=400&height=300](http://localhost:5000/api/images?filename=fjord.jpg&width=400&height=300)

Original image 2:

[http://localhost:5000/api/images?filename=4TTp5.jpg](http://localhost:5000/api/images?filename=4TTp5.jpg)

Resized to width of 300 pixels, trimmed (removes black borders on top and bottom):

[http://localhost:5000/api/images?filename=4TTp5.jpg&width=300&trim=1](http://localhost:5000/api/images?filename=4TTp5.jpg&width=300&trim=1)

Original image 3 (PNG file):

[http://localhost:5000/api/images?filename=light.png](http://localhost:5000/api/images?filename=light.png)

Resized to 250x350, .png extension intact:

[http://localhost:5000/api/images?filename=light.png&width=250&height=350](http://localhost:5000/api/images?filename=light.png&width=250&height=350)

## Testing

To run the test suite, enter:

```bash
npm run test
```

This will build the project, then run tests on the resulting code using Jasmine Testing Framework
