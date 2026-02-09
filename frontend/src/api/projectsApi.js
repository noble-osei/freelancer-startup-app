import api from "./axios.js";

export const fetchProjectsApi = async () => {
  const res = await api.get("/projects")
  return res.data
};

export const fetchProjectApi = async (projectId) => {
  const res = await api.get(`/projects/${projectId}`);
  return res.data
};

export const createProjectApi = async (data) => {
  const res = await api.post("/projects", data);
  return res.data
};

export const updateProjectApi = async (projectId, formData) => {
  const res = await api.patch(`/projects/${projectId}`, formData);
  return res.data
};

export const deleteProjectApi = async (projectId) => {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data
}