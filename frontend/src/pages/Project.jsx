import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'

import { deleteProject, fetchProject, updateProject } from '../api/projectsApi.js';
import { fetchTasks, createTask } from '../api/tasksApi.js';
import Navbar from '../components/common/Navbar.jsx';
import TasksCard from '../components/tasks/TaskCard.jsx';
import CreateTask from '../components/tasks/TaskFormModal.jsx';
import { useAuth } from '../context/authContext.jsx';
import ProjectFormModal from '../components/projects/ProjectFormModal.jsx';
import TaskFormModal from '../components/tasks/TaskFormModal.jsx';

function ProjectPage() {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  async function getData() {
    try {
      const data = await fetchProject(projectId);
      setProject(data.project)

      const data1 = await fetchTasks(projectId);
      setTasks(data1.tasks)
    } catch (error) {
      toast.error("Error: " + error.message)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async (formData) => {
    try {
      const data = await createTask(projectId, formData);
      toast.success(data.message);
      getData()
    } catch (error) {
      const message = error.response.data.message || "Something went wrong. Try Again!"
      toast.error(message);
    }
  };

  const handleProjectUpdate = async (formData) => {
    try {
      const data = await updateProject(projectId, formData);
      toast.success(data.message);
      getData();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  const handleProjectDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      const data = await deleteProject(project._id);
      toast.success(data.message);
      navigate("/dashboard", { replace: true })
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-5xl mx-auto mt-8'>
        <div className='flex items-center justify-between px-6'>
          <Link to={"/dashboard"} className='btn btn-ghost'>Back to Projects</Link>

          <TaskFormModal
            onSubmit={handleSubmit}
            closeModal={() => setShowModal(false)}
          />
        </div>

        <div className="card  mb-8">
          <div className="card-body">
            <h4 className='card-title text-2xl'>{project.title}</h4>

            {user.role === "admin" && project?.title && (<div className="card-actions">
              <ProjectFormModal
                onSubmit={handleProjectUpdate}
                projectData={project}
              />
              
              <button 
                className="btn btn-error btn-outline"
                onClick={handleProjectDelete}
              >Delete</button>
            </div>)}

            <p className='text-sm text-base-content/70'>{project.description}</p>
          </div>
        </div>

        {!loading && (<div className='ml-4 text-2xl'>Tasks</div>)}

        <ul className='flex flex-col p-4 lg:p-0 gap-4 mt-4'>
          {tasks.map(task => (
            <li key={task._id}>
              <TasksCard projectId={projectId} getData={getData} task={task} />
            </li>
          ))}
        </ul>

        {loading && (
          <p className='text-center text-base-content/50'>Loading...</p>
        ) || tasks.length === 0 && (
          <p className='text-center text-base-content/50'>No tasks yet</p>
        )}
      </div>
    </div>
  )
}

export default ProjectPage