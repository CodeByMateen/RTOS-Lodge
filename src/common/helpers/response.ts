import { HttpStatus } from "@nestjs/common";

export interface Response {
  response: string;
  status: boolean;
  status_code: number;
  data: any;
}

export function resSuccess(
  message: string,
  status: boolean,
  statusCode: number,
  data: any,
): Response {
  return {
    status,
    response: message,
    status_code: statusCode,
    data: data,
  };
}

export function resError(
  message: string,
  status: boolean,
  statusCode: number,
): Response {
  return {
    status,
    response: message,
    status_code: statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    data: null,
  };
}
