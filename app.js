// 1. VARIABLES
const form = document.querySelector("#formulario_input");
const btnAgregar = document.querySelector("#btn_agregar");
const listaU = document.querySelector("#lista_todo");
let tareas = [];

btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    const txtInput = form.txt_input.value;
    agregarTarea(txtInput);
})


function agregarTarea(txtInput) {
    if (txtInput.length > 0) {
        tareas.push(txtInput);
        // crearTarea(txtInput);
        actualizarTareas();
        form.txt_input.value = "";
    }
}

function crearTarea(txtInput, index) {
    const item = document.createElement("li");
    // item.innerText = txtInput;
    
    const itemID = "tarea_" + index;
    item.setAttribute("class", "item_todo");
    item.innerHTML = `
        <input type="checkbox" id="${itemID}" class="check">
        <label for="${itemID}" class="check_marcador">
            <i class="bi bi-circle"></i>
        </label>
        <label for="${itemID}" class="txt_todo">
            ${txtInput}
        </label>
        <button class="btn_eliminar"><i class="bi bi-trash"></i></button>
    `

    const btnEliminar = item.querySelector(".btn_eliminar");
    btnEliminar.addEventListener("click", () => {
        eliminarTarea(index);
    })

    const checkbox = item.querySelector(".check");
    checkbox.addEventListener('change', () => {
        // Encuentra el <i> dentro del label .check_marcador asociado al checkbox
        const icono = checkbox
            .closest('li')
            .querySelector('.check_marcador i');

        // Cambiar el icono dependiendo si está marcado o no
        if (checkbox.checked) {
            icono.classList.remove('bi-circle');
            icono.classList.add('bi-check-circle-fill');
        } else {
            icono.classList.remove('bi-check-circle-fill');
            icono.classList.add('bi-circle');
        }
    });
    // listaU.append(item);
    return item;
}

function actualizarTareas() {
    listaU.innerHTML = "";
    tareas.forEach((tarea, index) => {
        let tareaItem = crearTarea(tarea, index);
        listaU.append(tareaItem);
    })
}

function eliminarTarea(index) {
    tareas = tareas.filter((_, i) => i !== index)
    actualizarTareas();
}