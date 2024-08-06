export const request = <U, T extends any = {}>(
  url: string,
  init?:
    | (Omit<RequestInit, "body"> & { body?: T; queryParams?: any })
    | undefined
): Promise<U> => {
  let method = init?.method;
  if (!method) {
    method = init?.body ? "POST" : "GET";
  }
  if (init?.queryParams) {
    const params = new URLSearchParams(init.queryParams);
    url = `${url}?${params}`;
  }
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  }).then(async (response) => {
    if (response?.ok) {
      try {
        const payload = await response.json();
        return payload;
      } catch (e) {
        return response;
      }
    }

    let error = "Something went wrong";

    if (typeof response.json === "function") {
      try {
        error = (await response.json()).error;
      } catch (e) {}
    }

    return Promise.reject({
      error,
      status: response.status,
      statusText: response.statusText,
    });
  });
};
