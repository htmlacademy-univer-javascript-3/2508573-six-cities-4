import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { addErrorMessage } from '../store/errors/ErrorsSlice';
import { ApiRoutes } from '../Constants';

let store: ToolkitStore;

export const injectStore = (_store: ToolkitStore) => {
  store = _store;
};

type DetailMessageType = {
  type: string;
  message: string;
};

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) =>
  !!StatusCodeMapping[response.status] &&
  !(
    response.config.url === ApiRoutes.Login && response.config.method === 'get'
  );

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

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        store.dispatch(addErrorMessage(detailMessage.message));
      }

      throw error;
    }
  );
  return api;
};
