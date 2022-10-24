const createTaskElement = (task) => {
	const container = document.createElement('div');
	container.className = `task ${task.priority}`;

	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');

	const title = document.createElement('div');
	title.className = 'task-title';
	title.textContent = task.title;

	const dueDate = document.createElement('div');
	dueDate.className = 'task-dueDate';
	dueDate.textContent = task.dueDate;

	const editButton = document.createElement('button');
	editButton.innerHTML =
		'<svg style="width:20px;height:20px" viewBox="0 0 24 24"><path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" /></svg>';

	const deleteButton = document.createElement('button');
	deleteButton.innerHTML =
		'<svg style="width:20px;height:20px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>';

	container.appendChild(checkbox);
	container.appendChild(title);
	container.appendChild(dueDate);
	container.appendChild(editButton);
	container.appendChild(deleteButton);

	return container;
};

export default createTaskElement;
