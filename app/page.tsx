"use client";

import React, {useState} from "react";

const backgroundThemes = [
  { id: 'default', name: 'Cloudy Gray', gradient: 'linear-gradient(135deg, #BDC3C7 0%, #2C3E50 100%)' },
  { id:'lime', name: 'Lime Sky', gradient: 'linear-gradient(135deg, #BFF098, #6FD6FF 100%)'},
  { id: 'sunset', name: 'Peach Sunset', gradient: 'linear-gradient(135deg, #FF9A9E 0%, #FAD0C4 100%)' },
  { id: 'lavender', name: 'Soft Lavender', gradient: 'linear-gradient(135deg, #E9E4F0 0%, #D391FA 100%)' },
  { id: 'lenses', name: 'Rose Lenses', gradient: 'linear-gradient(135deg, #E8CBC0 0%, #636FA4 100%)' },
  { id: 'lithium', name: 'Lithium', gradient: 'linear-gradient(135deg, #6D6027 0%, #D3CBB8 100%)' },
  { id: 'ocean', name: 'Deep Ocean', gradient: 'linear-gradient(135deg, #243B55 0%, #141E30 100%)' }
]

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeTheme, setActiveTheme] = useState(backgroundThemes[0]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

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
          style={{
            backgroundImage: activeTheme.gradient,
            backgroundAttachment: 'fixed', 
            backgroundSize: 'cover',
            fontFamily: "'Quicksand', sans-serif"}}>

      <div className="fixed top-2 left-2 z-50 flex flex-col items-start gap-2">
        <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="w-10 h-10 rounded-full backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center hover:scale-100 transition-all text-xl"
                title="Change color">🎨</button>
          {isThemeMenuOpen && ( 
            <div className="flex flex-col gap-3 p-2 rounded-2xl backdrop-blur-md border border-white/20 animate-in fade-in slide-in-from-top-2 duration-300">
              {backgroundThemes.map((theme) => (
                <button 
                      key={theme.id}
                      onClick={() => { 
                        setActiveTheme(theme); 
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-125 ${
                        activeTheme.id === theme.id ? 'border-white scale-110 shadow-md': 'border-transparent opacity-80'
                      }`}
                      style={{ background: theme.gradient }}
                    />
                ))}
            </div>
          )}
      </div>

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl mx-4">
        <h1 className="text-4xl text-black/50 font-bold text-center p-2">Today's plans</h1>
        <form onSubmit={(e) => {
              e.preventDefault();
              addTask();
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
