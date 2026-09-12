import { ApiError } from "./api-error";
export const handleApiError = (error: unknown) => {
  if (error instanceof ApiError) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: error.statusCode,
      },
    );
  }
  console.log(error);
  return Response.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
};
