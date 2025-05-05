export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  // Remove extra quotes if they exist
  const cleanedToken = token ? token.replace(/^"(.*)"$/, '$1') : null;

  console.log(cleanedToken)
  if (!cleanedToken) {
    throw new Error("No token found, please login again.");
  }

  return {
    Authorization: `${cleanedToken}`,
  };
};
