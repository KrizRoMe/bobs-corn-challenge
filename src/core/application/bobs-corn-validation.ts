export const validateClientId = (clientId: unknown): string => {
  if (typeof clientId !== "string" || clientId.trim().length === 0) {
    throw new Error("Invalid clientId, must be a non-empy string");
  }
  return clientId;
};

export const validateLimit = (limit: unknown): number => {
  if (typeof limit !== "number" || limit < 1) {
    throw new Error("Invalid limit, must be a number greater than 0");
  }
  return limit;
};
