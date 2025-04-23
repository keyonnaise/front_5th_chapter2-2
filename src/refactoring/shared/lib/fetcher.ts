export class ApiError extends Error {
  public status: number;
  public info: any;

  constructor(status: number, message: string, info?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.info = info;
  }
}

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorInfo;
    try {
      errorInfo = await response.json();
    } catch {
      errorInfo = { message: "API 응답을 파싱할 수 없습니다." };
    }

    throw new ApiError(
      response.status,
      errorInfo.message || `HTTP 오류 ${response.status}`,
      errorInfo,
    );
  }

  // 빈 응답 처리 (204 No Content 등)
  if (response.status === 204) {
    return null as T;
  }

  // ContentType에 따른 응답 파싱
  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    const data = await response.json();
    return data;
  } else if (contentType.includes("text/")) {
    const text = await response.text();
    return text as unknown as T;
  }

  return response as unknown as T;
};
