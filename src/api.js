////////////////////////////////// API /////////////////////////////////////
export { post, get, delete1 };

async function post(task) {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify(task),
  });

  const postedTask = await response.json();
  return postedTask;
}

async function get() {
  const response = await fetch("http://localhost:3000/api/task");
  const tasks = await response.json();
  return tasks;
}

async function delete1(id) {
  const response = await fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
  });
  const tasks = await response.json();
  return tasks;
}
////////////////////////////////// API /////////////////////////////////////

// ejecutar una funcion cuando cargue la pagina (onload) investigar
//obtener la lista de los datos del servidor
//como crear una tarea sin obtener el texto del input respuesta tirarse por la ventana
//como crear una tarea de cada elemento de la lista
