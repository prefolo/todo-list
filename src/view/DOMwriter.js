import PubSub from 'pubsub-js';
import createTaskElement from './TaskElement.js';

let isSubscribed = false;

const showAllTasks = (msg, tasks) => {
	const mainContent = document.querySelector('#main-content');
	mainContent.innerHTML = '';

	tasks.forEach((task) => {
		mainContent.appendChild(createTaskElement(task));
	});
};

const showTasksByProject = (msg, tasks) => {
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
	console.log(msg, projectName);
};

const styleTaskDependingOnIsDone = (msg, data) => {
	console.log(msg, data);
};

const DOMwriter = {
	suscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Get All Tasks', showAllTasks);
		PubSub.subscribe('Get Tasks By Project', showTasksByProject);
		PubSub.subscribe('Get Task By ID', showTaskByID);
		PubSub.subscribe('Make Task', addNewTask);
		PubSub.subscribe('Delete Task', deleteTask);
		PubSub.subscribe('Make Project', addNewProject);
		PubSub.subscribe('Toggle isDone of task', styleTaskDependingOnIsDone);

		isSubscribed = true;
	},
};

export default DOMwriter;
