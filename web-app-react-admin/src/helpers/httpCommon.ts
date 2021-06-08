
import axios from "axios";
import { env } from '@/environments/config';
import { PATH } from '@/constants/paths'

import history from '@/history';



export type Method = "GET" | "POST" | "PUT" | "GET" | "DELETE";

export function getProfile() {
  let userStorage = getUserStorage()
  return userStorage.profile;
}


export function getUserStorage() {
  const oidcUser = sessionStorage.getItem(`oidc.user:${env.baseApiUrl}:${env.clientId}`);
  const userStorage = oidcUser ? JSON.parse(oidcUser) : null;

  return userStorage;
}

async function callApi(method: Method, path: string, body?: any, baseApi?: string): Promise<any> {
  let userStorage = getUserStorage()
  let apiPath = `api/${path}`;

  if (userStorage && userStorage.access_token) {
    return _callApi(userStorage.access_token, method, apiPath, body, baseApi).then((rsp) => response(rsp)).catch(error => {
      if (error.response.status === 401 || error.response.status === 403) {
        history.push(PATH.error401)
        console.log("Un Unauthorized");
      }
      throw error;
    }).catch((error) => response(error.response));
  }
  // else if (user) {
  //   return authService.signInSilent().then(renewedUser => {
  //     return _callApi(renewedUser.access_token, method, path, body, baseApi).then((rsp) => response(rsp)).catch(error => {
  //       if (error.response.status === 401) {
  //         console.log("Un Unauthorized");
  //       }
  //       throw error;
  //     });
  //   });
  // } 
  else {
    throw new Error('user is not logged in');
  }
}

async function _callApi(token: string, method: Method, path: string, body?: any, baseApi?: string): Promise<any> {
  const config = {
    baseURL: baseApi ? baseApi : env.baseApiUrl,
    headers: {
      "Accept": 'application/json',
      "Content-type": "application/json; charset=utf-8",
      "Authorization": 'Bearer ' + token
    }
  }
  const http = axios.create(config);
  switch (method) {
    case "GET":
      return await http.get(path);
    case "POST":
      return await http.post(path, body);
    case "PUT":
      return await http.put(path, body);
    case "DELETE":
      return await http.delete(path);
  }
}

function response(rsp) {
  return rsp.data;
}

export const GET = async (path: string, baseApi?: string) => {
  return await callApi("GET", path, null, baseApi)
};

export const POST = async (path: string, body, baseApi?: string) => {
  return await callApi("POST", path, body, baseApi)
};

export const PUT = async (path: string, body, baseApi?: string) => {
  return await callApi("PUT", path, body, baseApi)
};

export const DELETE = async (path: string, baseApi?: string) => {
  return await callApi("DELETE", path, null, baseApi)
};




