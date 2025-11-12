import { get, post, put, patch, del, apiCall } from './api';

export const getOrders = async () => {
  const response = await get('/orders');
  return response;
};

export const getOrdersw = async (Id: string) => {
  const response = await get(`/orders/${Id}`);
  if (response.success) {
    return response.data;
  }
  return null;
};

export const getItems = async () => {
  const response = await get('/items', { showLoader: false });
  return response;
};

export const registerExample = async (email: string, password: string) => {
  const response = await post('/auth/register', {
    email,
    password,
  });
  return response;
};

export const createItem = async (itemData: any) => {
  const response = await post('/items', itemData);
  if (response.success) {
    return response.data;
  }
  return null;
};

export const loginExample = async (email: string, password: string) => {
  const response = await post(
    '/auth/login',
    { email, password },
    { showToast: false }
  );
  return response;
};

export const updateUserProfile = async (userId: string, profileData: any) => {
  const response = await put(`/users/${userId}`, profileData);
  return response;
};

export const updateUserEmail = async (userId: string, email: string) => {
  const response = await patch(`/users/${userId}`, { email });
  return response;
};

export const deleteItem = async (itemId: string) => {
  const response = await del(`/items/${itemId}`);
  return response;
};

export const deleteItemSilently = async (itemId: string) => {
  const response = await del(`/items/${itemId}`, {
    skipErrorToast: true,
  });
  return response;
};

export const customApiCall = async () => {
  const response = await apiCall('/custom-endpoint', {
    method: 'POST',
    body: { custom: 'data' },
    headers: {
      'Custom-Header': 'custom-value',
    },
    showLoader: true,
    showToast: true,
    skipErrorToast: false, 
  });
  return response;
};


