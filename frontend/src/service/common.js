import api from "../api/axios.js"

export const getUser = async () => {
  const res = await api.get("/auth/me");
  return res.data
}

export const getUsers = async () => {
  const res = await api.get("/auth/users");
  return res.data
}