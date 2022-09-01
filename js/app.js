//Clase Costructora libro
class libro {
    constructor(titulo, autor, editorial, tapa, año, precio){
        this.titulo = titulo;
        this.autor = autor;
        this.editorial = editorial ; 
        this.tapa = tapa;
        this.año = año;
        this.precio = precio;
    }
}

let librosDisponibles = [/* obra1, obra2, obra3, obra4, obra5 */]

const mensajeHTML = document.getElementById("mensajeServer")
const mensaje = document.createElement('p')



//Carrito
let carrete = JSON.parse(localStorage.getItem('carrete')) || []

if(localStorage.getItem('carrete')) {
    mensaje.innerHTML = `
    <strong>Seleccionaste los siguientes productos:
    </strong> 
    <em>${carrete}</em> 
    `
 mensajeHTML.append(mensaje)   
} else {
    document.querySelector("p").remove()

    mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `
 
 mensajeHTML.append(mensaje)
} 

/* let carrete
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
} */





const inyeccionJS = document.querySelector('#inyeccionJS')

//Generador de libros disponibles
function librosDisponiblesRenderizar(librosDisponibles){
librosDisponibles.forEach((librosDisponibles) => {
    const itemLibro = document.createElement('div')
    itemLibro.innerHTML = `<div class="cardProductos">
        
        <div class="card-body">
          <div><h3 class ="h3TituloProductos">${librosDisponibles.titulo}</h3>
          <p class="card-text"><em>de</em> ${librosDisponibles.autor}</p>
        </div>
        <div class ="divBotonAgregarCarrito">

        <button class="agregarCarrito"  type="submit" data-id="${librosDisponibles.titulo} $${librosDisponibles.precio} ">Agregar al carrito</button>
        <span>$${librosDisponibles.precio}</span>
        </div>
      </div>`
    itemLibro.classList.add("col")
    inyeccionJS.append(itemLibro)
}
)}

 //Botones carrito (linkeo DOM)
 const botonAgregarCarrito = document.querySelectorAll(".agregarCarrito")
 const botonComprar = document.querySelector("#botonComprar")
 const botonEliminar = document.querySelector("#botonEliminar")

//Eventos botones carrito


const eventoComprar = (dataDelEvento) => {
  if (carrete.length === 0) {

    document.querySelector("p").remove()

    mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `
 
 mensajeHTML.append(mensaje)

  } else {
    
    if (confirm("¿Realizar la compra? Tu total es de $(EN PROCESO)")){
      document.querySelector("p").remove()
      carrete = []
      localStorage.clear()
      swal("¡Gracias por tu compra!");
    mensaje.innerHTML = ` <strong>Tu compra fue procesada con exito, tu carrito se vació.</strong>  ` 
 mensajeHTML.append(mensaje)
    }
 mensajeHTML.append(mensaje)
  }
  }







const eventoAgregarCarrito = (dataDelEvento) => {
    const producto = dataDelEvento.target.getAttribute('data-id')
    carrete.push(producto)
    localStorage.setItem('carrete', JSON.stringify(carrete))
    console.log(carrete);
    document.querySelector("p").remove()
    mensaje.innerHTML = `
    <strong>Seleccionaste los siguientes productos:
    </strong> 
    <em>${carrete}</em> 
    `
    
 mensajeHTML.append(mensaje)   

    }


    

const eventoEliminar = (dataDelEvento) => {
      
        localStorage.clear()
        carrete = []
      document.querySelector("p").remove()
      mensaje.innerHTML = `<strong>El carrito se vació.</strong>`
   mensajeHTML.append(mensaje)

}



  fetch('json/productos.json')

     .then ((response) => response.json())

     .then ((data) => {
        librosDisponibles = data
        console.log(librosDisponibles);
        librosDisponiblesRenderizar(librosDisponibles)
     })
     
     .catch((error) => {
        console.log(error)
     })

//Add Event Listener a cada botón carrito
botonComprar.addEventListener("click", eventoComprar)

botonAgregarCarrito.forEach((boton) => { boton.addEventListener( "click", eventoAgregarCarrito);})

botonEliminar.addEventListener("click", eventoEliminar)


