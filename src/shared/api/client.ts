import { getApiResponse } from "./get-api-response";

export type ApiResult<T> = {
  isDone: boolean;
  data: T | null;
  errorMessage?: string;
  status?: number;
};

export const api = {
  get: async <T>(url: string, clientId: string): Promise<ApiResult<T>> => {
    const fetchOptions: RequestInit = {
      method: "GET",
      headers: {
        "x-client-id": clientId,
      },
    };

    const response = await fetch(url, fetchOptions);
    const payload = await getApiResponse<T>(response);

    return payload;
  },

  post: async <T>(
    url: string,
    body: unknown,
    clientId: string,
  ): Promise<ApiResult<T>> => {
    const fetchOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "x-client-id": clientId,
      },
    };

    const response = await fetch(url, fetchOptions);
    const payload = await getApiResponse<T>(response);

    return payload;
  },
};
