import React from 'react'
import toast from "react-hot-toast"

import { deleteTask, updateTask } from '../../api/tasksApi.js';
import TaskFormModal from './TaskFormModal.jsx';

function TasksCard({ projectId, task, getData }) {
  const handleTaskUpdate = async (formData) => {
    try {
      const data = await updateTask(projectId, task._id, formData);
      toast.success(data.message);
      getData();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  const handleTaskDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const data = await deleteTask(projectId, task._id);
      toast.success(data.message);
      getData();
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong. Try again!";
      toast.error(message);
    }
  };

  return (
    <div className='card bg-base-200 border-b-4 border-solid border-base-300'>
      <div className="card-body lg:flex-row">
        <div className='flex flex-auto flex-col gap-2'>
          <h5 className='card-title line-clamp-1'>{task.title}</h5>
          <p className='text-sm text-base-content/70 line-clamp-2'>{
            task.description? task.description : "No description"
          }</p>
        </div>

        <div className="card-actions flex-nowrap items-center justify-center gap-2 ml-2 mt-4">
          <TaskFormModal 
            onSubmit={handleTaskUpdate}
            taskData={task}
          />

          <button 
            className="btn btn-error"
            onClick={handleTaskDelete}
          >Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TasksCard