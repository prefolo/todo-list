import TodoList from './controller/TodoList.js';
import DOMwriter from './view/DOMwriter.js';
import './style.css';

DOMwriter.suscribe();
TodoList.subscribe();

const task1 = TodoList.makeTask('Wash the car', '2022/10/28', 'low', 'Home');

const task2 = TodoList.makeTask(
	'Finish development of restaurant website',
	'2022/10/24',
	'high',
	'Work'
);

const task3 = TodoList.makeTask(
	'Preparing the christmas tree',
	'2022/12/20',
	'medium',
	'Events'
);

const task4 = TodoList.makeTask(
	'Pay the electricity bill',
	'2023/01/22',
	'high',
	'Home'
);

const task5 = TodoList.makeTask(
	"Buy a gift for Paolo's birthday",
	'2023/02/14',
	'high',
	'Events'
);

TodoList.getAll();

document.querySelector('#all-voice').addEventListener('click', TodoList.getAll);

document
	.querySelector('#today-voice')
	.addEventListener('click', TodoList.getToday);

document
	.querySelector('#this-week-voice')
	.addEventListener('click', TodoList.getThisWeek);

document.querySelectorAll('.menu-item').forEach((item) =>
	item.addEventListener('click', function () {
		DOMwriter.selectMenuItem(this);
	})
);
