import PubSub from 'pubsub-js';

let theID = 0;

function createTodo(title, dueDate, priority, projectName, isDone = false) {
	const id = theID;
	theID++;

	return {
		title,
		dueDate: new Date(dueDate),
		priority,
		projectName,
		isDone,
		id,

		toggleIsDone() {
			this.isDone = !this.isDone;
			const isDone = this.isDone;

			PubSub.publish('Toggle isDone of todo', { id, isDone });
		},
	};
}

export default createTodo;
