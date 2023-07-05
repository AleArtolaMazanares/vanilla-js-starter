////////////////////////////// VARIABLES //////////////////////////////////
let input = document.querySelector("#input");
let btn = document.querySelector("#btn-agregar");
let ul = document.querySelector("ul");
let parrafo = document.querySelector(".parrafo");
let contador = document.querySelector(".contador");

////////////////////////////// VARIABLES //////////////////////////////////

////////////////////////////// EXPORTACIONES //////////////////////////////////

import { posTask, getTasks, deleteTask } from "./api.js";

////////////////////////////// EXPORTACIONES //////////////////////////////////

/////////////////////////////////// FUNCIONES /////////////////////////////////

////////////////////////// FUNCION CAMPOS VACIOS /////////////////////////////////
function validar() {
  let datos = input.value;
  if (datos.length == 0) {
    alert("campo invalido");
  }
}

////////////////////////// FUNCION CAMPOS VACIOS /////////////////////////////////

///////////////////////// FUNCIONE PARA VALIDAR DATOS /////////////////////////////////
function ValidarDatos(datos) {
  let li = ul.getElementsByTagName("li");

  for (let e = 0; e < li.length; e++) {
    if (li[e].innerText === datos) {
      return false;
    }
  }
  return true;
}

///////////////////////// FUNCIONE PARA VALIDAR DATOS /////////////////////////////////

///////////////////////// FUNCIONE INDENTIFICAR SI ES MAYUSCULA /////////////////////////////////
function esMayuscula() {
  let datos = input.value;
  let elementos = ul.getElementsByTagName("li");

  for (let e = 0; e < elementos.length; e++) {
    if (elementos[e].textContent.toUpperCase() == datos.toUpperCase()) {
      return false;
    }
  }
  return true;
}

///////////////////////// FUNCIONE INDENTIFICAR SI ES MAYUSCULA /////////////////////////////////

////////////////////////////////// FUNCION BTN ELIMINAR /////////////////////////////

function BtnEliminar() {
  let Eliminar = document.createElement("i");

  Eliminar.className = "fa fa-trash";

  Eliminar.addEventListener("click", (e) => {
    let item = e.target.parentElement;
    let checkBox = item.querySelector("input");

    if (checkBox.checked) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    }
    ul.removeChild(item);

    deleteTask(item.id);

    let items = ul.getElementsByTagName("li");
    if (items.length == 0) {
      parrafo.style.display = "block";
    }
  });

  return Eliminar;
}
////////////////////////////////// FUNCION BTN ELIMINAR /////////////////////////////

////////////////////////////////// FUNCION CHECKBOX /////////////////////////////
function checkBox() {
  let btnCheck = document.createElement("input");
  btnCheck.setAttribute("type", "checkbox");
  btnCheck.className = "btnCheckBox";

  btnCheck.addEventListener("click", function () {
    if (btnCheck.checked) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
    } else if (contador.textContent > 0) {
      let cuenta = Number(contador.textContent);
      cuenta = cuenta - 1;
      contador.textContent = cuenta;
    } else if (btnCheck.checked) {
    }
  });

  return btnCheck;
}
////////////////////////////////// FUNCION CHECKBOX /////////////////////////////

async function creacion(e) {
  e.preventDefault;
  let texto = input.value;

  if (esMayuscula(texto)) {
    if (ValidarDatos(texto)) {
      if (texto !== "") {
        input.value = "";

        let task = { task: texto }; // agregar false

        let resultadoPost = await posTask(task);

        console.log(resultadoPost);

        crearTarea(resultadoPost.id, resultadoPost.task);

        parrafo.style.display = "none";
      }
    } else {
      alert("La tarea que ingresaste esta repetida");
    }
    input.value = "";
  } else {
    alert("La tarea que ingresaste esta repetida");
  }
}

function crearTarea(id, texto) {
  //agregar uno mas
  let li = document.createElement("li");
  li.className = "li";
  let p = document.createElement("p");
  li.id = id;
  p.textContent = texto;

  ul.appendChild(li);
  li.appendChild(checkBox()); 
  li.appendChild(p);
  li.appendChild(BtnEliminar());
}

async function cargarTareas() {
  let tareas = await getTasks();
  tareas.forEach((tarea) => {
    crearTarea(tarea.id, tarea.task);
  });
}

/////////////////////////////////// FUNCIONES /////////////////////////////////

export {
  validar,
  ValidarDatos,
  esMayuscula,
  checkBox,
  BtnEliminar,
  input,
  btn,
  ul,
  parrafo,
  contador,
  creacion,
  cargarTareas,
};

//
