import TodoList from './controller/TodoList.js';
import DOMwriter from './view/DOMwriter.js';
import './style.css';

DOMwriter.suscribe();
TodoList.subscribe();

const todo1 = TodoList.makeTodo('Wash the car', '2022/10/28', 'low', 'Home');

const todo2 = TodoList.makeTodo(
	'Finish development of restaurant website',
	'2022/10/24',
	'high',
	'Work'
);

const todo3 = TodoList.makeTodo(
	'Preparing the christmas tree',
	'2022/12/20',
	'medium',
	'Events'
);

const todo4 = TodoList.makeTodo(
	'Pay the electricity bill',
	'2023/01/22',
	'high',
	'Home'
);

const todo5 = TodoList.makeTodo(
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

/* edit todo box */

document
	.querySelector('#cancel-editTodo-bttn')
	.addEventListener('click', () => dismissDialogBoxes());

document.querySelector('#update-bttn').addEventListener('click', function (e) {
	e.preventDefault();

	const id = document.querySelector('#input-editTodo-id').value;
	const title = document.querySelector('#input-editTodo-title').value;
	const dueDate = document.querySelector('#input-editTodo-dueDate').value;
	const priority = document.querySelector('#input-editTodo-priority').value;
	const projectName = document.querySelector('#input-editTodo-project').value;

	if (!(title && projectName)) return;

	TodoList.updateTodo(id, title, dueDate, priority, projectName);

	dismissDialogBoxes();
});

/* new todo box */
document.querySelector('#newTodo-bttn').addEventListener('click', () => {
	document.querySelector('#overlay').style.display = 'flex';
	document.querySelector('#newTodo-bx').style.display = 'block';

	document.querySelector('#input-newTodo-title').value = '';
	document.querySelector('#input-newTodo-project').value = '';
	document.querySelector('#input-newTodo-dueDate').value = '';
	document.querySelector('#input-newTodo-priority').value = 'low';
});

document
	.querySelector('#cancel-newTodo-bttn')
	.addEventListener('click', () => dismissDialogBoxes());

document.querySelector('#save-bttn').addEventListener('click', function (e) {
	e.preventDefault();

	const title = document.querySelector('#input-newTodo-title').value;
	const dueDate = document.querySelector('#input-newTodo-dueDate').value;
	const priority = document.querySelector('#input-newTodo-priority').value;
	const projectName = document.querySelector('#input-newTodo-project').value;

	if (!(title && projectName)) return;

	TodoList.makeTodo(title, dueDate, priority, projectName);

	dismissDialogBoxes();
});

const dismissDialogBoxes = () => {
	document.querySelector('#overlay').style.display = 'none';
	document.querySelector('#editTodo-bx').style.display = 'none';
	document.querySelector('#newTodo-bx').style.display = 'none';
};
