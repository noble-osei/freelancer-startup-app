import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/authContext.jsx'

function ProjectCard({ project }) {
  const { user } = useAuth();

  return (
    <Link to={`/projects/${project._id}`} className='card bg-base-200 hover:shadow-lg'>
      <div className="card-body">
        <h5 className='card-title line-clamp-1'>{project.title}</h5>
        <p className='text-sm text-base-content/70 line-clamp-2'>{project.description}</p>

        {user.role === "admin" && (<div className='mt-2'>
          <p className='text-lg'>{project.owner.name}</p>
          <p className='text-sm text-base-content/40'>{project.owner.username}</p>
        </div>)}
      </div>
    </Link>
  )
}

export default ProjectCard