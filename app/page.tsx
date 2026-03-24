"use client";

import React, {useState} from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, {text: newTask, completed: false}]);
      setNewTask("");
    }
  };

  const toggleTask = (index: number) => {
    const newTasks = [...tasks]; // newTasks = copy of the tasks array
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const moveTask = (index: number, direction: "up" | "down") => {
    const newPosition = direction === "up" ? index - 1 : index + 1;

    if (newPosition < 0 || newPosition >= tasks.length) return;

    const tasksCopy = [...tasks];
    const temp = tasksCopy[index];
    tasksCopy[index] = tasksCopy[newPosition];
    tasksCopy[newPosition] = temp;

    setTasks(tasksCopy);
  }

  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

    return(
     <main className="min-h-screen flex flex-col items-center pt-12 pb-4 px-4 shadow-inner"
          style={{background: 'linear-gradient(135deg, #BDC3C7 0%, #2C3E50 100%)',backgroundAttachment: 'fixed', fontFamily: "'Quicksand', sans-serif"}}>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mx-4">
        <h1 className="text-4xl text-black/50 font-bold text-center p-2">Today's plans</h1>
        <form onSubmit={(e) => {
              e.preventDefault();
              addTask;
              }}
            className="flex justify-center mt-10 gap-4">
          
          <input 
            type="text" 
            placeholder="My plan is..."
            className="p-2 font-bold bg-white rounded-lg border-2 w-64 focus:outline-none focus:ring-2 focus:ring[#1A5140]"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)} 
            />
            <button type="submit" onClick={addTask} 
                  className="bg-green-400 hover:bg-green-200 rounded-lg px-6 text-white">&#10010;</button> 
        </form>

        <ul className="mt-10 flex flex-col items-center gap-2">
          {tasks.map((task, index) => (
            <li key={index} className="flex gap-2 w-full max-w-md justify-center font-bold">

              <div className="flex gap-2">
                <button onClick={() => moveTask(index, "up")} 
                        className="text-xl bg-white hover:bg-white/50 px-4 rounded-lg"
                        disabled={index === 0}>&#9650;
                </button>
                
                <button onClick={() => moveTask(index, "down")} 
                        className="text-xl bg-white hover:bg-white/50 px-4 rounded-lg"
                        disabled={index === tasks.length - 1}>&#9660;
                </button>
              </div>

              <span className={`p-2 rounded-lg flex-1 border border-white/10 ${task.completed ? "line-through decoration-2 bg-lime-200" : "bg-white"}`}>{task.text}</span>
              <button onClick={() => toggleTask(index) } className={`rounded-lg px-4 transition ${task.completed ? "bg-white/20" : "bg-white hover:bg-lime-200"}`}>&#10004;</button>
              
              <button onClick={() => deleteTask(index)} className="bg-white hover:bg-red-200 rounded-lg px-4">&#10006;</button>
            </li>
          ))}
        </ul>
      </div>
      <footer className="mt-auto flex items-center justify-center text-white">Made with &hearts; by Misha | 2026</footer>
     </main>
    )
}
