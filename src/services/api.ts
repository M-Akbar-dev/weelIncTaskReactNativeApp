import { store, RootState } from '../redux/Store/store';
import { showLoader, hideLoader } from '../redux/slices/loaderSlice';
import { showToast } from '../redux/slices/toastSlice';

const BASE_URL = 'http://localhost:4000';

// Request configuration interface
export interface ApiRequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  showLoader?: boolean;
  showToast?: boolean;
  skipErrorToast?: boolean;
}

// API Response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Main API service function
 * Handles all HTTP requests with automatic loader and toast management
 */
export const apiCall = async <T = any>(
  endpoint: string,
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> => {
  const {
    method = 'GET',
    headers = {},
    body,
    showLoader: shouldShowLoader = true,
    showToast: shouldShowToast = true,
    skipErrorToast = false,
  } = config;

  // Show loader if enabled
  if (shouldShowLoader) {
    store.dispatch(showLoader());
  }

  try {
    const state: RootState = store.getState();
    const token = state.auth?.token;
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
    };
    console.log(headers , "AS?>A?SD>FA?SDF?ASD")

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      requestOptions.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text || 'Request completed' };
      }
    }

    if (shouldShowLoader) {
      store.dispatch(hideLoader());
    }

    if (response.ok) {
      if (shouldShowToast && data.message) {
        store.dispatch(showToast({ message: data.message, type: 'success' }));
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } else {
      const errorMessage = data.message || data.error || 'Something went wrong';

      if (shouldShowToast && !skipErrorToast) {
        store.dispatch(showToast({ message: errorMessage, type: 'error' }));
      }

      return {
        success: false,
        error: errorMessage,
        message: errorMessage,
      };
    }
  } catch (error: any) {
    if (shouldShowLoader) {
      store.dispatch(hideLoader());
    }
    const errorMessage = error.message || 'Network error. Please check your connection.';

    if (shouldShowToast && !skipErrorToast) {
      store.dispatch(showToast({ message: errorMessage, type: 'error' }));
    }

    return {
      success: false,
      error: errorMessage,
      message: errorMessage,
    };
  }
};

export const get = <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) => {
  return apiCall<T>(endpoint, { ...config, method: 'GET' });
};

export const post = <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) => {
  return apiCall<T>(endpoint, { ...config, method: 'POST', body });
};

export const put = <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) => {
  return apiCall<T>(endpoint, { ...config, method: 'PUT', body });
};

export const patch = <T = any>(endpoint: string, body?: any, config?: Omit<ApiRequestConfig, 'method' | 'body'>) => {
  return apiCall<T>(endpoint, { ...config, method: 'PATCH', body });
};

export const del = <T = any>(endpoint: string, config?: Omit<ApiRequestConfig, 'method' | 'body'>) => {
  return apiCall<T>(endpoint, { ...config, method: 'DELETE' });
};

export default {
  get,
  post,
  put,
  patch,
  delete: del,
  apiCall,
};

