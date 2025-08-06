import { customFetchOptions } from "./typings/types.js";

const customFetch = async <T>(options: customFetchOptions): Promise<T> => {
  const url = `${process.env.MARKTPLAATS_BASE_URL}${options.path}`;

  const requestOptions: RequestInit = {
    method: options.method,
    headers: {
      accept: "*/*",
      "cache-control": "no-cache",
      origin: process.env.MARKTPLAATS_BASE_URL,
      pragma: "no-cache",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Not)A;Brand";v="8", "Chromium";v="138", "Microsoft Edge";v="138"',
      // "sec-ch-ua-arch": '"x86"',
      // "sec-ch-ua-bitness": '"64"',
      // "sec-ch-ua-full-version": '"138.0.3351.83"',
      // "sec-ch-ua-full-version-list":
      //   '"Not)A;Brand";v="8.0.0.0", "Chromium";v="138.0.7204.101", "Microsoft Edge";v="138.0.3351.83"',
      "sec-ch-ua-mobile": "?0",
      // "sec-ch-ua-model": '""',
      "sec-ch-ua-platform": '"Windows"',
      // "sec-ch-ua-platform-version": '"10.0.0"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      // "sec-fetch-user": "?1",
      // "upgrade-insecure-requests": "1",
      "user-agent": process.env.USER_AGENT,
    },
  };

  if (options.additionalHeaders)
    requestOptions.headers = {
      ...requestOptions.headers,
      ...options.additionalHeaders,
    };

  if (options.body) requestOptions.body = JSON.stringify(options.body);

  const res = await fetch(url, requestOptions);

  const data = await res.json();

  if (res.status !== 200) {
    console.log(res);
    console.log(data);
    throw new Error(
      `Bad response from the site (${res.status}). ${res.statusText}`
    );
  }

  return data;
};

export default customFetch;
