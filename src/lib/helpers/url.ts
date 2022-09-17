const API_URL     = import.meta.env.VITE_API_URL;
const API_VERSION = `${import.meta.env.VITE_API_VERSION}`;

/**
 * Base api url
 */
export const BASE_API_URL = `${API_URL}/api/${API_VERSION}`;
