/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {store} from '@emedic/store';
import {logoutUser, updateAppUserState} from '@emedic/store/user/action';
import axios from 'axios';
import localforage from 'localforage';

const config = {
  development: {
    REACT_APP_API_URL: '',
  },
  production: {
    REACT_APP_API_URL: '',
  },
};

export const {REACT_APP_API_URL} = config[import.meta.env.REACT_APP_ENV || import.meta.env.MODE];

export const httpClient = axios.create({
  baseURL: REACT_APP_API_URL,
});

httpClient.interceptors.request.use(async requestConfig => {
  const token = await localforage.getItem<string>('accessToken');
  if (token?.length > 0) {
    requestConfig.headers.set('Authorization', `Bearer ${token}`);
  }
  return requestConfig;
});

let isRefreshingToken = false;

const refreshExpiredToken = async (refresh_token: string) => {
  try {
    const {data} = await axios.get(
      `${REACT_APP_API_URL}/auth/refresh-token?token=${refresh_token}`,
      {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      },
    );
    return data;
  } catch (error) {
    store?.dispatch(logoutUser());
    return undefined;
  }
};

export async function httpRequest<T>(request: () => Promise<T>): Promise<T> {
  // @todo fix
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request();
      resolve(response);
    } catch (error) {
      if (error?.response?.status === 401 || error?.status === 401) {
        // refresh token here
        const originalRequest = error.response?.config || error.body?.config;

        if (!isRefreshingToken) {
          isRefreshingToken = true;
          const appRefreshToken = await localforage.getItem('refreshToken');
          delete httpClient.defaults.headers.common.Authorization;
          try {
            const res = await refreshExpiredToken(appRefreshToken as string);
            if (res) {
              const {accessToken, refreshToken} = res;

              localforage.setItem('refreshToken', refreshToken);
              localforage.setItem('isRefreshingToken', false);
              isRefreshingToken = false;
              localforage.setItem('accessToken', accessToken);
              httpClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
              if (accessToken) {
                store?.dispatch(
                  updateAppUserState({
                    accessToken: accessToken as string,
                  }),
                );
              }

              originalRequest.headers.Authorization = `Bearer ${token}`;
              const response = await axios(originalRequest);
              resolve(response?.data || response);
            } else {
              isRefreshingToken = false;
            }
          } catch (error2) {
            isRefreshingToken = false;
            await localforage.setItem('isRefreshingToken', false);
            reject(error);
          }
        } else {
          setTimeout(async () => {
            const newToken = await localforage.getItem('accessToken');

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            const response = await axios(originalRequest);
            resolve(response?.data || response);
          }, 2000);
        }
      } else {
        reject(error);
      }
    }
  });
}

function timeoutPromise<T>(ms: number, promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error = new Error('We experienced a timeout, please try again.');
      error.name = 'TimeoutError';
      error.response = {
        data: {
          message: 'We experienced a timeout, please try again.',
        },
        status: 409,
      };
      reject(error);
    }, ms);
    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}

export async function apiWrapper<T>(request: () => Promise<T>) {
  const response = await timeoutPromise(60000, httpRequest(request));
  return response;
}

export const handleAccessToken = async () => {
  const token = await localforage.getItem('accessToken');
  httpClient.defaults.headers.common.Authorization = token ? `Bearer ${token}` : null;
};

export const instanceInterceptors = async () => {
  httpClient.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      const refreshToken = await localforage.getItem('refreshToken');
      if (refreshToken && error.response?.status === 401 && !originalRequest._retry) {
        if (!isRefreshingToken) {
          isRefreshingToken = true;
          originalRequest._retry = true;
          delete httpClient.defaults.headers.common.Authorization;
          const res = await refreshExpiredToken(refreshToken as string);
          if (res) {
            await localforage.setItem('accessToken', res.accessToken);
            isRefreshingToken = false;
            httpClient.defaults.headers.common.Authorization = `Bearer ${res.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
            return httpClient(originalRequest);
          }
          store.dispatch(logoutUser());
        } else {
          setTimeout(async () => {
            const accessToken = await localforage.getItem('accessToken');

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return httpClient(originalRequest);
          }, 2000);
        }
      }
      return Promise.reject(error);
    },
  );
};
