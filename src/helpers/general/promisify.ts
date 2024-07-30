export const promisify = (fn: Function) => {
  return (...args: any) =>
    new Promise((resolve, reject) => {
      fn(...args, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
};
