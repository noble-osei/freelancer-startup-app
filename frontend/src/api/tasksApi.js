import api from "./axios.js";

export const fetchTasks = async (projectId) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data
};

export const createTask = async (projectId, formData) => {
  const res = await api.post(`/projects/${projectId}/tasks`, formData);
  return res.data
};

export const fetchTask = async (projectId, taskId) => {
  const res = await api.post(`/projects/${projectId}/tasks/${taskId}`);
  return res.data
};

export const updateTask = async (projectId, taskId, formData) => {
  const res = await api.patch(`/projects/${projectId}/tasks/${taskId}`, formData);
  return res.data
};

export const deleteTask = async (projectId, taskId) => {
  const res = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  return res.data
}