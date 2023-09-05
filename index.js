const formEl = document.querySelector(".form");
const inputEl = document.querySelector(".input");
const ulEl = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list")); //to save items on a local storage. Converting from string to array

list.forEach(task=>{
  toDoList(task);
})

formEl.addEventListener("submit", (event)=>{
  event.preventDefault(); //prevents page to be refreshed
  toDoList();
  console.log(inputEl.value);
});

function toDoList(task){
  let newTask = inputEl.value;
  if(task){
    newTask = task.name;
  }

  const liEl = document.createElement("li");
  if(task && task.checked){
    liEl.classList.add("checked"); //to get info about checked element after refreshing the page
  }
  liEl.innerText = newTask;
  ulEl.appendChild(liEl);
  inputEl.value = "";
  const checkBtnEl = document.createElement("div");
  checkBtnEl.innerHTML = `
  <i class="fa-solid fa-check">
  `;
  liEl.appendChild(checkBtnEl);

  const trashBtnEl = document.createElement("div");
  trashBtnEl.innerHTML = `
  <i class="fa-solid fa-trash">
  `;
  liEl.appendChild(trashBtnEl);

  checkBtnEl.addEventListener("click", ()=>{
    liEl.classList.toggle("checked"); //changes class from checked to "without class" and opposite
    updateLocalStorage();
  });
  updateLocalStorage();

  trashBtnEl.addEventListener("click", ()=>{
    liEl.remove();
    updateLocalStorage();
  });
  updateLocalStorage();
}

function updateLocalStorage(){
    const liEls = document.querySelectorAll("li");
    let list = [];
    liEls.forEach(liEl=>{
      list.push({
        name: liEl.innerText,
        checked: liEl.classList.contains("checked"),
      })
    })
    localStorage.setItem("list", JSON.stringify(list));
    //first is list which we want to store, second is variable in a string form so we use JSON to convert it to string
}