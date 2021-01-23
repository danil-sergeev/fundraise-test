type FetchArgs = {
    endpoint: string;
    opts?: RequestInit;
    headers?: HeadersInit;
    payload?: any;
  };

console.info(process.env);

export const createApiEndpoint = (endpoint: string) => `${process.env.VUE_APP_SERVER_URL}/api${endpoint}`;

// eslint-disable-next-line no-underscore-dangle
export const _fetch = (args: FetchArgs) : Promise<Response> => {
  const {
    endpoint, payload, opts = {}, headers = {},
  } = args;

  return window.fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json;charset=utf-8',
      ...headers,
    },
    body: JSON.stringify(payload),
    ...opts,
  });
};
