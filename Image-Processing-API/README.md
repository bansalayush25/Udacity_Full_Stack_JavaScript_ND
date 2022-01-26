# Image Processing API

This project uses NodeJs and Typescript to read images on disk, resize the image and save resized images on disk. If the resized image is already present on disk, that image is directly shown through NodeJS.

## Getting Started

The images are available in images/full and the resized images will be saved in images/thumb. Typescript files are present under src and the js generated files are under build dir.

## Instructions

The following scripts are available:

1. `npm run start`: Server is launched through typescript files using nodemon.
2. `node build/index.js`: Server is launched through js files
3. `npm run test`: Tests are executed using supertest and jasmine.
4. `npm run prettier`: Run prettier module on JS Files.
5. `npm run lint`: Run es-lint.

## Endpoint Access

Thee following endpoints are available:

1. `localhost:3000/` - Welcome page
2. `localhost:3000/api` - Page explaining the working endpoint
3. `localhost:3000/api/images?filename={}&width={}&height={}` - Working endpoint based on the parameters passed. It should handle the cases even if there is any problem in the parameters.