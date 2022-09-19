//Array
let librosDisponibles = []

//Selectores
const botonComprar = document.querySelector("#botonComprar");
const botonEliminar = document.querySelector("#botonEliminar");
const mensajeHTML = document.getElementById("mensajeServer");
const inyeccionJS = document.querySelector('#inyeccionJS');
const mensaje = document.createElement('p');

let carrete
if(localStorage.getItem('carrete')) {
   carrete = JSON.parse(localStorage.getItem('carrete'))
   mensaje.innerHTML = `
   <strong>Seleccionaste los siguientes productos:
   </strong> 
   <em>${carrete}</em> 
   `
   
mensajeHTML.append(mensaje)   

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
        <div class="cardProductos">
            <div class="card-body" id="containerInfo">
                    <img src="${libro.img}" width="150px" height=200px" alt="...">
                <div><h3 class ="h3TituloProductos">${libro.titulo}</h3>
                    <p class="card-text"><em>de ${libro.autor}</em></p>
                </div>
                <div class ="divBotonAgregarCarrito">
                    <button class="agregarCarrito"  type="submit" data-id="${libro.id}">Agregar al carrito</button>
                    <span>$${libro.precio}</span>
                </div>
            </div>
        </div>`

        itemLibro.classList.add("col")
        inyeccionJS.append(itemLibro)

    })

    document.querySelectorAll('.agregarCarrito').forEach(botoncito => {
        botoncito.addEventListener('click', renderizarInfoLibros)

    })
}

//Funciones
function renderizarInfoLibros(e) {
    const libroIdSeleccionado = e.target.getAttribute("data-id")
    const libroSeleccionado = librosDisponibles.find((libro) => libro.id == libroIdSeleccionado)
    carrete.push(libroSeleccionado)
    actualizarCarrete()
    console.log(carrete);
}

 const actualizarCarrete = () => {
    mensajeHTML.innerHTML = ""
    carrete.forEach((libro) =>{
        const div = document.createElement("div")
        div.className = ("productoEnCarrete")
        div.innerHTML = `<p> ${libro.titulo} </p>
        <p>Precio:  $ ${libro.precio} </p>
        <button onclick="eliminarDelCarrete(${libro.precio})">Eliminar</button>`
        mensajeHTML.appendChild(div)
    })
 }
const realizarCompraCarrete = () =>{
    if (carrete.length === 0) {
      
       document.querySelector("p").remove()
     
       mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `
    
    mensajeHTML.append(mensaje)
     
      } else {

        if (confirm("¿Realizar la compra? Tu total es de $(EN PROCESO)")){

            document.querySelector("p").remove()

            carrete = []

            localStorage.clear()

          mensaje.innerHTML = ` <strong>¡Gracias por tu compra! Tu carrito se vació.</strong>  ` 

       mensajeHTML.append(mensaje)
       
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
    actualizarCarrete()
}

//Add Event Listeners
//Selectores


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
