import TodoList from './controller/TodoList.js';
import DOMrender from './view/DOMrender.js';

DOMrender.suscribe();

const task1ID = TodoList.makeTask('Paolo', '22/10/2028', 'high', 'work');
const task2ID = TodoList.makeTask('Andrea', '22/10/2023', 'low', 'home');
const task3ID = TodoList.makeTask('Gianni', '22/12/2020', 'medium', 'work');
const task4ID = TodoList.makeTask('Francesco', '22/10/1990', 'high', 'fitness');
const task5ID = TodoList.makeTask('Apple', '22/10/2028', 'low', 'musica');

console.log(task1ID, task2ID, task3ID, task4ID, task5ID);

TodoList.getAll();

TodoList.getByProject('work');

const task = TodoList.getByID(task5ID);

/* TodoList.deleteTask(task5ID);
TodoList.getAll(); */
task.toggleIsDone();
