import React, { useState, createContext, useEffect } from 'react';

export const TodoContext = createContext();

export const TodoProvider = (props) => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    const convertedData = data !== null ? JSON.parse(data) : {};
    setTasks(convertedData);
  }, []);

  const updateLocalStorageTasks = (updatedTasks) => {
    const jsonTasks = JSON.stringify(updatedTasks);
    return localStorage.setItem('tasks', jsonTasks);
  };

  const createTask = async (task) => {
    const nextTaskId = new Date().getTime();
    const newTask = {
      [nextTaskId]: {
        id: nextTaskId,
        message: task
      }
    };

    const combinedTasks = { ...tasks, ...newTask };

    await setTasks((tasks) => combinedTasks);

    updateLocalStorageTasks(combinedTasks);
  };

  const deleteTask = (id) => {
    const tasksWithDeletion = { ...tasks };
    delete tasksWithDeletion[id];
    setTasks(tasksWithDeletion);
  };

  return (
    <TodoContext.Provider value={{ tasks, setTasks, deleteTask, createTask }}>
      {props.children}
    </TodoContext.Provider>
  );
};
