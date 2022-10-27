import PubSub from 'pubsub-js';
import createTask from '../model/Task';
import { isToday, isThisWeek } from 'date-fns';

const tasks = [];
const projectsNames = [];
let isSubscribed = false;
let currentList = 'all';

const TodoList = {
	subscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Clicked Project Menu Item', (msg, projectName) =>
			this.getByProject(projectName)
		);

		PubSub.subscribe('Clicked Delete Button Of Task', (msg, id) =>
			this.deleteTask(id)
		);

		isSubscribed = true;
	},

	getAll() {
		currentList = 'all';
		PubSub.publish('Get All Tasks', tasks);
		return tasks;
	},

	getByProject(projectName) {
		currentList = projectName;

		const filtered = tasks.filter(
			(task) => task.projectName == projectName
		);

		PubSub.publish('Get Tasks By Project', filtered);
		return filtered;
	},

	getToday() {
		currentList = 'today';
		const filtered = tasks.filter((task) => isToday(task.dueDate));

		PubSub.publish('Get Tasks Of Today', filtered);
		return filtered;
	},

	getThisWeek() {
		currentList = 'thisWeek';
		const filtered = tasks.filter((task) => isThisWeek(task.dueDate));

		PubSub.publish('Get Tasks Of This Week', filtered);
		console.log(filtered);
		return filtered;
	},

	getByID(id) {
		const filtered = tasks.filter((task) => task.id == id);

		PubSub.publish('Get Task By ID', filtered[0]);
		return filtered[0];
	},

	makeTask(title, dueDate, priority, projectName) {
		const task = createTask(title, dueDate, priority, projectName);
		tasks.push(task);

		this.makeProject(projectName);

		PubSub.publish('Make Task', task);

		return task;
	},

	updateTask(id, title, dueDate, priority, projectName) {
		console.log({ id, title, dueDate, priority, projectName });
		const task = this.getByID(id);

		task.title = title;
		task.dueDate = new Date(dueDate);
		task.priority = priority;
		task.projectName = projectName;

		this.makeProject(projectName);

		this.updateList();
	},

	updateList() {
		switch (currentList) {
			case 'all':
				this.getAll();
				break;

			case 'today':
				this.getToday();
				break;

			case 'thisWeek':
				this.getThisWeek();
				break;

			default:
				this.getByProject(currentList);
				break;
		}
	},

	deleteTask(id) {
		const task = tasks.filter((task) => task.id == id)[0];
		const index = tasks.indexOf(task);

		if (index > -1) tasks.splice(index, 1);

		PubSub.publish('Delete Task', id);
	},

	makeProject(projectName) {
		if (!projectsNames.includes(projectName)) {
			projectsNames.push(projectName);
			PubSub.publish('Make Project', { projectName, projectsNames });
		}
	},
};

export default TodoList;
