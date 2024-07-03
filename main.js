let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  if (taskInput.value.trim() === "") {
    return;
  }

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let resultHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    const task = taskList[i];
    const taskClass = task.isComplete ? "task done" : "task";

    resultHTML += `
            <div class="${taskClass}">
                <div>${task.taskContent}</div>
                <div class="task-actions">
                    <button class="check-button" style="${
                      task.isComplete
                        ? "display: none;"
                        : "display: inline-block;"
                    }" onclick="toggleComplete('${task.id}')">
                    <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="undo-button" style="${
                      task.isComplete
                        ? "display: inline-block;"
                        : "display: none;"
                    }" onclick="toggleComplete('${task.id}')">
                    <i class="fa-solid fa-rotate-right"></i>
                    </button>
                    <button onclick="deleteTask('${task.id}')">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>`;
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
