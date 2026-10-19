import { handleApiError } from "./api-error-handler";

type ApiHandler<Context = unknown> = (
  request: Request,
  context: Context,
) => Promise<Response>;

export function apiHandler<Context = unknown>(handler: ApiHandler<Context>) {
  return async (request: Request, context: Context): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error);
    }
  };
}
