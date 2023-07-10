////////////////////////////// VARIABLES //////////////////////////////////
const input = document.querySelector("#input");
const ul = document.querySelector("ul");
const parrafo = document.querySelector(".parrafo");
const contador = document.querySelector(".contador");

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
  console.log(li);

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
  const li = ul.getElementsByTagName("li");

  for (let e = 0; e < li.length; e++) {
    if (li[e].textContent.toUpperCase() == datos.toUpperCase()) {
      return false;
    }
  }
  return true;
}

///////////////////////// FUNCIONE INDENTIFICAR SI ES MAYUSCULA /////////////////////////////////

////////////////////////////////// FUNCION BTN ELIMINAR /////////////////////////////

function createBtnDelete() {
  let Eliminar = document.createElement("i");

  Eliminar.className = "fa fa-trash";

  Eliminar.addEventListener("click", handleDelete);

  return Eliminar;
}

function handleDelete(e) {
  let item = e.target.parentElement;

  let checkBox = item.querySelector("input");

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "¿Deseas eliminar esta tarea?",
      text: "se eliminara esta tarea de tu lista",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "si deseo eliminar",
      cancelButtonText: "no deseo eliminar",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          "Se elimino con exito",
          "se elimino de tu lista.",
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
          "se cancelo con exito",
          "no se elemino de tu lista",
          "error"
        );
      }
      let items = ul.getElementsByTagName("li");
      if (items.length == 0) {
        parrafo.style.display = "block";
      }
    });
}

////////////////////////////////// FUNCION BTN ELIMINAR /////////////////////////////

////////////////////////////////// FUNCION CHECKBOX /////////////////////////////

function createCheckBox(id, isCheck) {
  let btnCheck = document.createElement("input");
  btnCheck.setAttribute("type", "checkbox");
  btnCheck.className = "btnCheckBox";

  btnCheck.checked = isCheck;

  btnCheck.addEventListener("click", () => handleCheck(id, btnCheck));

  return btnCheck;
}

function handleCheck(id, btnCheck) {
  let check = {
    check: btnCheck.checked,
  };

  updateTask(id, check);

  if (btnCheck.checked) {
    let cuenta = Number(contador.textContent);
    cuenta = cuenta + 1;
    contador.textContent = cuenta;
  } else if (contador.textContent > 0) {
    let cuenta = Number(contador.textContent);
    cuenta = cuenta - 1;
    contador.textContent = cuenta;
  }
}
////////////////////////////////// FUNCION CHECKBOX /////////////////////////////

async function creacion(e) {
  e.preventDefault;
  let texto = input.value;

  if (esMayuscula(texto)) {
    if (ValidarDatos(texto)) {
      if (texto !== "" && texto.trim()) {
        input.value = "";

        let task = {
          task: texto,
          check: false,
        };

        let resultadoPost = await posTask(task);

        crearTarea(resultadoPost.id, resultadoPost.task);
      } else {
        Swal.fire({
          title: "Campo vacio",
          text: "campo vacio ingrese algo no se pase de tonto",
          imageUrl:
            "https://cdn-jagbh.nitrocdn.com/TYVZHePxisufUuSiVWDElscksnaOxEbE/assets/images/optimized/rev-3e675ee/media/yr7n0u3qzO9nG/giphy.gif",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    } else {
      Swal.fire("Good job!", "You clicked the button!", "success");
    }
    input.value = "";
  } else {
    Swal.fire({
      title: "tarea repetida",
      text: "ingrese una tarea no repetida",
      imageUrl: "https://i.makeagif.com/media/8-08-2016/L0-FsN.gif",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    input.value = "";
  }
}

function crearTarea(id, texto, isCheck) {
  const li = document.createElement("li");
  li.className = "li";
  const p = document.createElement("p");
  li.id = id;
  p.textContent = texto;

  ul.appendChild(li);
  li.appendChild(createCheckBox(id, isCheck));
  li.appendChild(p);
  li.appendChild(createBtnDelete());
  parrafo.style.display = "none";
}

async function cargarTareas() {
  const tareas = await getTasks();
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

export { validar, creacion, cargarTareas };
