const fs = require('fs');

export const readFile = (path: string, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err: boolean, data: string) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

export const writeFile = (path: string, data: string, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err: string) => {
      if (err) reject(err);
      else resolve();
    });
  });
