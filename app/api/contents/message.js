const MESSAGE = {
  // Success
  SUCCESS: "Request successful",
  CREATED: "Resource created successfully",
  UPDATED: "Resource updated successfully",
  DELETED: "Resource deleted successfully",
  FETCHED: "Data fetched successfully",

  // Client Errors
  BAD_REQUEST: "Invalid request data",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access denied",
  NOT_FOUND: "Resource not found",
  CONFLICT: "Resource already exists",
  VALIDATION_ERROR: "Validation failed",

  // Server Errors
  SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
};

export default Object.freeze(MESSAGE);
