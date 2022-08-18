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

//Clase constructora libro aplicada en  variables const
const obra1 = new libro ("El Principito", "Antoine de Saint-Exupéry", "El Gato de Hojalata", "Dura", 2015, 3000)
const obra2 = new libro ("1984", "George Orwell", "Debolsillo", "Blanda", 2011, 2500)
const obra3 = new libro ("Cien Años de Soledad", "Gabriel García Marquez", "Debolsillo", "Blanda", 2012, 2300)
const obra4 = new libro ("Rayuela", "Julio Cortazar", "Alfaguara", "Blanda", 2017, 2400)
const obra5 = new libro ("El Aleph", "Jorge Luis Borges", "Proa Editores", "Dura", 2010, 2700)


const librosDisponibles = [obra1, obra2, obra3, obra4, obra5]

const mensajeHTML = document.getElementById("mensajeServer")
const mensaje = document.createElement('p')



//Carrito
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






const inyeccionJS = document.querySelector('#inyeccionJS')
/* <img src="#" alt="" class="card-img-top" alt="..."> */
//Generador de libros disponibles
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
)

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
    mensaje.innerHTML = ` <strong>¡Gracias por tu compra! Tu carrito se vació.</strong>  ` 
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



    /* submitButton.addEventListener('click', () => {
      toDoList.push(input.value)
      input.value = ''
      localStorage.setItem('toDoList', JSON.stringify(toDoList))
      console.log(toDoList)
  })
  
  const toDoListGuardada = JSON.parse(localStorage.getItem('toDoList')) */
    

const eventoEliminar = (dataDelEvento) => {
      
        localStorage.clear()
        carrete = []
      document.querySelector("p").remove()
      mensaje.innerHTML = `<strong>El carrito se vació.</strong>`
   mensajeHTML.append(mensaje)

}




//Add Event Listener a cada botón carrito
botonComprar.addEventListener("click", eventoComprar)

botonAgregarCarrito.forEach((boton) => { boton.addEventListener( "click", eventoAgregarCarrito);})

botonEliminar.addEventListener("click", eventoEliminar)


