
//Variables con la imagen SVG

let removeSVG = '<svg  class="fill" aria-hidden="true" data-prefix="fal" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="fill" ><path fill="currentColor"  d="M336 64l-33.6-44.8C293.3 7.1 279.1 0 264 0h-80c-15.1 0-29.3 7.1-38.4 19.2L112 64H24C10.7 64 0 74.7 0 88v2c0 3.3 2.7 6 6 6h26v368c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V96h26c3.3 0 6-2.7 6-6v-2c0-13.3-10.7-24-24-24h-88zM184 32h80c5 0 9.8 2.4 12.8 6.4L296 64H152l19.2-25.6c3-4 7.8-6.4 12.8-6.4zm200 432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V96h320v368zm-176-44V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm-80 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12zm160 0V156c0-6.6 5.4-12 12-12h8c6.6 0 12 5.4 12 12v264c0 6.6-5.4 12-12 12h-8c-6.6 0-12-5.4-12-12z" class="fill"></path></svg>'
let completeSVG = '<svg aria-hidden="true" data-prefix="fal" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-7x fill"><path fill="currentColor" d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" class="fill"></path></svg>'


//Usuario clickea en el botton de agregado
//Solo si hay texto en el campo de todo list

document.getElementById("add").addEventListener("click", function () {
    let value = document.getElementById("item").value;
    if (value) {
        addItemTodo(value);

        document.getElementById("item").value = "";
    }
    
}); 

function removeItem () {
    let item = this.parentNode.parentNode
    let parent = item.parentNode;

    parent.removeChild(item);
}


function completeItem () {
    let item = this.parentNode.parentNode
    let parent = item.parentNode;
    let id = parent.id;


    //Revisa si el item deberia ser agregado a la lista de por hacer o ya esta echo. Puede volver a ir a la lista de volver a hacer
    let target = (id === "todo") ? document.getElementById("complete"):document.getElementById("todo");

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0])
}

function addItemTodo(item) {
    let list = document.getElementById("todo")

    let todo = document.createElement("li")
    todo.innerText = item;

    let buttons = document.createElement("div");
    buttons.classList.add ("buttons");

    let remove = document.createElement("button");
    remove.classList.add ("remove");
    remove.innerHTML = removeSVG;

    //Agregar evento de click para borrar elemento de la lista
    remove.addEventListener("click", removeItem)

    let complete = document.createElement("button")
    complete.classList.add("complete");
    complete.innerHTML = completeSVG;

    //Agregar click event para cuando completas
    complete.addEventListener("click", completeItem)


    buttons.appendChild(remove);
    buttons.appendChild(complete);
    todo.appendChild(buttons);
    list.insertBefore(todo, list.childNodes[0]);
}