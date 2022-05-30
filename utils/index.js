export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const getUrl = (context, path) => {
  const { req } = context;
  if (req && req.headers && req.headers.host) {
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
    return baseUrl + path;
  }
  return path;
}

export default {}