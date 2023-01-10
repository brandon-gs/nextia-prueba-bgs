import MessageResponse from "./MessageResponse";

export interface DefaultError extends MessageResponse {
  stack?: string;
}

type ErrorResponse = DefaultError;

export default ErrorResponse;
