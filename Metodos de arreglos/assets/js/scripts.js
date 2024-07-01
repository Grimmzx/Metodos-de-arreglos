document.addEventListener('DOMContentLoaded', () => {
    const botonAgregarTarea = document.getElementById('add-task');
    const entradaNuevaTarea = document.getElementById('new-task');
    const listaTareas = document.getElementById('task-list');
    const elementoTotalTareas = document.getElementById('total-tasks');
    const elementoTareasCompletadas = document.getElementById('completed-tasks');

    let tareas = [
        { id: 1, descripcion: 'Enviar el desafío', completada: false },
        { id: 2, descripcion: 'Ir al supermercado', completada: false },
        { id: 3, descripcion: 'Preparar el almuerzo de mañana', completada: false }
    ];

    const actualizarResumen = () => {
        const totalTareas = tareas.length;
        const tareasCompletadas = tareas.filter(tarea => tarea.completada).length;
        elementoTotalTareas.textContent = totalTareas;
        elementoTareasCompletadas.textContent = tareasCompletadas;
    };

    const renderizarTareas = () => {
        listaTareas.innerHTML = '';
        tareas.forEach(tarea => {
            const elementoTarea = document.createElement('li');
            elementoTarea.className = tarea.completada ? 'completed' : '';
            elementoTarea.setAttribute('data-task-id', tarea.id);
            elementoTarea.innerHTML = `
                ${tarea.descripcion}
                <div>
                    <input type="checkbox" ${tarea.completada ? 'checked' : ''} onclick="alternarTarea(${tarea.id})">
                    <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                </div>
            `;
            listaTareas.appendChild(elementoTarea);
        });
        actualizarResumen();
    };

    botonAgregarTarea.addEventListener('click', () => {
        const descripcion = entradaNuevaTarea.value.trim();
        if (descripcion) {
            const nuevaTarea = {
                id: Date.now(),
                descripcion,
                completada: false
            };
            tareas.push(nuevaTarea);
            entradaNuevaTarea.value = '';
            renderizarTareas();
        }
    });

    window.eliminarTarea = (id) => {
        tareas = tareas.filter(tarea => tarea.id !== id);
        renderizarTareas();
    };

    window.alternarTarea = (id) => {
        const tarea = tareas.find(tarea => tarea.id === id);
        if (tarea) {
            tarea.completada = !tarea.completada;
            renderizarTareas();
        }
    };

    renderizarTareas();
});
