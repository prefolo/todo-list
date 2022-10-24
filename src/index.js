import TodoList from './controller/TodoList.js';
import DOMwriter from './view/DOMwriter.js';
import './style.css';

DOMwriter.suscribe();

const task1 = TodoList.makeTask('Paolo', '22/10/2028', 'high', 'work');
const task2 = TodoList.makeTask('Andrea', '22/10/2023', 'low', 'home');
const task3 = TodoList.makeTask('Gianni', '22/12/2020', 'medium', 'work');
const task4 = TodoList.makeTask('Francesco', '22/10/1990', 'high', 'fitness');
const task5 = TodoList.makeTask('Apple', '22/10/2028', 'low', 'musica');

console.log(task1, task2, task3, task4, task5);

TodoList.getAll();

TodoList.getByProject('work');

const task = TodoList.getByID(0);

TodoList.deleteTask(task5.id);
TodoList.getAll();

task1.toggleIsDone();
