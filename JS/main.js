//Variables con la imagen SVG

let removeSVG =
  '<svg  class="fill" aria-hidden="true" data-prefix="fal" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill" ><path fill="currentColor"  d="M336 64l-33.6-44.8C293.3 7.1 279.1 0 264 0h-80c-15.1 0-29.3 7.1-38.4 19.2L112 64H24C10.7 64 0 74.7 0 88v2c0 3.3 2.7 6 6 6h26v368c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V96h26c3.3 0 6-2.7 6-6v-2c0-13.3-10.7-24-24-24h-88zM184 32h80c5 0 9.8 2.4 12.8 6.4L296 64H152l19.2-25.6c3-4 7.8-6.4 12.8-6.4zm200 432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V96h320v368zm-176-44V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm-80 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm160 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12z" class="fill"></path></svg>';
let completeSVG =
  '<svg aria-hidden="true" data-prefix="fal" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-7x fill"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" class="fill"></path></svg>';
let buttonAdd = document.getElementById("add");
let textField = document.getElementById("item");

let data = (localStorage.getItem("listaTodo")) ? JSON.parse(localStorage.getItem("listaTodo")):{
  todo: [],
  complete: [],
};

renderTodoList()

console.log(data);

function renderTodoList () {
    if(!data.todo.length && !data.complete.length) return;

    for (let i=0; i < data.todo.length; i++) {
        let value = data.todo[i]
        addItemTodo(value)

    }

    for (let j = 0; j< data.complete.length; j++) {
        let value = data.complete[j];
        addItemTodo(value, true);
    }
}

//Usuario clickea en el botton de agregado
//Solo si hay texto en el campo de todo list

buttonAdd.addEventListener("click", function () {
  let value = document.getElementById("item").value;
  if (value) {
    addItem(value)
  }
});

textField.addEventListener("keypress", function (e) {
  let value = document.getElementById("item").value;

  if (e.key === "Enter" && value) {
    addItem(value)
  }
  
});


function dataObjectUpdate (){
    localStorage.setItem("listaTodo", JSON.stringify(data))
    
}

function addItem (value) {
    addItemTodo(value);
    document.getElementById("item").value = "";
    data.todo.push(value);
    dataObjectUpdate();
}

function removeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = parent.innerText;

  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.complete.splice(data.complete.indexOf(value), 1);
  }
  
  dataObjectUpdate ()
  parent.removeChild(item);
}

function completeItem() {
  let item = this.parentNode.parentNode;
  let parent = item.parentNode;
  let id = parent.id;
  let value = item.innerText;

  //Cambia del array TODO al Complete
  if (id === "todo") {
    data.todo.splice(data.todo.indexOf(value), 1);
    data.complete.push(value);
  } else {
    data.complete.splice(data.complete.indexOf(value), 1);
    data.todo.push(value);
  }
  
 
  //Revisa si el item deberia ser agregado a la lista de por hacer o ya esta echo. Puede volver a ir a la lista de volver a hacer
  let target =
    id === "todo"
      ? document.getElementById("complete")
      : document.getElementById("todo");

      dataObjectUpdate ()
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);

}

//Funcion que agrega al HTML

function addItemTodo(item, completed) {
  let list = (completed) ? document.getElementById("complete"):document.getElementById("todo");

  let todo = document.createElement("li");
  todo.innerText = item;

  let buttons = document.createElement("div");
  buttons.classList.add("buttons");

  let remove = document.createElement("button");
  remove.classList.add("remove");
  remove.innerHTML = removeSVG;

  //Agregar evento de click para borrar elemento de la lista
  remove.addEventListener("click", removeItem);

  let complete = document.createElement("button");
  complete.classList.add("complete");
  complete.innerHTML = completeSVG;

  //Agregar click event para cuando completas
  complete.addEventListener("click", completeItem);

  

  buttons.appendChild(remove);
  buttons.appendChild(complete);
  todo.appendChild(buttons);
  list.insertBefore(todo, list.childNodes[0]);

  dataObjectUpdate ()
}
