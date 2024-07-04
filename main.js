let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let currentFilter = "all";

addButton.addEventListener("click", addTask);

// 엔터를 이용하여 할 일 등록하기
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 탭 클릭 이벤트 리스너
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    currentFilter = this.dataset.filter;
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    moveUnderline(this); // under-line 이동 함수 호출
    render();
  });
});

// 할 일 추가
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
  taskInput.value = ""; // 입력 필드 초기화
  render();
}

// 렌더링 함수
function render() {
  let resultHTML = "";
  let filteredTasks = [];

  if (currentFilter === "all") {
    filteredTasks = taskList;
  } else if (currentFilter === "progress") {
    filteredTasks = taskList.filter((task) => !task.isComplete);
  } else if (currentFilter === "complete") {
    filteredTasks = taskList.filter((task) => task.isComplete);
  }

  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    const taskClass = task.isComplete ? "task done" : "task";

    resultHTML += `
    <div class="${taskClass}">
    <div>${task.taskContent}</div>
    <div class="task-actions">
        <button class="check-button" style="${
          task.isComplete ? "display: none;" : "display: inline-block;"
        }" onclick="toggleComplete('${task.id}')">
        <i class="fa-solid fa-check"></i>
        </button>
        <button class="undo-button" style="${
          task.isComplete ? "display: inline-block;" : "display: none;"
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

// 할 일 완료 상태 토글
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

// 할 일 삭제
function deleteTask(id) {
  taskList = taskList.filter((task) => task.id !== id);
  render();
}

// 랜덤 ID 생성
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// .under-line 이동
function moveUnderline(selectedTab) {
  let underline = document.getElementById("under-line");
  underline.style.width = selectedTab.offsetWidth + "px";
  underline.style.left = selectedTab.offsetLeft + "px";
}

// '모두'탭 활성화
document.querySelector(".tab[data-filter='all']").classList.add("active");
// under-line 초기 길이 조정
moveUnderline(document.querySelector(".tab[data-filter='all']"));
render();
