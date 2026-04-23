const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await response.json();

  if (!response.ok || (data.errorMassage && data.errorMassage.length > 0)) {
    throw new Error(data.errorMassage?.[0] || `API Error: ${response.status}`);
  }
  return data.data; 
};