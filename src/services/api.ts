import axios, { AxiosInstance } from 'axios';
import { getToken } from './token';
import { AsyncThunk } from '@reduxjs/toolkit';

const BACKEND_URL = 'https://14.design.htmlacademy.pro';

const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, never>

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>
