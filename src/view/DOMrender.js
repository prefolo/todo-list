import PubSub from 'pubsub-js';

let isSubscribed = false;

const showAllTasks = (msg, tasks) => {
	console.log(msg, tasks);
};
const showTasksByProject = (msg, tasks) => {
	console.log(msg, tasks);
};
const showTaskByID = (msg, task) => {
	console.log(msg, task);
};
const addNewTask = (msg, task) => {
	console.log(msg, task);
};
const deleteTask = (msg, task) => {
	console.log(msg, task);
};
const addNewProject = (msg, projectName) => {
	console.log(msg, projectName);
};
const styleTaskDependingOnIsDone = (msg, data) => {
	console.log(msg, data);
};

const DOMrender = {
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

export default DOMrender;
