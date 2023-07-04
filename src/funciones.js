////////////////////////////// VARIABLES //////////////////////////////////
let input = document.querySelector("#input");
let btn = document.querySelector("#btn-agregar");
let ul = document.querySelector("ul");
let parrafo = document.querySelector(".parrafo");
let contador = document.querySelector(".contador");

////////////////////////////// VARIABLES //////////////////////////////////

////////////////////////////// EXPORTACIONES //////////////////////////////////
import { delete1 } from "./api.js";

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
};
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

    delete1(item.id);

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

/////////////////////////////////// FUNCIONES /////////////////////////////////
