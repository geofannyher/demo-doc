export const saveSession = (token: string) => {
  localStorage.setItem("idLapor", token);
};

export const getSession = () => {
  return localStorage.getItem("idLapor");
};

export const clearSession = () => {
  localStorage.removeItem("idLapor");
};
