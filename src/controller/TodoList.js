import PubSub from 'pubsub-js';
import createTodo from '../model/Todo';
import { isToday, isThisWeek } from 'date-fns';

const todos = [];
const projectsNames = [];
let isSubscribed = false;
let currentList = 'all';

const TodoList = {
	subscribe() {
		if (isSubscribed) return;

		PubSub.subscribe('Clicked Project Menu Item', (msg, projectName) =>
			this.getByProject(projectName)
		);

		PubSub.subscribe('Clicked Delete Button Of Todo', (msg, id) =>
			this.deleteTodo(id)
		);

		isSubscribed = true;
	},

	getAll() {
		currentList = 'all';
		PubSub.publish('Get All Todos', todos);
		return todos;
	},

	getByProject(projectName) {
		currentList = projectName;

		const filtered = todos.filter(
			(todo) => todo.projectName == projectName
		);

		PubSub.publish('Get Todos By Project', {
			projectName,
			todos: filtered,
		});
		return filtered;
	},

	getToday() {
		currentList = 'today';
		const filtered = todos.filter((todo) => isToday(todo.dueDate));

		PubSub.publish('Get Todos Of Today', filtered);
		return filtered;
	},

	getThisWeek() {
		currentList = 'thisWeek';
		const filtered = todos.filter((todo) => isThisWeek(todo.dueDate));

		PubSub.publish('Get Todos Of This Week', filtered);
		console.log(filtered);
		return filtered;
	},

	getByID(id) {
		const filtered = todos.filter((todo) => todo.id == id);
		return filtered[0];
	},

	makeTodo(title, dueDate, priority, projectName) {
		const todo = createTodo(title, dueDate, priority, projectName);
		todos.push(todo);

		this.makeProject(projectName);

		PubSub.publish('Make Todo', todo);

		return todo;
	},

	updateTodo(id, title, dueDate, priority, projectName) {
		console.log({ id, title, dueDate, priority, projectName });
		const todo = this.getByID(id);

		todo.title = title;
		todo.dueDate = new Date(dueDate);
		todo.priority = priority;
		todo.projectName = projectName;

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

	deleteTodo(id) {
		const todo = todos.filter((todo) => todo.id == id)[0];
		const index = todos.indexOf(todo);

		if (index > -1) todos.splice(index, 1);

		PubSub.publish('Delete Todo', { id, todos });
	},

	makeProject(projectName) {
		if (!projectsNames.includes(projectName)) {
			projectsNames.push(projectName);
			PubSub.publish('Make Project', { projectName, projectsNames });
		}
	},
};

export default TodoList;
