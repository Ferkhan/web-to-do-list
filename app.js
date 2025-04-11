// 1. VARIABLES
const form = document.querySelector("#formulario_input");
const btnAgregar = document.querySelector("#btn_agregar");
const listaU = document.querySelector("#lista_todo");

let tareas = [];

// 2. LISTENERS
btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();
    
    // EXTRAER EL TEXTO QUE INGRESÓ EL USUARIO
    const txtInput = form.txt_input.value;
    agregarTarea(txtInput);
})


// 3. FUNCIONES
function agregarTarea(txtInput) {
    if (txtInput.length > 0) {
        tareas.push(txtInput);
        actualizarTareas();
        form.txt_input.value = ""
    }
        
}

function crearTarea(txtInput, index) {
    // CREAR UN ELEMENTO DE LISTA  
    const item = document.createElement("li");

    // CREAR UN ID IDEPENDIENTE
    const itemID = "tarea_" + index;

    // CONTENIDO DE ELEMENTO DE LISTA
    item.innerHTML = `
        <li class="item_todo">
            <input type="checkbox" id="${itemID}" class="check">
            <label for="${itemID}" class="check_marcador">
                <i class="bi bi-circle"></i>
            </label>
            <label for="${itemID}" class="txt_todo">
                ${txtInput}
            </label>
            <button class="btn_eliminar">
                <i class="bi bi-trash"></i>
            </button>
        </li>
    `

    const checkbox = item.querySelector(".check")
    checkbox.addEventListener("change", () => {
        // ENCONTRAR EL i DENTRO DE LABEL
        const icono = checkbox
        .closest("li")
        .querySelector(".check_marcador i");

        // CAMBIAR CONTENIDO DE ICONO CON RESPECTO A SI ESTÁ MARCADO O NO
        if (checkbox.checked) {
            icono.classList.remove("bi-circle");
            icono.classList.add("bi-check-circle-fill");
        } else {
            icono.classList.remove("bi-check-circle-fill");
            icono.classList.add("bi-circle");
        }
    });

    const btnEliminar = item.querySelector(".btn_eliminar");
    btnEliminar.addEventListener("click", () => {
        eliminarTarea(index);
    })

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
    tareas = tareas.filter((_, i) => i !== index);
    actualizarTareas();
}
