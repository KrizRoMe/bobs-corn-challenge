export type ApiResult<T> = {
  isDone: boolean;
  data: T | null;
  errorMessage?: string;
  status?: number;
};

export async function getApiResponse<T>(
  response: Response,
): Promise<ApiResult<T>> {
  const payload: ApiResult<T> = {
    isDone: false,
    data: null,
  };

  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const errorMessage = data?.error?.message || "Error en la solicitud";
    const status = response.status;

    payload.errorMessage = errorMessage;
    payload.status = status;

    return payload;
  }

  payload.data = data;
  payload.isDone = true;

  return payload;
}
