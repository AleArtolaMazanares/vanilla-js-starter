////////////////////////////////// IMPORTACIONES //////////////////////////////
import {
  validar,
  ValidarDatos,
  esMayuscula,
  btn,
  input,
  ul,
  parrafo,
  checkBox,
  BtnEliminar,
} from "./prueba.js";

////////////////////////////////// IMPORTACIONES //////////////////////////////

////////////////////////////////// VALIDAR CAMPO //////////////////////////////
btn.addEventListener("click", validar, input);
////////////////////////////////// VALIDAR CAMPO //////////////////////////////

//////////////////////////////////  UNIR TODO //////////////////////////////

btn.addEventListener("click", (e) => {
  e.preventDefault;
  let texto = input.value;
  if (esMayuscula(texto)) {
    if (ValidarDatos(texto)) {
      if (texto !== "") {
        let li = document.createElement("li");
        li.className = "li";
        let p = document.createElement("p");

        p.textContent = texto;

        input.value = "";

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
