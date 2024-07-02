// 유저가 값을 입력한다
// 버튼을 클릭하면 할 일이 추가된다
// 삭제 버튼을 클릭하면 할 일이 삭제된다
// 완료 버튼을 클릭하면 할 일이 끝나면서 밑줄이 간다
// 진행중, 완료 탭을 누르면 언더바가 이동한다
// 완료 탭은 완료 아이템만, 진행중 탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체 아이템으로 돌아옴



// 각 탭에 대한 클릭 이벤트 추가
let tablinks = document.querySelectorAll('.tablinks');
tablinks.forEach(tab => {
    tab.addEventListener('click', function() {

        tablinks.forEach(t => t.classList.remove('active'));

        this.classList.add('active');
        
        const underline = document.getElementById('underline');
        underline.style.width = `${this.offsetWidth}px`;
        underline.style.left = `${this.offsetLeft}px`;
    });
});


let taskInput = document.getElementById("task-input");
let addBtn = document.getElementById("add-btn");
let taskList = []
addBtn.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    console.log(taskList);
    render();
}

function render() {
    let resultHTML = ''
    for(let i=0; i<taskList.length; i++){
        resultHTML += `<div class="task">
        <div>${taskList[i]}</div>
        <div class="task-actions">
            <button>완료</button>
            <button>삭제</button>
        </div>
    </div>`

    }

    document.getElementById("task-board").innerHTML = resultHTML
}

