export const appConfig = {
  apiUrl: import.meta.env.APP_API_URL +'/api' || "http://localhost:3100",
  xTenant: import.meta.env.APP_X_TENANT || "default_tenant",
};
