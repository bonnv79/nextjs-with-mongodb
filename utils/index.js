const DEV_URL = process.env.DEV_URL;
const PROD_URL = process.env.PROD_URL;

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getUrl = (path) => {
  let res = path;
  if (DEV_URL) {
    res = `${DEV_URL}${path}`
  }
  if (PROD_URL) {
    res = `${PROD_URL}${path}`
  }
  console.log(res)
  return res;
}

export default {}