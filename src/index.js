import TodoList from './controller/TodoList.js';
import DOMwriter from './view/DOMwriter.js';
import './style.css';

DOMwriter.suscribe();

const task1 = TodoList.makeTask('Paolo', '2028/10/28', 'high', 'work');
const task2 = TodoList.makeTask('Andrea', '2022/10/24', 'low', 'home');
const task3 = TodoList.makeTask('Gianni', '2020/12/30', 'medium', 'work');
const task4 = TodoList.makeTask('Francesco', '1990/10/22', 'high', 'fitness');
const task5 = TodoList.makeTask('Apple', '2028/11/14', 'low', 'musica');

TodoList.getAll();
