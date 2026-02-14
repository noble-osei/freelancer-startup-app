import React, { useState } from 'react'
import { fetchProjectsApi } from '../api/projectsApi.js';

function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchProjectsApi();
      setProjects(data.projects);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  };

  return { projects, loading, error, fetchProjects }
}

export default useProjects