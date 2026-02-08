import api from "./axios.js";

export const fetchProjects = async () => {
  const res = await api.get("/projects")
  return res.data
};

export const fetchProject = async (projectId) => {
  const res = await api.get(`/projects/${projectId}`);
  return res.data
};

export const createProject = async (data) => {
  const res = await api.post("/projects", data);
  return res.data
};

export const updateProject = async (projectId, formData) => {
  const res = await api.patch(`/projects/${projectId}`, formData);
  return res.data
};

export const deleteProject = async (projectId) => {
  const res = await api.delete(`/projects/${projectId}`);
  return res.data
}