import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import Navbar from '../components/common/Navbar.jsx';
import { createProjectApi } from '../api/projectsApi.js';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import { useAuth } from '../context/authContext.jsx';
import ProjectFormModal from '../components/projects/ProjectFormModal.jsx';
import useProjects from '../hooks/useProjects.jsx';

function Dashboard() {
  const { user } = useAuth();
  const { projects, loading, error, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (error) toast.error(error)
  }, [error]);

  const handleSubmit = async (formData) => {
    try {
      const data = await createProjectApi(formData);
      toast.success(data.message);
      getData();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-5xl mx-auto mt-8'>
        {user.role === "admin" && (
        <div className='flex justify-end px-6 mb-6'>
          <ProjectFormModal
            onSubmit={handleSubmit}
            closeModal={() => setShowModal(false)}
          />
        </div>
        )}

        {!loading && (<h3 className='text-2xl text-center'>Projects</h3>)}

        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:px-0 mt-4'>
          {projects.map(project => (
            <li key={project._id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>

        {loading && (
          <p className='text-center text-base-content/50'>Loading...</p>
        ) || projects.length === 0 && (
          <p className='text-center text-base-content/50'>No projects yet</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard