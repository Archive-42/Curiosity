import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import TaskForm from "./TaskForm";
import Damage from "../Shared/Damage";
import Reward from "../Shared/Reward";
import "./Tasks.css";
import CompleteTask from "./CompleteTask";
import ExpiredTask from "./ExpiredTask";

const Tasks = () => {
  const data = useSelector((state) => state.tasks.allTasks);
  const expired = useSelector((state) => state.tasks.expired);
  const complete = useSelector((state) => state.tasks.complete);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState(false);
  const [damage, showDamage] = useState(false);
  const [reward, showReward] = useState(false);

  const [log, setLog] = useState(false);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const toggleLog = (open) => {
    setLog(open);
    setTaskForm(false);
  };

  const showTaskForm = (open) => {
    setTaskForm(open);
  };

  return (
    <div className="taskpage__container">
      <div>
        <button class="blue cute" onClick={() => toggleLog(false)}>
          All Quests
        </button>
        <button class="yellow cute" onClick={() => showTaskForm(true)}>
          New Quest
        </button>
        <button class="pink cute" onClick={() => toggleLog(true)}>
          Completed
        </button>
      </div>
      {taskForm ? (
        <TaskForm setTaskForm={setTaskForm} setTasks={setTasks} />
      ) : null}

      {log ? (
        <>
          {complete &&
            complete.map((c) => {
              return <CompleteTask data={c} />;
            })}
        </>
      ) : (
        <>
          {reward ? <Reward rewards={reward} showReward={showReward} /> : null}
          {damage ? <Damage message={damage} showDamage={showDamage} /> : null}

          {tasks.length
            ? tasks.map((t) => {
                return (
                  <Task
                    t={t}
                    setTasks={setTasks}
                    showDamage={showDamage}
                    showReward={showReward}
                  />
                );
              })
            : null}

          {expired &&
            expired.map((e) => {
              return <ExpiredTask data={e} />;
            })}

          {!expired.length && !tasks.length ? (
            <div style={{ margin: "100px" }}>
              <h2 className="white">Click New Quest to begin!</h2>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Tasks;
