document.addEventListener("DOMContentLoaded", function () {
    const tasklist = document.getElementById("tasklist");
    const taskinput = document.getElementById("taskinput");
    const addtaskb = document.getElementById("addtask");

    // Load tasks from storage when the DOM is ready
    chrome.storage.sync.get({ tasks: [] }, function (data) {
        const tasks = data.tasks;
        tasks.forEach(function (task) {
            createTaskElement(task.text, task.completed, tasklist);
        });
    });

    addtaskb.addEventListener("click", function () {
        const tasktext = taskinput.value.trim();
        if (tasktext !== "") {
            createTaskElement(tasktext, false, tasklist); // New tasks are not completed

            // Save tasks to storage
            saveTasksToStorage();

            // Clear input
            taskinput.value = "";
        }
    });

    // Function to create a new task element
    function createTaskElement(taskText, completed, tasklist) {
        const taskitem = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed; // Set checkbox state based on completion status
        const label = document.createElement("label");
        label.textContent = taskText;

        // Add "edit" button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editb");

        editButton.addEventListener("click", function () {
            // Show edit task modal
            showEditTaskModal(label, checkbox);
        });

        taskitem.appendChild(checkbox);
        taskitem.appendChild(label);
        taskitem.appendChild(editButton);

        taskitem.classList.add("task");
        if (completed) {
            label.classList.add("completed"); // Apply completed style if task is completed
        }
        tasklist.appendChild(taskitem);

        // Listen for changes in checkbox state and toggle the strikethrough
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                label.classList.add("completed");
            } else {
                label.classList.remove("completed");
            }
            // Update task completion status in storage
            saveTasksToStorage();
        });
    }

    // Function to show the edit task modal
    function showEditTaskModal(label, checkbox) {
        const modal = document.createElement("div");
        modal.classList.add("edit-task-modal");

        const modalContent = document.createElement("div");
        modalContent.classList.add("edit-task-modal-content");

        const closeButton = document.createElement("span");
        closeButton.classList.add("edit-task-modal-close");
        closeButton.innerHTML = "&times;";

        closeButton.addEventListener("click", function () {
            // Close the modal when close button is clicked
            modal.style.display = "none";
        });

        const editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = label.textContent;
        editInput.classList.add("edit-task-input");

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.classList.add("edit-task-save-button");

        saveButton.addEventListener("click", function () {
            // Save the edited task and close the modal
            label.textContent = editInput.value;
            modal.style.display = "none";
            // Update task in storage
            saveTasksToStorage();
        });

        modalContent.appendChild(closeButton);
        modalContent.appendChild(editInput);
        modalContent.appendChild(saveButton);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Show the modal
        modal.style.display = "block";
    }

    // Function to save tasks to storage
    function saveTasksToStorage() {
        const tasks = [];
        const taskItems = tasklist.querySelectorAll("li.task");
        taskItems.forEach(function (taskItem) {
            const label = taskItem.querySelector("label");
            const checkbox = taskItem.querySelector("input[type='checkbox']");
            tasks.push({
                text: label.textContent,
                completed: checkbox.checked
            });
        });
        chrome.storage.sync.set({ tasks: tasks });
    }
});
