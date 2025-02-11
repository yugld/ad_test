import axios from 'axios';
import { Item, ApiError } from './types';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get('/items');
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const createItem = async (newItem: Item): Promise<Item> => {
  try {
    const { data } = await api.post<Item>('/items', newItem);
    return data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getItemById = async (id: number): Promise<Item | ApiError> => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateItem = async (
  id: number,
  updatedItem: Item
): Promise<Item | ApiError> => {
  try {
    const response = await api.put(`/items/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const deleteItem = async (id: number) => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data || { error: 'Произошла ошибка запроса.' };
    } else if (error.request) {
      return { error: 'Не удалось получить ответ от сервера.' };
    }
  }
  return { error: 'Произошла неизвестная ошибка.' };
};
