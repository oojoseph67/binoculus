import { HttpStatus } from '@nestjs/common';
import { isAxiosError } from 'axios';

export function getError({
  error,
  httpStatus,
}: {
  error: any;
  httpStatus?: HttpStatus;
}): {
  errorPayload: any;
  status: number;
} {
  const errorPayload = isAxiosError(error)
    ? {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      }
    : error;

  // console.log({
  //   status: error.response?.status,
  //   data: error.response?.data,
  //   message: error.message,
  // });

  const status = isAxiosError(error)
    ? HttpStatus.BAD_GATEWAY
    : httpStatus != null
      ? httpStatus
      : HttpStatus.INTERNAL_SERVER_ERROR;

  return {
    errorPayload,
    status,
  };
}
