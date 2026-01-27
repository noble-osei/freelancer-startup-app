import api from "../api/axios.js"

export const getUser = async () => {
  const res = await api.get("/auth/me");
  return res.data
}