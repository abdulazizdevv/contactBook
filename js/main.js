const elForm = document.querySelector(".js-form");
const elList = document.querySelector(".js-list");
const elName = document.querySelector(".js-name");
const elSelect = document.querySelector("#js-select");
const elPhone = document.querySelector(".js-phone");

const localData = JSON.parse(window.localStorage.getItem("List"));
const todos = localData || [];

let renderTodo = (arr, node) => {
  window.localStorage.setItem("List", JSON.stringify(todos));
  node.innerHTML = "";
  arr.forEach((el) => {
    let newTodoName = document.createElement("h3");
    // newTodo.setAttribute("class", "list-group-item");

    let relationTxt = document.createElement("h4");
    let PhoneNum = document.createElement("p");

    let editButton = document.createElement("button");
    editButton.setAttribute("class", "btn btn-warning ms-auto js-edit-btn");
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-danger ms-1 js-delete-btn");
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.todoId = el.id;
    editButton.dataset.todoId = el.id;

    elList.appendChild(newTodoName);

    newTodoName.innerHTML = "Name: " + el.name;
    relationTxt.innerHTML = "Relation: " + el.relation;
    PhoneNum.innerHTML = "Phone number: " + el.phone;

    elList.appendChild(relationTxt);
    elList.appendChild(PhoneNum);
    elList.appendChild(editButton);
    elList.appendChild(deleteButton);

    elName.value = "";
    elPhone.value = "";
    elSelect.value = "";
  });
};

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const findedIndex = todos.findIndex((el) => el.phone === elPhone.value);
  console.log(findedIndex);
  if (findedIndex >= 0) {
    alert("There is a user of such a number");
  } else {
    let elNameVal = elName.value;
    let elPhoneVal = elPhone.value;
    let elSelectVal = elSelect.value;

    const todo = {
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
      name: elNameVal,
      relation: elSelectVal,
      phone: elPhoneVal,
      isCompleted: false,
    };
    todos.push(todo);
    renderTodo(todos, elList);
  }
});

if (todos.length != 0) {
  renderTodo(todos, elList);
}

elList.addEventListener("click", (evt) => {
  if (evt.target.matches(".js-delete-btn")) {
    let listId = evt.target.dataset.todoId;
    let findedList = todos.findIndex((el) => el.id == listId);
    todos.splice(findedList, 1);
    renderTodo(todos, elList);
  }
  if (evt.target.matches(".js-edit-btn")) {
    let listId = evt.target.dataset.todoId;

    let findedList = todos.find((el) => el.id == listId);
    let editName = prompt("edit name", findedList.name);
    let editRelation = prompt("edit relationship", findedList.relation);
    let editPhone = prompt("edit phone", findedList.phone);

    findedList.name = editName;
    findedList.relation = editRelation;
    findedList.phone = editPhone;

    renderTodo(todos, elList);
  }
});

let ModeBtn = document.querySelector(".mode");
let theme = false;

ModeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let NewBg = theme ? "dark" : "light";
  theme = !theme;
  window.localStorage.setItem("theme", NewBg);
  ChageMode();
});

let ChageMode = () => {
  if (window.localStorage.getItem("theme") == "dark") {
    document.body.classList.add("dark");
  } else document.body.classList.remove("dark");
};
ChageMode();
