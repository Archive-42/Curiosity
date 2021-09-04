using System;
using System.Collections.Generic;
using System.Linq;

namespace Model
{
    public class TodoModel
    {
        private readonly List<TodoTask> _tasks;

        public IEnumerable<TodoTask> Tasks { get; set; }

        public TodoModel()
        {            
        }

        public TodoTask CreateTask(string name)
        {
            var newTask = new TodoTask(name);

            InternalAddTask(newTask);

            return newTask;
        }

        public TodoTask GetTask(string name)
        {
            return _tasks.FirstOrDefault(task => task.Name == name);
        }

        public IEnumerable<TodoTask> GetDoneTasks()
        {
            var doneTasks = new List<TodoTask>();
            for (int currentTask = 0; currentTask < _tasks.Count; currentTask++)
            {
                if (_tasks[currentTask].Done)
                    doneTasks.Add(_tasks[currentTask]);
            }

            return doneTasks;
        }

        private void InternalAddTask(TodoTask newTask)
        {
            if (GetTask(newTask.Name) != null) throw new InvalidOperationException($"Task '{newTask.Name}' already exists");

            _tasks.Add(newTask);
        }
    }
}
