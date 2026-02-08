import React, { useEffect, useRef, useState } from 'react'

import { getUsers } from "../../service/common.js"

function ProjectFormModal({ onSubmit, projectData = null }) {
  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    title: "",
    description: "",
    owner: ""
  });
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    if (projectData) {
      setFormData({
        title: projectData.title,
        description: projectData.description,
        owner: projectData.owner
      })
    }
  },[projectData])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUsers();
        setUsers(data.users)
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    }

    fetchData()
  },[]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await onSubmit(formData);
      modalRef.current?.close();
    } catch (error) {
      console.error(error)
    } finally { 
      setFormData({
        title: "",
        description: "",
        owner: ""
      });
      setLoading(false) 
    }
  };

  return (
  <>
    <button 
      className={projectData? 
        "btn btn-primary btn-outline":
        "btn btn-accent"}
      onClick={openModal}
    >{projectData? "Edit": "Create Project"}</button>

    <dialog ref={modalRef} className='modal'>
      <div className="modal-box relative">
        <button 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => modalRef.current.close()}
        >✕</button>
        
        <h3 className="font-bold text-lg">{projectData? "Update Project": "Create Project"}</h3>

        <form method="POST" className="space-y-4 py-4" onSubmit={handleSubmit}>
          {/* Project Title */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter project title" 
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Project Description */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter project description" 
              className="textarea w-full"
              required
            ></textarea>
          </div>

          {/* Project Owner */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Project Owner</label>
            <select 
              name='owner'
              value={formData.owner}
              onChange={handleChange}
              className="select"
              required
            >
              <option disabled value="">Pick a user</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </select>
          </div>
          
          <div className="modal-action">
            <button type="submit" className='btn btn-success w-20' disabled={loading}>
            {loading? (<span className='loading loading-spinner'></span>): 
              projectData? "Update": "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </>
  )
}

export default ProjectFormModal