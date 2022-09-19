
let librosDisponibles = []

//Botones carrito (linkeo DOM)

const botonComprar = document.querySelector("#botonComprar");
const botonEliminar = document.querySelector("#botonEliminar");
const mensajeHTML = document.getElementById("mensajeServer");
const inyeccionJS = document.querySelector('#inyeccionJS');

const mensaje = document.createElement('p');



//Carrito
let carrete
if(localStorage.getItem('carrete')) {
   carrete = JSON.parse(localStorage.getItem('carrete'))
   mensaje.innerHTML = `
   <strong>Seleccionaste los siguientes productos:
   </strong> 
   <em>${carrete.forEach()}</em> 
   `
   
mensajeHTML.append(mensaje)   

} else {
   carrete = []
   document.querySelector("p").remove()

   mensaje.innerHTML = ` <strong>El carrito está vacio.</strong> `

mensajeHTML.append(mensaje)
}


//Generador de libros disponibles

const renderizarLibrosDisponibles = () => {
librosDisponibles.forEach((libro) => {
   const itemLibro = document.createElement('div')
   itemLibro.innerHTML = `<div class="cardProductos">
   
       <div class="card-body" id="containerInfo">
       <img src="${libro.img}" width="150px" height=200px" alt="...">
         <div><h3 class ="h3TituloProductos">${libro.titulo}</h3>
         <p class="card-text"><em>de ${libro.autor}</em></p>
       </div>
       <div class ="divBotonAgregarCarrito">
      

       <button class="agregarCarrito"  type="submit" data-id="${libro.id}">Agregar al carrito</button>
       <span>$${libro.precio}</span>
       </div>
     </div>`
   itemLibro.classList.add("col")
   inyeccionJS.append(itemLibro)
   
})

 document.querySelectorAll('.agregarCarrito').forEach((botoncito) => {
        botoncito.addEventListener('click', renderizarInfoLibros)
 
})}

const renderizarInfoLibros = (e) =>{
   const libroIdSeleccionado = e.target.closest('.agregarCarrito').getAttribute('data-id')
    const libroSeleccionado = librosDisponibles.find((libro) => libro.id == libroIdSeleccionado)
    carrete.push(libroSeleccionado)
   localStorage.setItem('carrete', JSON.stringify(carrete)) 
   console.log(carrete);
   }


 


//Eventos botones carrito
const actualizarCarrito = () => {
   mensajeHTML.innerHTML = ""
   carrete.forEach((libro) => {
   const div = document.createElement("div")
   div.className = ("productoEnCarrito")
   div.innerHTML = '   <p> ${libro.precio} </p>'
      
})
}

/* const eventoAgregarCarrito = (prodId) => {
   
   carrete.push(item)
   localStorage.setItem('carrete', JSON.stringify(carrete))
   document.querySelector("p").remove()
   mensaje.innerHTML = `
   <strong>Seleccionaste los siguientes productos:
   </strong> 
   <em>${carrete}</em> 
   `
   
mensajeHTML.append(mensaje)   

   } */


const eventoComprar = () => {
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
mensajeHTML.append(mensaje)
 }
 }





   
   

const eventoEliminar = (dataDelEvento) => {
     
       localStorage.clear()
       carrete = []
     document.querySelector("p").remove()
     mensaje.innerHTML = `<strong>El carrito se vació.</strong>`
  mensajeHTML.append(mensaje)

}




//Add Event Listener a cada botón carrito
botonComprar.addEventListener("click", eventoComprar)

/* botonAgregarCarrito.forEach((boton) => { boton.addEventListener( "click", eventoAgregarCarrito);}) */

botonEliminar.addEventListener("click", eventoEliminar)



 fetch('data.json')

   .then((response) => response.json())

   .then((data) => {
      librosDisponibles = data
       renderizarLibrosDisponibles()
   })
   
   
   .catch((error) => {
      console.log(error)
   })
 


 