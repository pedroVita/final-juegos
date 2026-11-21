import { DBproductos } from "./db.js";

const contenedor = document.querySelector('.tarjetas')

function MostrarProductos(parametro) {
    contenedor.innerHTML = ''

    if (parametro.length === 0) {
        contenedor.innerHTML = `<p> Producto No Encontrado </p>`

    }
    parametro.forEach(i => {
        let div = document.createElement('div')
        div.className = 'Cards'
        div.innerHTML =
            `
            <div class="Cards">
                <div class="Cards__img">
                    <img src="${i.imagen}" alt="">
                </div>
                <div class="Cards__body">
                    <span class="Cards__tag">Codigo:${i.codigo}</span>
                    <h2 class="Cards__titulo">${i.nombre}</h2>
                    <p class="Cards__precio">$${i.precio}</p>
                    <div class="Cards__pie">
                        <span class="Cards__stock">Stock:${i.stock}</span>
                        <span class="Cards__ver">Ver Producto</span>
                    </div>
                </div>
            </div>
        `
        contenedor.appendChild(div)

    });
}

const formulario = document.getElementById("formulario")
if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    })
}


let filtro = document.getElementById('Nombre')
function filtrar() {
    const filtrado = filtro.value.toLowerCase().trim()
    if (filtrado === "") {
        MostrarProductos(DBproductos)
        return
    }
    const productosFiltrados = DBproductos.filter(i => (i.nombre.toLowerCase().includes(filtrado)

    ))
    MostrarProductos(productosFiltrados)
}

const botonesCategoria = document.querySelectorAll('.btn-categoria');

botonesCategoria.forEach(boton => {
    boton.addEventListener('click', () => {
        // 1. (Opcional) Cambiar estilo visual del botón seleccionado
        botonesCategoria.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');

        // 2. Leer la categoría desde el atributo data-categoria
        const categoriaSeleccionada = boton.dataset.categoria;

        // 3. Si es "todos", mostramos toda la base de datos
        if (categoriaSeleccionada === 'todos') {
            MostrarProductos(DBproductos);
            return;
        }

        // 4. Filtramos los productos que coincidan con esa categoría
        const productosFiltrados = DBproductos.filter(producto => 
            producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase()
        );

        MostrarProductos(productosFiltrados);
    });
});


filtro.addEventListener('input', filtrar)


console.log("productos cargados", DBproductos);
MostrarProductos(DBproductos)
