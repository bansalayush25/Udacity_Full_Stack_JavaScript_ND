import supertest from 'supertest';
import app from '../index';
import processParameters from '../utilities/process';

const path = require('path');
const fs = require('fs');

const imageInputDir = '/images/full/';
const imageOutputDir = '/images/thumb/';
const baseImagePath = path.resolve(__dirname + '/../../');
const filename = 'fjord';
const width = 500;
const height = 200;

const request = supertest(app);
describe('Test endpoint responses', (): void => {
  it('Gets the main endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Gets the api endpoint', async () => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
  });

  it('Gets the images endpoint with no image', async () => {
    const response = await request.get('/api/images');
    expect(response.status).toBe(400);
  });

  it('Gets the images endpoint with image', async () => {
    const response = await request.get('/api/images?filename=fjord');
    expect(response.status).toBe(400);
  });
});

describe('Errors', (): void => {
  it('Should throw Empty filename error', (): void => {
    const promise = processParameters(undefined as unknown as string, 0, 0);
    promise.catch((err) => {
      expect(err).toEqual('Empty Filename');
    });
  });

  it('Should throw No image exists error', (): void => {
    const promise = processParameters('', 0, 0);
    promise.catch((err) => {
      expect(err).toEqual('No such image exists');
    });
  });

  it('Should throw invalid parameter error with 0 height', (): void => {
    const promise = processParameters(filename, width, 0);
    promise.catch((err) => {
      expect(err).toEqual('Invalid height or width');
    });
  });

  it('Should throw invalid parameter error with undefined width', (): void => {
    const promise = processParameters(
      filename,
      undefined as unknown as number,
      height
    );
    promise.catch((err) => {
      expect(err).toEqual('Invalid height or width');
    });
  });

  const inputLoc = `${baseImagePath}${imageInputDir}${filename}.jpg`;

  it('Should throw NaN error', (): void => {
    const promise = processParameters(
      filename,
      undefined as unknown as number,
      undefined as unknown as number
    );
    promise.catch((err) => {
      expect(err).toEqual('Width or height is missing or not a number');
    });
  });
});

describe('Output file', (): void => {
  const outputLoc = `${baseImagePath}${imageOutputDir}${filename}_thumb-${width}x${height}.jpg`;

  const promise = processParameters(filename, width, height);
  it('Should show resized output file', (): void => {
    promise.then((output) => {
      expect(output).toEqual(outputLoc);
    });
  });

  it('Should show existing output file', (): void => {
    promise.then((output) => {
      expect(fs.existsSync(outputLoc)).toBeTrue();
    });
  });
});
