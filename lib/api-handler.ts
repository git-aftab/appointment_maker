import { handleApiError } from "./api-error-handler";

type ApiHandler = (req: Request, context?: unknown) => Promise<Response>;

export function apiHandler(handler: ApiHandler) {
  return async (req: Request, context?: unknown): Promise<Response> => {
    try {
      return await handler(req, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
