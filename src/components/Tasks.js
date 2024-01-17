import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all"); // Default filter: all

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    const handleDelete = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.completed === (filter === "completed"));

    return (
        <div className="p-5">
            <div className="mb-4 flex flex-wrap gap-2">
                <button
                    className={`px-4 py-2 mr-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handleFilterChange("all")}
                >
                    All
                </button>
                <button
                    className={`px-4 py-2 ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handleFilterChange("completed")}
                >
                    Completed
                </button>
                <button
                    className={`px-4 py-2 ml-2 ${filter === "incomplete" ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handleFilterChange("incomplete")}
                >
                    Incomplete
                </button>
            </div>
            <div className="flex flex-wrap gap-4">
                {filteredTasks.map((task) => (
                    <div
                        key={task.id}
                        className={`max-[305px]:w-full flex-shrink-0 w-64 p-6 border border-gray-200 rounded-lg shadow ${task.completed ? "line-through dark:bg-gray-800 dark:border-gray-700" : ""
                            }`}
                    >
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    {task.details}
                                </p>
                                <div className="flex flex-col gap-5 justify-center">
                                    <input
                                        type="checkbox"
                                        id={`checkbox-${task.id}`}
                                        className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
                                        checked={task.completed}
                                        onChange={() => handleCheckboxChange(task.id)}
                                    />
                                    <MdDelete
                                        color="white"
                                        size={20}
                                        onClick={() => handleDelete(task.id)}
                                    />
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {task.dateAdded}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tasks;
