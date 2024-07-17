export const saveSession = (token: string) => {
  localStorage.setItem("idiknchat", token);
};

export const getSession = () => {
  return localStorage.getItem("idiknchat");
};

export const clearSession = () => {
  localStorage.removeItem("idiknchat");
};
