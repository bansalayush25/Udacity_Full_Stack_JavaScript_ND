const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const imageInputDir = '/images/full/';
const imageOutputDir = '/images/thumb/';

async function resize(
  inputLoc: string,
  outputLoc: string,
  width: number,
  height: number
): Promise<string> {
  try {
    await sharp(inputLoc).resize(width, height).toFile(outputLoc);
    return outputLoc;
  } catch (err) {
    throw 'Error while resizing';
  }
}

async function processParameters(
  filename: string,
  width: number,
  height: number
): Promise<string> {
  const baseImagePath = path.resolve(__dirname + '/../../');
  const inputLoc = `${baseImagePath}${imageInputDir}${filename}.jpg`;
  const outLoc = `${baseImagePath}${imageOutputDir}${filename}_thumb-${width}x${height}.jpg`;

  if (fs.existsSync(outLoc)) {
    return outLoc;
  } else if (!fs.existsSync(inputLoc)) {
    var error: string;
    if (filename == undefined) error = 'Empty Filename';
    else error = 'No such image exists';
    throw error;
  } else if (isNaN(height) || isNaN(height)) {
    throw 'Width or height is missing or not a number';
  } else if (height <= 0 || width <= 0) {
    throw 'Invalid height or width';
  } else {
    return resize(inputLoc, outLoc, width, height);
  }
}

export default processParameters;
