import axiosApi from "./axios";
export const loginRequest = async ({ email, password }) => {
  return axiosApi.patch("http://localhost:8080/api/login", {
    email,
    password,
  });
};
