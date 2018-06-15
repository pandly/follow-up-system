import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  throw new Error(response.subMsg);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  // if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
  //   if (!(newOptions.body instanceof FormData)) {
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json; charset=utf-8',
  //       ...newOptions.headers,
  //     };
  //     newOptions.body = JSON.stringify(newOptions.body);
  //   } else {
  //     // newOptions.body is FormData
  //     newOptions.headers = {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       ...newOptions.headers,
  //     };
  //   }
  // }
  if(newOptions.method === 'POST' || newOptions.method === 'PUT'){
    newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }
  
  
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return data
    })
    .catch(err => ({ err }));
}
