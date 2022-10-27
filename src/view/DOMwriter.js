import PubSub from 'pubsub-js';
import createTodoElement from './TodoElement.js';
import createProjectElement from './ProjectElement.js';
import { format } from 'date-fns';

let isSubscribed = false;

const insertTodosToMainContent = (todos) => {
	const mainContent = document.querySelector('#main-content');
	mainContent.innerHTML = '';

	todos.forEach((todo) => {
		mainContent.appendChild(createTodoElement(todo));
	});
};

const logToolbarInfo = (str) => {
	document.querySelector('#toolbar-text').textContent = str;
};

const showAllTodos = (msg, todos) => {
	insertTodosToMainContent(todos);
	logToolbarInfo(`All > ${todos.length} todos`);
};

const showTodayTodos = (msg, todos) => {
	insertTodosToMainContent(todos);
	logToolbarInfo(`Today > ${todos.length} todos`);
};

const showThisWeekTodos = (msg, todos) => {
	insertTodosToMainContent(todos);
	logToolbarInfo(`This Week > ${todos.length} todos`);
};

const showProjectTodos = (msg, { projectName, todos }) => {
	insertTodosToMainContent(todos);
	logToolbarInfo(`Project: ${projectName} > ${todos.length} todos`);
};

const addNewTodo = (msg, todo) => {
	document
		.querySelector('#main-content')
		.appendChild(createTodoElement(todo));
};

const deleteTodo = (msg, { id, todos }) => {
	document.querySelector('#todo-' + id).remove();

	const infoText = document.querySelector('#toolbar-text').textContent;
	const a = infoText.split('>')[0];

	logToolbarInfo(`${a} > ${todos.length} todos`);
};

const addNewProject = (msg, { projectName, projectsNames }) => {
	console.log({ projectName, projectsNames });
	const element = createProjectElement(projectName);

	document.querySelector('#projects-container').appendChild(element);

	element.addEventListener('click', function () {
		DOMwriter.selectMenuItem(this);
		PubSub.publish('Clicked Project Menu Item', projectName);
	});

	const dataList = document.querySelector('#projectsNames-datalist');
	dataList.innerHTML = '';
	projectsNames.forEach(
		(name) => (dataList.innerHTML += `<option value="${name}">`)
	);
};

const styleTodoDependingOnIsDone = (msg, data) => {
	const todoElement = document.querySelector('#todo-' + data.id);

	if (data.isDone) todoElement.classList.add('isDone');
	else todoElement.classList.remove('isDone');
};

const showEditDialog = (msg, todo) => {
	document.querySelector('#overlay').style.display = 'flex';

	document.querySelector('#input-editTodo-title').value = todo.title;
	document.querySelector('#input-editTodo-project').value = todo.projectName;
	document.querySelector('#input-editTodo-dueDate').value = format(
		todo.dueDate,
		'yyyy-MM-dd'
	);
	document.querySelector('#input-editTodo-priority').value = todo.priority;
	document.querySelector('#input-editTodo-id').value = todo.id;
};

const DOMwriter = {
	suscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Get All Todos', showAllTodos);
		PubSub.subscribe('Get Todos Of Today', showTodayTodos);
		PubSub.subscribe('Get Todos Of This Week', showThisWeekTodos);
		PubSub.subscribe('Get Todos By Project', showProjectTodos);
		PubSub.subscribe('Make Todo', addNewTodo);
		PubSub.subscribe('Delete Todo', deleteTodo);
		PubSub.subscribe('Make Project', addNewProject);
		PubSub.subscribe('Toggle isDone of todo', styleTodoDependingOnIsDone);
		PubSub.subscribe('Clicked Edit Button Of Todo', showEditDialog);

		isSubscribed = true;
	},

	selectMenuItem(menuItem) {
		document
			.querySelectorAll('.menu-item')
			.forEach((item) => item.classList.remove('selected'));

		menuItem.classList.add('selected');
	},
};

export default DOMwriter;
