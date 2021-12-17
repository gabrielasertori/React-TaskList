import React, { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  function handleCreateNewTask() {
	if (newTaskTitle)
	{
		setTasks(prevTask => [...prevTask, {
			id: parseInt(String(Math.random()*1000)),
			title: newTaskTitle,
			isComplete: false
		}]);
		setNewTaskTitle('');
	}
  }

  // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  function handleToggleTaskCompletion(id: number) {
	let index = tasks.findIndex(task => task.id === id);
	const newTasks = [...tasks];
	newTasks[index].isComplete = !newTasks[index].isComplete;
	setTasks(newTasks);
  }

  // Remova uma task da listagem pelo ID
  function handleRemoveTask(id: number) {
	const newTasks = tasks.filter(task => task.id !== id)
	setTasks(newTasks);
  }

  function handleKeyPress(e: React.KeyboardEvent) {
	  if (e.key === 'Enter')
	  	handleCreateNewTask();
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
			onKeyPress={handleKeyPress}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
		<ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}