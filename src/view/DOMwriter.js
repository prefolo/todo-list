import PubSub from 'pubsub-js';
import createTaskElement from './TaskElement.js';
import createProjectElement from './ProjectElement.js';
import { format } from 'date-fns';

let isSubscribed = false;

const insertTasksToMainContent = (tasks) => {
	const mainContent = document.querySelector('#main-content');
	mainContent.innerHTML = '';

	tasks.forEach((task) => {
		mainContent.appendChild(createTaskElement(task));
	});
};

const logToolbarInfo = (str) => {
	document.querySelector('#toolbar-text').textContent = str;
};

const showAllTasks = (msg, tasks) => {
	insertTasksToMainContent(tasks);
	logToolbarInfo(`All > ${tasks.length} todos`);
};

const showTodayTasks = (msg, tasks) => {
	insertTasksToMainContent(tasks);
	logToolbarInfo(`Today > ${tasks.length} todos`);
};

const showThisWeekTasks = (msg, tasks) => {
	insertTasksToMainContent(tasks);
	logToolbarInfo(`This Week > ${tasks.length} todos`);
};

const showProjectTasks = (msg, { projectName, tasks }) => {
	insertTasksToMainContent(tasks);
	logToolbarInfo(`Project: ${projectName} > ${tasks.length} todos`);
};

const addNewTask = (msg, task) => {
	document
		.querySelector('#main-content')
		.appendChild(createTaskElement(task));
};

const deleteTask = (msg, { id, tasks }) => {
	document.querySelector('#task-' + id).remove();

	const infoText = document.querySelector('#toolbar-text').textContent;
	const a = infoText.split('>')[0];

	logToolbarInfo(`${a} > ${tasks.length} todos`);
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

const styleTaskDependingOnIsDone = (msg, data) => {
	const taskElement = document.querySelector('#task-' + data.id);

	if (data.isDone) taskElement.classList.add('isDone');
	else taskElement.classList.remove('isDone');
};

const showEditDialog = (msg, task) => {
	document.querySelector('#overlay').style.display = 'flex';

	document.querySelector('#input-task-title').value = task.title;
	document.querySelector('#input-task-project').value = task.projectName;
	document.querySelector('#input-task-due_date').value = format(
		task.dueDate,
		'yyyy-MM-dd'
	);
	document.querySelector('#input-task-priority').value = task.priority;
	document.querySelector('#input-task-id').value = task.id;
};

const DOMwriter = {
	suscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Get All Tasks', showAllTasks);
		PubSub.subscribe('Get Tasks Of Today', showTodayTasks);
		PubSub.subscribe('Get Tasks Of This Week', showThisWeekTasks);
		PubSub.subscribe('Get Tasks By Project', showProjectTasks);
		PubSub.subscribe('Make Task', addNewTask);
		PubSub.subscribe('Delete Task', deleteTask);
		PubSub.subscribe('Make Project', addNewProject);
		PubSub.subscribe('Toggle isDone of task', styleTaskDependingOnIsDone);
		PubSub.subscribe('Clicked Edit Button Of Task', showEditDialog);

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
