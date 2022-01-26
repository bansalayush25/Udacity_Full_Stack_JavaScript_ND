import express from 'express';
import { promises as fsPromises } from 'fs';
import processParameters from './process';

const middleware = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  let query = req.query;
  const filename: string = query['filename'] as string;
  const width: number = parseInt(query['width'] as unknown as string);
  const height: number = parseInt(query['height'] as unknown as string);

  processParameters(filename, width, height)
    .then((outputLoc) => {
      fsPromises.readFile(outputLoc).then((data) => {
        res.write(data);
        res.end();
        next();
      });
    })
    .catch((err) => {
      res.writeHead(400, { 'Content-type': 'text/html' });
      res.write(err);
      res.end();
      next();
    });
};

export default middleware;
