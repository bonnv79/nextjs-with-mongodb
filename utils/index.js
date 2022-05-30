const DEV_URL = process.env.DEV_URL;
const PROD_URL = process.env.PROD_URL;

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getUrl = (path, context) => {
  const { req } = context || {};
  if (req && req.headers && req.headers.host) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    return baseUrl + path;
  }
  if (DEV_URL) {
    return `${DEV_URL}${path}`
  }
  if (PROD_URL) {
    return `${PROD_URL}${path}`
  }
  return path;
}

export default {}