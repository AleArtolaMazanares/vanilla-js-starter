////////////////////////////////// IMPORTACIONES //////////////////////////////

import { validar, btn, creacion, cargarTareas } from "./funciones.js";

////////////////////////////////// IMPORTACIONES //////////////////////////////

////////////////////////////////// VALIDAR CAMPO //////////////////////////////
btn.addEventListener("click", validar);
////////////////////////////////// VALIDAR CAMPO //////////////////////////////

//////////////////////////////////  UNIR TODO //////////////////////////////

btn.addEventListener("click", creacion);

//////////////////////////////////  UNIR TODO //////////////////////////////

document.addEventListener("DOMContentLoaded", cargarTareas);
