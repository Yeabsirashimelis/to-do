//welcome to this todo app

import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("https://i.pravatar.cc/48?u=499471");
  const [iscreated, setIsCreated] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState("");

  const [time, setTime] = useState("");

  function handleCreate(e) {
    e.preventDefault();
    if (name === "" || photo === "") return;
    setIsCreated((c) => !c);
  }

  function handleHere(e) {
    e.preventDefault();
    setIsTaskAdded((c) => !c);
  }

  function handleTasksAdded(newtask) {
    setTasks((prevTasks) => [...prevTasks, newtask]);
    setTaskName("");
    setTime("");
  }

  function handleDelete(tasktobedeleted) {
    setTasks((t) => t.filter((t) => t.taskName !== tasktobedeleted.taskName));
  }

  function handleChekedTask(checkedtask) {
    setTasks((t) =>
      t.map((t) =>
        t.taskName === checkedtask.taskName ? { ...t, checked: !t.checked } : t
      )
    );
  }

  function handleRemoveAll() {
    setTasks("");
  }

  return (
    <div className="App">
      <div className="app">
        <Header
          name={name}
          setName={setName}
          photo={photo}
          setPhoto={setPhoto}
          handleCreate={handleCreate}
          iscreated={iscreated}
        />
        {iscreated && (
          <CreatedUser
            name={name}
            photo={photo}
            handleHere={handleHere}
            iscreated={iscreated}
            setIsCreated={setIsCreated}
          />
        )}
        {isTaskAdded && iscreated && (
          <TaskInfo
            taskName={taskName}
            time={time}
            setTaskName={setTaskName}
            setTime={setTime}
            tasks={tasks}
            setTasks={setTasks}
            handleTasksAdded={handleTasksAdded}
          />
        )}
      </div>

      {tasks && iscreated && (
        <div>
          <Lists
            tasks={tasks}
            handleDelete={handleDelete}
            handleChekedTask={handleChekedTask}
            handleRemoveAll={handleRemoveAll}
          />
          <Footer tasks={tasks} />
        </div>
      )}
    </div>
  );
}

function Header({ name, setName, photo, setPhoto, iscreated, handleCreate }) {
  return (
    <form className="form">
      <h2>welcome | create a user♛</h2>
      <span>
        <label>Your Name🧑</label>
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </span>
      <span>
        <label>Enter an image source📸</label>
        <input
          placeholder="URL or src"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
      </span>
      <button className="btn" onClick={handleCreate}>
        {iscreated ? "close" : "Create"}
      </button>
    </form>
  );
}

function CreatedUser({ name, photo, handleHere }) {
  return (
    <div className="createduser">
      <span>
        <img src={photo} alt="" />
        <h2>Hey Mr.{name}😎</h2>
      </span>
      <p>
        🌟how are you doing. click the button below <br />
        or hit to start your todo list🌟
      </p>
      <button className="btn" onClick={handleHere}>
        Here➡
      </button>
    </div>
  );
}

function TaskInfo({
  taskName,
  time,
  setTaskName,
  setTime,
  tasks,
  handleTasksAdded,
}) {
  function handleAdd(e) {
    e.preventDefault();

    if (time === "" || taskName === "") return;
    const newtask = {
      taskName,
      time,
      checked: false,
    };
    handleTasksAdded(newtask);
  }
  return (
    <form className="taskinfo">
      <h3>Enter task info💪</h3>
      <span>
        <label>Task Name🎯</label>
        <input
          placeholder="task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </span>
      <span>
        <label>Time to start doing⌚</label>
        <input
          placeholder="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </span>
      <button className="btn" onClick={handleAdd}>
        Add
      </button>
    </form>
  );
}
function Lists({ tasks, handleDelete, handleChekedTask, handleRemoveAll }) {
  return (
    <div className="todolists">
      <h1>To do Lists</h1>
      {tasks.map((task, i) => (
        <List
          task={task}
          key={i}
          num={i}
          handleDelete={handleDelete}
          handleChekedTask={handleChekedTask}
          handleRemoveAll={handleRemoveAll}
        />
      ))}

      {tasks.length !== 0 && (
        <button className="removebtns" onClick={handleRemoveAll}>
          Remove All
        </button>
      )}
    </div>
  );
}
function List({ task, num, handleDelete, handleChekedTask }) {
  return (
    <span className="eachtask">
      <p>
        {num + 1}.{task.taskName}
        <h3>
          must finished before <span className="time">{task.time}</span>
        </h3>
      </p>
      <input
        type="checkbox"
        value={task.checked}
        onChange={() => handleChekedTask(task)}
      />
      <button className="removebtns" onClick={() => handleDelete(task)}>
        Delete
      </button>
    </span>
  );
}

function Footer({ tasks }) {
  const checkedLength = tasks.filter((t) => t.checked).length;
  const length = tasks.length;
  const percentage = Math.round((checkedLength / length) * 100);

  return (
    <footer className="footer">
      <h3>
        {length === checkedLength && length !== 0
          ? "Bravo!👏You finish all your tasks🏁"
          : tasks.length
          ? `You have finished ${checkedLength} (${percentage}% )of tasks💪`
          : "start adding tasks to your list👆"}
      </h3>
    </footer>
  );
}
