import React, { useState, useEffect, useRef } from 'react'

function TaskFormModal({ onSubmit, taskData = null }) {
  const [ loading, setLoading ] = useState(false);
  const [ formData, setFormData ] = useState({
    title: "",
    description: "",
  });
  const modalRef = useRef(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status
      })
    }
  },[taskData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await onSubmit(formData);
      modalRef.current?.close();
    } catch (error) {
      console.error(error.message)
    } finally { 
      setFormData({
        title: "",
        description: ""
      });
      setLoading(false) 
    }
  };

  return (
  <>
    <button 
      className={taskData? 
        "btn btn-primary btn-outline":
        "btn btn-accent"}
      onClick={openModal}
    >{taskData? "Edit": "Create Task"}</button>

    <dialog ref={modalRef} className='modal'>
      <div className="modal-box relative">
        <button
          className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          onClick={() => modalRef.current?.close()}
        >✕</button>

        <h3 className="font-bold text-lg">{taskData? "Update Task": "Create Task"}</h3>
        <form method="POST" className='space-y-4 py-4' onSubmit={handleSubmit}>
          {/* Task Title */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title" 
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description" 
              className="textarea w-full"
              required
            ></textarea>
          </div>

          {/* Task Status */}
          <div>
            <label className="block text-base-content/70 font-semibold mb-2">Task Status</label>
            <select 
              name='status'
              value={formData.status}
              onChange={handleChange}
              className="select"
              required
            >
              <option disabled value="">Choose task status</option>
              <option value="todo">To do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="modal-action">
            <button type="submit" className='btn btn-primary w-20' disabled={loading}>
              {loading? (<span className='loading loading-spinner'></span>): 
              taskData? "Update": "Create"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </>
  )
}

export default TaskFormModal