import api from "./axios.js";

export const fetchTasksApi = async (projectId) => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data
};

export const createTaskApi = async (projectId, formData) => {
  const res = await api.post(`/projects/${projectId}/tasks`, formData);
  return res.data
};

export const fetchTaskApi = async (projectId, taskId) => {
  const res = await api.post(`/projects/${projectId}/tasks/${taskId}`);
  return res.data
};

export const updateTaskApi = async (projectId, taskId, formData) => {
  const res = await api.patch(`/projects/${projectId}/tasks/${taskId}`, formData);
  return res.data
};

export const deleteTaskApi = async (projectId, taskId) => {
  const res = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
  return res.data
}