import { EMPTY_FUNCTION } from "contants";

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
  return path;
}

export const getAPI = async (url, options = {}, success = EMPTY_FUNCTION, error = EMPTY_FUNCTION, loading = EMPTY_FUNCTION) => {
  try {
    loading(true);
    return await fetch(getUrl(url), {
      method: 'GET',
      ...options
    }).then(res => res.json()).then(data => {
      if (data.success) {
        success(data);
      } else {
        error(data);
      }
      loading(false);
    })
  } catch (error) {
    console.error(error);
    loading(false);
  }
}

export const postAPI = async (url, options = {}, success = EMPTY_FUNCTION, error = EMPTY_FUNCTION, loading = EMPTY_FUNCTION) => {
  try {
    loading(true);
    return await fetch(getUrl(url), {
      method: 'POST',
      ...options
    }).then(res => res.json()).then(data => {
      if (data.success) {
        success(data);
      } else {
        error(data);
      }
      loading(false);
    })
  } catch (error) {
    console.error(error);
    loading(false);
  }
}

export const putAPI = async (url, options = {}, success = EMPTY_FUNCTION, error = EMPTY_FUNCTION, loading = EMPTY_FUNCTION) => {
  try {
    loading(true);
    return await fetch(getUrl(url), {
      method: 'PUT',
      ...options
    }).then(res => res.json()).then(data => {
      if (data.success) {
        success(data);
      } else {
        error(data);
      }
      loading(false);
    })
  } catch (error) {
    console.error(error);
    loading(false);
  }
}

export const deleteAPI = async (url, options = {}, success = EMPTY_FUNCTION, error = EMPTY_FUNCTION, loading = EMPTY_FUNCTION) => {
  try {
    loading(true);
    return await fetch(getUrl(url), {
      method: 'DELETE',
      ...options
    }).then(res => res.json()).then(data => {
      if (data.success) {
        success(data);
      } else {
        error(data);
      }
      loading(false);
    })
  } catch (error) {
    console.error(error);
    loading(false);
  }
}

export default {}