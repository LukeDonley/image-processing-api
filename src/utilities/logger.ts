import express from 'express';

export const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const url = req.url;
  console.log(url);
  next();
};
