////////////////////////////// VARIABLES //////////////////////////////////
let input = document.querySelector("#input");
let btn = document.querySelector("#btn-agregar");
let ul = document.querySelector("ul");
let parrafo = document.querySelector(".parrafo");
let contador = document.querySelector(".contador");

////////////////////////////// VARIABLES //////////////////////////////////

////////////////////////////// EXPORTACIONES //////////////////////////////////

import { posTask, getTasks, deleteTask, updateTask } from "./api.js";

////////////////////////////// EXPORTACIONES //////////////////////////////////

/////////////////////////////////// FUNCIONES /////////////////////////////////

////////////////////////// FUNCION CAMPOS VACIOS /////////////////////////////////
function validar() {
  let datos = input.value;
  if (datos.length == 0) {
    Swal.fire({
      title: "campo vacio",
    });
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
  var Eliminar = document.createElement("i");
  var checkBox = document.querySelector("input");

  Eliminar.className = "fa fa-trash";

  Eliminar.addEventListener("click", (e) => {
    let item = e.target.parentElement;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your file has been deleted.",
            "success"
          );

          if (checkBox.checked) {
            let cuenta = Number(contador.textContent);
            cuenta = cuenta - 1;
            contador.textContent = cuenta;
          }
          ul.removeChild(item);

          deleteTask(item.id);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
        let items = ul.getElementsByTagName("li");
        if (items.length == 0) {
          parrafo.style.display = "block";
        }   
      });
  });

  return Eliminar;
}
////////////////////////////////// FUNCION BTN ELIMINAR /////////////////////////////

////////////////////////////////// FUNCION CHECKBOX /////////////////////////////
function checkBox(id, isCheck) {
  let btnCheck = document.createElement("input");
  btnCheck.setAttribute("type", "checkbox");
  btnCheck.className = "btnCheckBox";

  btnCheck.checked = isCheck;

  btnCheck.addEventListener("click", function () {
    let check = {
      check: btnCheck.checked,
    };

    updateTask(id, check);

    if (btnCheck.checked) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "tarea enviada con exito",
        showConfirmButton: false,
        timer: 1000,
      });
      let cuenta = Number(contador.textContent);
      cuenta = cuenta + 1;
      contador.textContent = cuenta;
    } else if (contador.textContent > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "tarea quitada con exito",
        showConfirmButton: false,
        timer: 1000,
      });
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

        let task = {
          task: texto,
          check: false,
        };

        let resultadoPost = await posTask(task);

        crearTarea(resultadoPost.id, resultadoPost.task);
      }
    } else {
      Swal.fire("Good job!", "You clicked the button!", "success");
    }
    input.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "OMIGAAA",
      text: "Hay una tarea repetida chupe mango",
    });
  }
}

function crearTarea(id, texto, isCheck) {
  let li = document.createElement("li");
  li.className = "li";
  let p = document.createElement("p");
  li.id = id;
  p.textContent = texto;

  ul.appendChild(li);
  li.appendChild(checkBox(id, isCheck));
  li.appendChild(p);
  li.appendChild(BtnEliminar());
  parrafo.style.display = "none";
}

async function cargarTareas() {
  let tareas = await getTasks();
  let contadorCarga = 0;
  tareas.forEach((tarea) => {
    crearTarea(tarea.id, tarea.task, tarea.check);
  });

  for (let index = 0; index < tareas.length; index++) {
    if (tareas[index].check == true) {
      contadorCarga++;
    }
  }
  contador.textContent = contadorCarga;
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
