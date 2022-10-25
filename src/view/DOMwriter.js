import PubSub from 'pubsub-js';
import createTaskElement from './TaskElement.js';
import createProjectElement from './ProjectElement.js';
import TodoList from '../controller/TodoList.js';

let isSubscribed = false;

const showTasks = (msg, tasks) => {
	const mainContent = document.querySelector('#main-content');
	mainContent.innerHTML = '';

	tasks.forEach((task) => {
		mainContent.appendChild(createTaskElement(task));
	});
};

const showTaskByID = (msg, task) => {
	console.log(msg, task);
};

const addNewTask = (msg, task) => {
	document
		.querySelector('#main-content')
		.appendChild(createTaskElement(task));
};

const deleteTask = (msg, id) => {
	console.log(msg, id);
};

const addNewProject = (msg, projectName) => {
	const element = createProjectElement(projectName);

	document.querySelector('#projects-container').appendChild(element);

	element.addEventListener('click', function () {
		DOMwriter.selectMenuItem(this);
		TodoList.getByProject(projectName);
	});
};

const styleTaskDependingOnIsDone = (msg, data) => {
	console.log(msg, data);
};

const DOMwriter = {
	suscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Get All Tasks', showTasks);
		PubSub.subscribe('Get Tasks Of Today', showTasks);
		PubSub.subscribe('Get Tasks Of This Week', showTasks);
		PubSub.subscribe('Get Tasks By Project', showTasks);
		PubSub.subscribe('Get Task By ID', showTaskByID);
		PubSub.subscribe('Make Task', addNewTask);
		PubSub.subscribe('Delete Task', deleteTask);
		PubSub.subscribe('Make Project', addNewProject);
		PubSub.subscribe('Toggle isDone of task', styleTaskDependingOnIsDone);

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
