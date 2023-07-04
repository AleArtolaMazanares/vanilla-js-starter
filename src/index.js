////////////////////////////////// IMPORTACIONES //////////////////////////////

import {
  validar,
  ValidarDatos,
  esMayuscula,
  checkBox,
  input,
  btn,
  ul,
  parrafo,
  BtnEliminar,
} from "./funciones.js";

import { post } from "./api.js";

////////////////////////////////// IMPORTACIONES //////////////////////////////

////////////////////////////////// VALIDAR CAMPO //////////////////////////////
btn.addEventListener("click", validar);
////////////////////////////////// VALIDAR CAMPO //////////////////////////////

//////////////////////////////////  UNIR TODO //////////////////////////////

btn.addEventListener("click", async (e) => {
  e.preventDefault;
  let texto = input.value;
  if (esMayuscula(texto)) {
    if (ValidarDatos(texto)) {
      if (texto !== "") {
        input.value = "";

        let task = { task: texto };
        console.log(task);
        let resultadoPost = await post(task);

        //funcion();  resultadoPost.id, resultadoPostTask

        //parametros id, texto,
        let li = document.createElement("li");
        li.className = "li";
        let p = document.createElement("p");
        li.id = resultadoPost.id;
        p.textContent = texto;

        ul.appendChild(li);
        li.appendChild(checkBox());
        li.appendChild(p);
        li.appendChild(BtnEliminar());

        parrafo.style.display = "none";
      }
    } else {
      alert("La tarea que ingresaste esta repetida");
    }
    input.value = "";
  } else {
    alert("La tarea que ingresaste esta repetida");
  }
});

//////////////////////////////////  UNIR TODO //////////////////////////////
