const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export function getStrapiURL(path = '') {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url) {
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

export async function fetchAPI(path, options = {}) {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const requestUrl = getStrapiURL(`/api${path}`);
  
  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'An error occurred while fetching data');
  }

  const data = await response.json();
  return data;
}

export async function fetchAPIWithAuth(path, token, options = {}) {
  return fetchAPI(path, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
