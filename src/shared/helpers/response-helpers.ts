import { NextResponse } from "next/server";

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: { message } }, { status });
}

export function successResponse<T>(
  payload?: T | null,
  message = "Operación realizada con éxito",
  status = 200,
) {
  const data = { success: true, message, payload };
  return NextResponse.json(data, { status });
}
