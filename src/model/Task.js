import PubSub from 'pubsub-js';

let theID = 0;

function createTask(title, dueDate, priority, projectName, isDone = false) {
	const id = theID;
	theID++;

	return {
		title,
		dueDate,
		priority,
		projectName,
		isDone,
		id,

		toggleIsDone() {
			isDone = !isDone;
			PubSub.publish('Toggle isDone of task', { id, isDone });
		},
	};
}

export default createTask;
