//Array
let librosDisponibles = []

//Selectores
const botonComprar = document.querySelector("#botonComprar");
const botonEliminar = document.querySelector("#botonEliminar");
const mensajeHTML = document.getElementById("mensajeServer");
const inyeccionJS = document.querySelector('#inyeccionJS');
const mensaje = document.createElement("p");
const precioTotal = document.getElementById("precioTotal")

//Función que actualiza el carrito
const actualizarCarrete = () => {
    mensajeHTML.innerHTML = ""
    carrete.forEach((libro) => {
        const div = document.createElement("div")
        div.className = ("productoEnCarrete")
        div.innerHTML = `<p> ${libro.titulo} </p>
        <p>Precio:  $ ${libro.precio} </p>
        <button onclick="eliminarDelCarrete(${libro.id})" class="botones" id="botonEliminarDelCarrete">Eliminar</button>`
        mensajeHTML.appendChild(div)
    })
    precioTotal.innerText = carrete.reduce((acc, prod) => acc + prod.precio, 0)
}

//Selector botón eliminar del carrito


//Carrito
let carrete
if (localStorage.getItem('carrete')) {
    carrete = JSON.parse(localStorage.getItem('carrete'))
    actualizarCarrete()

} else {
    carrete = []
    document.querySelector("p").remove()

    mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `

    mensajeHTML.append(mensaje)
}



//Función que renderiza los libros actualmente en stock
const renderizarLibrosDisponibles = () => {

librosDisponibles.forEach((libro) => {

    const itemLibro = document.createElement('div')

    itemLibro.innerHTML = `
        <div class="card h-100" id="cardProductos" >
            <img src="${libro.img}" width="150px" height=200px" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${libro.titulo}</h5>
                    <p class="card-text"><em>de ${libro.autor}</em></p>
                </div>
            <div class ="divBotonAgregarCarrete">
                    <button class="agregarCarrete"  type="submit" data-id="${libro.id}">Agregar al carrito</button>
                    <span>$${libro.precio}</span>
            </div>
        </div>   `

    itemLibro.classList.add("col")
    inyeccionJS.append(itemLibro)

    })

    document.querySelectorAll('.agregarCarrete').forEach(botoncito => {
        botoncito.addEventListener('click', renderizarInfoLibros)

    })
}

//Funciones


function renderizarInfoLibros(e) {
    const libroIdSeleccionado = e.target.getAttribute("data-id")
    const libroSeleccionado = librosDisponibles.find((libro) => libro.id == libroIdSeleccionado)
    carrete.push(libroSeleccionado)
    localStorage.setItem('carrete', JSON.stringify(carrete))
    actualizarCarrete()
    console.log(carrete);
}


const realizarCompraCarrete = () => {
    if (carrete.length === 0) {

        document.querySelector("p").remove()

        mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `

        mensajeHTML.append(mensaje)

    } else {

        if (confirm("¿Estás segur@ de realizar la compra?")) {

            carrete = []

            localStorage.clear()

            Swal.fire(
                'Tu compra se realizó con éxito!',
                'Pronto te enviaremos la información de tu factura',
                'success'
            )
            actualizarCarrete()

        }
    }
}

const vaciarCarrete = () => {
    mensajeHTML.innerHTML = ""
    localStorage.clear()
    carrete = []
    
    document.querySelector("p").remove()
    mensaje.innerHTML = `<strong>El carrito se vació.</strong>`
    mensajeHTML.append(mensaje) 

}

const eliminarDelCarrete = (libroAEliminar) => {
    const item = carrete.find((libro) => libro.id == libroAEliminar)
    const indice = carrete.indexOf(item)
    carrete.splice(indice, 1)
    actualizarCarrete()}

//Add Event Listeners

botonComprar.addEventListener('click', realizarCompraCarrete)
botonEliminar.addEventListener('click', vaciarCarrete)

//Comunicación con Data.JSON 
fetch('data.json')

    .then((response) => response.json())

    .then((data) => {
        librosDisponibles = data
        renderizarLibrosDisponibles()
    })

    .catch((error) => {
        console.log(error)
    })
