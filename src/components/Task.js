import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Task = () => {
  const [taskDetails, setTaskDetails] = useState('');

  const navigate = useNavigate()

  const addTask = () => {
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskId = uuidv4();

    const newTask = {
      id: taskId,
      details: taskDetails,
      dateAdded: new Date().toLocaleString(),
      completed: false,
    };

    localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
    navigate(0)
    setTaskDetails('');
  };

  return (
    <div className='flex justify-center py-10 px-3'>
      <div className='w-full'>
        <div>
          <h1 className='text-2xl text-center text-white font-bold'>Add a task</h1>
        </div>
        <div className='mt-5'>
          <form className='flex flex-col gap-6 items-center'>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full min-[620px]:w-96"
              placeholder="Task details"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
              required
              autoComplete='off'
            />
            <button
              type="button"
              onClick={addTask}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-28"
            >
              Add task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Task;
