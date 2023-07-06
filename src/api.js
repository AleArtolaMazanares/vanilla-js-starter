////////////////////////////////// API /////////////////////////////////////
export { posTask, getTasks, deleteTask, updateTask };

async function posTask(task) {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const post = await response.json();
  return post;
}
async function getTasks() {
  const response = await fetch("http://localhost:3000/api/task", {
    method: "GET",
  });

  const getPost = await response.json();
  return getPost;
}

async function deleteTask(id) {
  const response = await fetch("http://localhost:3000/api/task/" + id, {
    method: "DELETE",
  });
  const deleteTask = await response.json();
  return deleteTask;
}
async function updateTask(id, task) {
  const response = await fetch("http://localhost:3000/api/task/" + id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  const post = await response.json();
  return post;
}

////////////////////////////////// API /////////////////////////////////////

// ejecutar una funcion cuando cargue la pagina (onload) investigar
//obtener la lista de los datos del servidor
//como crear una tarea sin obtener el texto del input respuesta tirarse por la ventana
//como crear una tarea de cada elemento de la lista
