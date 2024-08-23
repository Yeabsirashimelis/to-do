//welcome to this todo app

import { useState } from "react";

const initialTasks = [
  { taskName: "paying school fee", time: "8am", checked: false },
  { taskName: "play football", time: "3am", checked: false },
  { taskName: "going for a date", time: "4am", checked: false },
];

export default function App() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("https://i.pravatar.cc/48?u=499471");
  const [iscreated, setIsCreated] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(initialTasks);
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
        {isTaskAdded && (
          <TaskInfo
            task={task}
            time={time}
            setTask={setTask}
            setTime={setTime}
            tasks={tasks}
            setTasks={setTasks}
          />
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

function Header({ name, setName, photo, setPhoto, iscreated, handleCreate }) {
  return (
    <form className="form">
      <h2>wellcome | create a user♛</h2>
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
        <img src={photo} />
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

function TaskInfo({ task, time, setTask, setTime, tasks }) {
  console.log(tasks);
  function handleAdd(e) {
    e.preventDefault();
    const newtask = {
      task,
      time,
      checked: false,
    };
  }
  return (
    <form className="taskinfo">
      <h3>Enter task info💪</h3>
      <span>
        <label>Task Name🎯</label>
        <input
          placeholder="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </span>
      <span>
        <label>time when must completed⌚</label>
        <input
          placeholder="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </span>
      <button className="btn" onClick={handleAdd}>
        Add
      </button>
      <div className="todolists">
        <h1>To do Lists</h1>
        {tasks.map((task, i) => (
          <List task={task} key={i} num={i} />
        ))}
      </div>
    </form>
  );
}

function List({ task, num }) {
  return (
    <div className="eachtask">
      <p>
        {num + 1}.{task.taskName}
      </p>{" "}
      <h3>must finished before</h3>
      <span className="time">{task.time}</span>
      <input type="checkbox" />
      <button className="btn">Delete</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h3>You have finished X amount of tasks</h3>
    </footer>
  );
}
