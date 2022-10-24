import PubSub from 'pubsub-js';
import createTask from '../model/Task';
import { isToday, isThisWeek } from 'date-fns';

const tasks = [];
const projectsNames = [];

const TodoList = {
	getAll() {
		PubSub.publish('Get All Tasks', tasks);
		return tasks;
	},

	getByProject(projectName) {
		const filtered = tasks.filter(
			(task) => task.projectName == projectName
		);

		PubSub.publish('Get Tasks By Project', filtered);
		return filtered;
	},

	getToday() {
		const filtered = tasks.filter((task) => isToday(task.dueDate));

		PubSub.publish('Get Tasks Of Today', filtered);
		return filtered;
	},

	getThisWeek() {
		const filtered = tasks.filter((task) => isThisWeek(task.dueDate));

		PubSub.publish('Get Tasks Of This Week', filtered);
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

	deleteTask(id) {
		const task = tasks.filter((task) => task.id == id)[0];
		const index = tasks.indexOf(task);

		if (index > -1) tasks.splice(index, 1);

		PubSub.publish('Delete Task', id);
	},

	makeProject(projectName) {
		if (!projectsNames.includes(projectName)) {
			projectsNames.push(projectName);
			PubSub.publish('Make Project', projectName);
		}
	},
};

export default TodoList;
